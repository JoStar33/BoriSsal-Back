const path = require('path');
const multer = require('multer');
const multer_s3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const storage = (originPath) => multer_s3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME, // 자신의 s3 버킷 이름
    contentType: multer_s3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, originPath + path.basename(file.originalname, ext) + Date.now() + ext);
    },
    limits: { fileSize: 30 * 1024 * 1024 }
})

const deleteImage = (file_name) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file_name.substr(1)
  };

  try {
    new AWS.S3().deleteObject(params, (error, data) => {
      if (error) {
        console.log('err: ', error, error.stack);
      } else {
        console.log(data, " 정상 삭제 되었습니다.");
      }
    });       
  } catch(err) {
    console.log(err);
    throw err;
  }
};

const upload = multer({
  storage: storage('uploads/')
});

const boriGoodsUpload = multer({
  storage: storage('bori_goods_images/')
});

const boriGalleryUpload = multer({
  storage: storage('bori_gallery_images/')
});

module.exports = { upload, boriGoodsUpload, boriGalleryUpload, deleteImage };