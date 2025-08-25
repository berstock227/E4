import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import { config } from '../config.js';
import { ok, fail } from '../utils/response.js';
import { hashPassword, verifyPassword } from '../utils/crypto.js';
import { requireFields } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

function signAccess(user) {
  return jwt.sign({ sub: user.id, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}
function signRefresh(user) {
  return jwt.sign({ sub: user.id }, config.refreshSecret, { expiresIn: config.refreshExpiresIn });
}

router.post('/register', requireFields(['name', 'email', 'password']), async (req, res) => {
  const { name, email, password } = req.body;
  const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (exists) return fail(res, 'EMAIL_TAKEN', 'Email already registered', null, 409);

  const password_hash = await hashPassword(password);
  const result = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)').run(name, email, password_hash);
  const user = { id: result.lastInsertRowid, name, email };
  return ok(res, { user }, null, 201);
});

router.post('/login', requireFields(['email', 'password']), async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return fail(res, 'INVALID_CREDENTIALS', 'Invalid email or password', null, 401);

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return fail(res, 'INVALID_CREDENTIALS', 'Invalid email or password', null, 401);

  const access_token = signAccess(user);
  const refresh_token = signRefresh(user);
  return ok(res, {
    access_token,
    refresh_token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

router.post('/refresh', requireFields(['refresh_token']), (req, res) => {
  const { refresh_token } = req.body;
  try {
    const payload = jwt.verify(refresh_token, config.refreshSecret);
    const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(payload.sub);
    if (!user) return fail(res, 'USER_NOT_FOUND', 'User not found', null, 404);
    const access_token = signAccess(user);
    return ok(res, { access_token });
  } catch (e) {
    return fail(res, 'INVALID_REFRESH', 'Refresh token is invalid or expired', { message: e.message }, 401);
  }
});

router.post('/logout', (_req, res) => {
  // Stateless JWT: client just drops tokens
  return ok(res, { message: 'Logged out' });
});

router.get('/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(req.user.id);
  if (!user) return fail(res, 'USER_NOT_FOUND', 'User not found', null, 404);
  return ok(res, { user });
});

export default router;
