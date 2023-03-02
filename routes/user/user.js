const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const multer = require('multer');
const { modifyUserNick, setUserProfileImage, getUserInfo } = require("../../controllers/user/user")
const router = express.Router();
const upload = require("../../utils/uploadImage")

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
};


//GET /user/:user_id
router.get('/:user_id', isLoggedIn, getUserInfo);

//PATCH /user/nick
router.patch('/nick', isLoggedIn, modifyUserNick);

//POST /user/profile-image
router.post('/profile-image', isLoggedIn, upload.single('img'), setUserProfileImage)

module.exports = router;