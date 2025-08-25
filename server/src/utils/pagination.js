/**
 * Chuẩn hóa phân trang từ query:
 * - page: số trang (>=1)
 * - per_page: số item/trang (1..100)
 * Trả: { page, per_page, offset }
 */
export function parsePaging(q = {}) {
  let page = Number(q.page ?? q.current_page ?? 1);
  let per_page = Number(q.per_page ?? q.limit ?? 10);

  if (!Number.isFinite(page) || page < 1) page = 1;
  if (!Number.isFinite(per_page) || per_page < 1) per_page = 10;
  if (per_page > 100) per_page = 100;

  const offset = (page - 1) * per_page;
  return { page, per_page, offset };
}
