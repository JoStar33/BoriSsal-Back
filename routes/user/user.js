const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { modifyUserNick, setUserProfileImage, getUserInfo } = require("../../controllers/user/user")
const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

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
  limits: { fileSize: 5 * 1024 * 1024 },
});

//GET /user/:user_id
router.get('/:user_id', isLoggedIn, getUserInfo);

//PATCH /user/nick
router.patch('/nick', isLoggedIn, modifyUserNick);

//POST /user/profile-image
router.post('/profile-image', isLoggedIn, upload.single('img'), setUserProfileImage)

module.exports = router;