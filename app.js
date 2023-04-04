const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connect = require('./schemas');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const helmet = require('helmet');
const hpp = require('hpp');
const redis = require('redis');
const RedisStore = require('redis')(session);

dotenv.config();
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD
});
//user
const authRouter = require('./routes/user/auth');
const cartRouter = require('./routes/user/cart');
const deliverAddressRouter = require('./routes/user/deliverAddress');
const userRouter = require('./routes/user/user');
//bori_goods
const boriGoodsRouter = require('./routes/bori_goods/boriGoods');
const boriGoodsCategoryRouter = require('./routes/bori_goods/boriGoodsCategory');
const boriGoodsReplyRouter = require('./routes/bori_goods/boriGoodsReply');
//order
const orderRouter = require('./routes/order/order');
//bori_gallery
const boriGalleryRouter = require('./routes/bori_gallery/boriGallery');
const boriGalleryReplyRouter = require('./routes/bori_gallery/boriGalleryReply');
const passportConfig = require('./passport');

const app = express();
passportConfig(); // 패스포트 설정
app.set('port', process.env.PORT || 3030);
connect();
if (process.env.NODE_ENV === "production") {
  app.use(morgan('combined'));
  app.use(helmet({contentSecurityPolicy: false}));
  app.use(hpp());
}
app.use(morgan('dev'));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use('/bori_goods_images', express.static(path.join(__dirname, 'bori_goods_images')));
app.use('/bori_gallery_images', express.static(path.join(__dirname, 'bori_gallery_images')));
app.use(express.json());
//전체 허용의 경우는 origin: true를 주자.
app.use(cors({
  origin: [process.env.REDIRECT_URL],
  credentials: true,  // 출처 허용 옵션
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
const days = 0.25;
const sessionOption = {
  secret: process.env.COOKIE_SECRET || config.sessionSecretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  },
  store: new RedisStore({client: redisClient })
}
if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
  sessionOption.cookie.secure = true;
} 
app.use(session(sessionOption));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
//user
app.use('/cart', cartRouter);
app.use('/deliver-address', deliverAddressRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
//bori_goods
app.use('/bori-goods', boriGoodsRouter);
app.use('/bori-goods-category', boriGoodsCategoryRouter);
app.use('/bori-goods-reply', boriGoodsReplyRouter);
//order
app.use('/order', orderRouter);
//bori_gallery
app.use('/bori-gallery', boriGalleryRouter);
app.use('/bori-gallery-reply', boriGalleryReplyRouter);


app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500).json({
    message: err.message
  });
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
