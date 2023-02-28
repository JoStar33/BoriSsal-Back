const express = require("express");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { join, login, logout, kakaoLogin, googleLogin } = require('../controllers/auth');
const router = express.Router();

// POST /auth/join
router.post('/join', isNotLoggedIn, join); 

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// GET /auth/kakao/callback
router.get('/kakao/callback', isNotLoggedIn, kakaoLogin);

// GET /auth/google
router.get('/google', passport.authenticate('google'));

// GET /auth/google
router.get('/google/callback', isNotLoggedIn, googleLogin);

module.exports = router;
