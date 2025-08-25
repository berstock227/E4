import 'dotenv/config';
export const config = { port: parseInt(process.env.PORT || '8000', 10), env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'change_me', jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshSecret: process.env.REFRESH_SECRET || 'change_me_refresh', refreshExpiresIn: process.env.REFRESH_EXPIRES_IN || '7d',
  corsOrigins: (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean),
  uploadDir: process.env.UPLOAD_DIR || 'uploads' };
