const express = require("express");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../../middlewares");
const { join, login, logout, kakaoLogin, googleLogin, isLogIn } = require('../../controllers/user/auth');
const router = express.Router();

// POST /auth/join
router.post('/join', isNotLoggedIn, join);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/is-login
router.get('/is-login', isLoggedIn, isLogIn);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// GET /auth/kakao
router.get('/kakao', isNotLoggedIn, kakaoLogin);

// GET /auth/google
router.get('/google', isNotLoggedIn, googleLogin);

module.exports = router;
