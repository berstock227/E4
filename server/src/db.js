import Database from 'better-sqlite3';
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'data', 'app.db'); const firstInit = !fs.existsSync(dbPath);
export const db = new Database(dbPath);
if (firstInit) { const initSql = fs.readFileSync(path.join(__dirname, 'models', 'init.sql'), 'utf-8'); db.exec(initSql); }
