import { fail } from '../utils/response.js';

export function notFound(req, res, _next) {
  const msg = `Route ${req.method} ${req.originalUrl} not found`;
  return fail(res, 'NOT_FOUND', msg, null, 404);
}

export function onError(err, _req, res, _next) {
  console.error('Unhandled error:', err);
  const details = (process.env.NODE_ENV === 'development')
    ? { message: err.message, stack: err.stack }
    : undefined;
  return fail(res, 'INTERNAL_ERROR', 'Something went wrong', details, 500);
}
