import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from './config.js';
import { notFound, onError } from './middleware/error.js';

import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blog.js';
import uploadRoutes from './routes/upload.js';

// ✅ DB (SQLite)
import { db } from './db.js';

const app = express();

/* ----------------------- Basics & Security ----------------------- */
app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

/* ----------------------------- CORS ------------------------------ */
const allowList = new Set([
  ...config.corsOrigins,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);
const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true); // Postman/Insomnia
    if (allowList.size === 0 || allowList.has(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS: ' + origin));
  },
  credentials: true,
};
app.use(cors(corsOptions));

/* ---------------------------- Logger ----------------------------- */
app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));

/* ---------------------------- Static ----------------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

/* ---------------------------- Health ----------------------------- */
app.get('/api/health', (_req, res) =>
  res.json({ ok: true, time: new Date().toISOString() }),
);

/* ---------------------------- Routes ----------------------------- */
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/upload', uploadRoutes);

/* ----------------------- Meta / Helper APIs ---------------------- */
/** ✅ /api/stats: luôn trả đúng shape để FE không crash */
app.get('/api/stats', (_req, res) => {
  try {
    const row = (sql, ...p) => db.prepare(sql).get(...p);
    const all = (sql, ...p) => db.prepare(sql).all(...p);

    // Có thể bảng chưa tồn tại => bọc try/catch từng phần?
    // Ở đây nếu lỗi bất kỳ sẽ nhảy xuống fallback phía dưới.
    const blogsTotal = row('SELECT COUNT(1) AS c FROM blogs')?.c ?? 0;
    const blogsPublished =
      row("SELECT COUNT(1) AS c FROM blogs WHERE status = 'published'")?.c ?? 0;
    const blogsDraft =
      row("SELECT COUNT(1) AS c FROM blogs WHERE status = 'draft'")?.c ?? 0;
    const usersTotal = row('SELECT COUNT(1) AS c FROM users')?.c ?? 0;

    const latestBlogs =
      all(
        'SELECT id, title, slug, created_at FROM blogs ORDER BY created_at DESC LIMIT 6',
      ) ?? [];

    return res.json({
      success: true,
      data: {
        blogs: { total: blogsTotal, published: blogsPublished, draft: blogsDraft },
        users: { total: usersTotal },
        latest: { blogs: latestBlogs },
      },
      error: null,
      meta: null,
    });
  } catch (e) {
    // Fallback an toàn nếu DB/chưa có bảng
    return res.json({
      success: true,
      data: {
        blogs: { total: 0, published: 0, draft: 0 },
        users: { total: 0 },
        latest: { blogs: [] },
      },
      error: null,
      meta: null,
    });
  }
});

/** Vẫn giữ stub nếu FE có gọi */
app.get('/api/blogs/categories', (_req, res) =>
  res.json({ success: true, data: [], error: null, meta: null }),
);
app.get('/api/blogs/tags', (_req, res) =>
  res.json({ success: true, data: [], error: null, meta: null }),
);

/* ---------------------- 404 + error handler ---------------------- */
app.use(notFound);
app.use(onError);

/* ---------------------------- Listen ----------------------------- */
app.listen(config.port, () => {
  console.log(`✅ Server running at http://localhost:${config.port}`);
});
