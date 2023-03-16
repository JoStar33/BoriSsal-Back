const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../../middlewares");
const { join, login, logout, nickDuplicate, findPassword, passwordChange, emailDuplicate, kakaoLogin, googleLogin, isLogIn, isNotLogIn } = require('../../controllers/user/auth');
const router = express.Router();

// POST /auth/join
router.post('/join', isNotLoggedIn, join);

// POST /auth/join/nick
router.post('/join/nick', nickDuplicate);

// POST /auth/join/email
router.post('/join/email', emailDuplicate);

// POST /auth/password
router.post('/password', passwordChange);

// POST /auth/password
router.post('/find/password', findPassword);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/is-login
router.get('/is-login', isLoggedIn, isLogIn);

// GET /auth/is-login
router.get('/is-not-login', isNotLoggedIn, isNotLogIn);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// GET /auth/kakao
router.get('/kakao', isNotLoggedIn, kakaoLogin);

// GET /auth/google
router.get('/google', isNotLoggedIn, googleLogin);

module.exports = router;
