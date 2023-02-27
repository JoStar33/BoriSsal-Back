const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connect = require('./schemas');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();
const authRouter = require('./routes/auth');
const passportConfig = require('./passport');

const app = express();
passportConfig(); // 패스포트 설정
app.set('port', process.env.PORT || 3030);
connect();

/*
{
  origin: 'http://localhost:3000', // 출처 허용 옵션
  credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  exposedHeaders: ["Authorization"],
}
*/

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
//전체 허용의 경우는 origin: true를 주자.
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5173'], // 출처 허용 옵션
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.COOKIE_SECRET || config.sessionSecretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
