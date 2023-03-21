const path = require('path');
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 30 * 1024 * 1024 },
});

const boriGoodsUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'bori_goods_images/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 30 * 1024 * 1024 },
});

module.exports = { upload, boriGoodsUpload };