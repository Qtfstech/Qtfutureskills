import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import multer from 'multer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOADS_ROOT = path.resolve(__dirname, '../../public/uploads');
export const EVENTS_UPLOAD_DIR = path.join(UPLOADS_ROOT, 'events');

fs.mkdirSync(EVENTS_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, EVENTS_UPLOAD_DIR);
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  },
});

function fileFilter(_req, file, cb) {
  if (/^image\/(jpe?g|png|webp|gif|avif)$/i.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
}

export const uploadEventPhotos = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024, files: 20 },
});
