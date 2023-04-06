const express = require("express");
const { isLoggedIn } = require("../../middlewares");
//const multer = require('multer');
const { modifyUserNick, setUserProfileImage, getUserInfo } = require("../../controllers/user/user")
const router = express.Router();
const { upload } = require("../../utils/uploadImage")

//GET /user/
router.get('/', isLoggedIn, getUserInfo);

//PATCH /user/nick
router.patch('/nick', isLoggedIn, modifyUserNick);

//POST /user/profile-image
router.post('/profile-image/', isLoggedIn, upload.single('img'), setUserProfileImage);

module.exports = router;