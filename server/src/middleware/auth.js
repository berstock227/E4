import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { fail } from '../utils/response.js';

/**
 * Đọc "Authorization: Bearer <token>", verify và gán req.user = { id, email }
 */
export function requireAuth(req, res, next) {
  try {
    const auth = req.headers['authorization'] || req.headers['Authorization'];
    if (!auth || !auth.startsWith('Bearer ')) {
      return fail(res, 'UNAUTHORIZED', 'Missing Bearer token', null, 401);
    }
    const token = auth.slice('Bearer '.length).trim();
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch (e) {
    return fail(res, 'UNAUTHORIZED', 'Invalid or expired token', { message: e.message }, 401);
  }
}
