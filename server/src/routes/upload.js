import express from 'express';
import multer from 'multer'; import path from 'path'; import fs from 'fs';
import { config } from '../config.js'; import { ok, fail } from '../utils/response.js'; import { requireAuth } from '../middleware/auth.js';
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => { if (!fs.existsSync(config.uploadDir)) fs.mkdirSync(config.uploadDir, { recursive: true }); cb(null, config.uploadDir); },
  filename: (req, file, cb) => { const ext = path.extname(file.originalname); const base = path.basename(file.originalname, ext).replace(/\W+/g,'-').toLowerCase(); const filename = base + '-' + Date.now() + ext; cb(null, filename); }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
router.post('/', requireAuth, upload.single('file'), (req,res)=>{ if (!req.file) return fail(res,'NO_FILE','No file uploaded', null, 400); const url = '/uploads/' + req.file.filename; return ok(res, { url, filename: req.file.filename }); });
export default router;
