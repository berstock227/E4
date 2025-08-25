import express from 'express';
import slugify from 'slugify';
import { db } from '../db.js';
import { ok, fail } from '../utils/response.js';
import { parsePaging } from '../utils/pagination.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

/* --------- Meta: categories & tags (đặt TRƯỚC các route động) --------- */

// Nếu bạn chưa có bảng categories, trả mảng rỗng cho FE khỏi lỗi
router.get('/categories', (_req, res) => {
  return ok(res, []); // có thể thay bằng SELECT từ bảng categories nếu bạn tạo
});

// Gom tag từ cột blogs.tags (chuỗi CSV) → unique
router.get('/tags', (_req, res) => {
  const rows = db
    .prepare("SELECT tags FROM blogs WHERE tags IS NOT NULL AND TRIM(tags) <> ''")
    .all();
  const set = new Set();
  rows.forEach(r => {
    String(r.tags)
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .forEach(t => set.add(t));
  });
  const data = Array.from(set).map((name, i) => ({ id: i + 1, name, slug: name }));
  return ok(res, data);
});

/* --------------------------------- List -------------------------------- */
router.get('/', (req, res) => {
  const q = req.query || {};
  const search = q.search || '';
  const sort_by = q.sort_by || 'created_at';
  const sort_order = q.sort_order || 'desc';
  const status = q.status || 'published';
  const { page, limit, offset } = parsePaging(q);

  const field = ['created_at', 'title', 'updated_at'].includes(sort_by) ? sort_by : 'created_at';
  const dir = String(sort_order).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  const whereParts = [];
  const params = [];
  if (status) { whereParts.push('b.status = ?'); params.push(status); }
  if (search) {
    whereParts.push('(b.title LIKE ? OR b.content LIKE ? OR b.tags LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  const where = whereParts.length ? ('WHERE ' + whereParts.join(' AND ')) : '';

  const total = db.prepare(`SELECT COUNT(1) AS c FROM blogs b ${where}`).get(...params).c;

  const sql = `
    SELECT b.*, u.name AS author_name
    FROM blogs b
    JOIN users u ON u.id = b.user_id
    ${where}
    ORDER BY ${field} ${dir}
    LIMIT ? OFFSET ?
  `;
  const items = db.prepare(sql).all(...params, limit, offset);

  return ok(res, {
    items,
    pagination: { page, current_page: page, limit, per_page: limit, total, total_pages: Math.max(1, Math.ceil(total / limit)) }
  }, { sort: `${field}:${dir}` });
});

/* ------------------------------ Detail (ID số) ------------------------- */
router.get('/:id(\\d+)', (req, res) => {
  const sql = `
    SELECT b.*, u.name AS author_name, u.email AS author_email
    FROM blogs b
    JOIN users u ON u.id = b.user_id
    WHERE b.id = ?
  `;
  const blog = db.prepare(sql).get(req.params.id);
  if (!blog) return fail(res, 'NOT_FOUND', 'Blog not found', null, 404);
  return ok(res, blog);
});

/* -------------------------------- Create -------------------------------- */
router.post('/', requireAuth, (req, res) => {
  const body = req.body || {};
  const title = body.title;
  const content = body.content;
  const tags = body.tags || '';
  const status = body.status || 'published';

  if (!title || !content) return fail(res, 'VALIDATION_ERROR', 'title and content are required', null, 422);

  const slug = slugify(title, { lower: true, strict: true });
  const exists = db.prepare('SELECT id FROM blogs WHERE slug = ?').get(slug);
  if (exists) return fail(res, 'DUPLICATE', 'Another post with same title (slug) exists', null, 409);

  const insertSql = 'INSERT INTO blogs (user_id, title, slug, content, tags, status) VALUES (?, ?, ?, ?, ?, ?)';
  const result = db.prepare(insertSql).run(req.user.id, title, slug, content, tags, status);
  const blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(result.lastInsertRowid);
  return ok(res, blog, null, 201);
});

/* -------------------------------- Update -------------------------------- */
router.put('/:id(\\d+)', requireAuth, (req, res) => {
  const body = req.body || {};
  const blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(req.params.id);
  if (!blog) return fail(res, 'NOT_FOUND', 'Blog not found', null, 404);
  if (blog.user_id !== req.user.id) return fail(res, 'FORBIDDEN', 'Not your post', null, 403);

  const newTitle = body.title !== undefined ? body.title : blog.title;
  const newSlug = newTitle !== blog.title ? slugify(newTitle, { lower: true, strict: true }) : blog.slug;

  if (newSlug !== blog.slug) {
    const exists = db.prepare('SELECT id FROM blogs WHERE slug = ?').get(newSlug);
    if (exists) return fail(res, 'DUPLICATE', 'Another post with same title (slug) exists', null, 409);
  }

  const updateSql = `
    UPDATE blogs
    SET title = ?, slug = ?, content = ?, tags = ?, status = ?, updated_at = DATETIME('now')
    WHERE id = ?
  `;
  db.prepare(updateSql).run(
    newTitle,
    newSlug,
    body.content !== undefined ? body.content : blog.content,
    body.tags !== undefined ? body.tags : blog.tags,
    body.status !== undefined ? body.status : blog.status,
    blog.id
  );
  const updated = db.prepare('SELECT * FROM blogs WHERE id = ?').get(blog.id);
  return ok(res, updated);
});

/* -------------------------------- Delete -------------------------------- */
router.delete('/:id(\\d+)', requireAuth, (req, res) => {
  const blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(req.params.id);
  if (!blog) return fail(res, 'NOT_FOUND', 'Blog not found', null, 404);
  if (blog.user_id !== req.user.id) return fail(res, 'FORBIDDEN', 'Not your post', null, 403);

  db.prepare('DELETE FROM blogs WHERE id = ?').run(blog.id);
  return ok(res, { id: blog.id });
});

export default router;
