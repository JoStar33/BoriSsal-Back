const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { getBoriGallery, getBoriGalleryById, makeBoriGallery, updateBoriGallery,
  updateBoriGalleryImage, deleteBoriGallery, likeBoriGallery, dislikeBoriGallery } = require("../../controllers/bori_gallery/boriGallery")
const router = express.Router();
const upload = require("../../utils/uploadImage")

//GET /bori-gallery
router.get('/', getBoriGallery);

//GET /bori-gallery/:bori_gallery_id
router.get('/:bori_gallery_id', getBoriGalleryById);

/*
POST /bori-gallery
{
  user_id: ~~~,
  bori_gallery: {
    bori_gallery_title: ~~~,
    bori_gallery_desc: ~~~,
  }
}
*/
router.post('/', isLoggedIn, upload.single('img'), makeBoriGallery);

/*
PATCH /bori-gallery
{
  bori_gallery: {
    bori_gallery_id: ~~~,
    bori_gallery_title: ~~~,
    bori_gallery_desc: ~~~,
  }
}
*/
router.patch('/', isLoggedIn, updateBoriGallery);

/*
PATCH /bori-gallery
{
  bori_gallery_id: ~~~
}
*/
router.patch('/', isLoggedIn, upload.single('img'), updateBoriGalleryImage);


/*
DELETE /bori-gallery
{
  bori_gallery_id: ~~~
}
*/
router.delete('/', isLoggedIn, deleteBoriGallery);

/*
PATCH /bori-gallery/like
{
  bori_gallery_id: ~~~,
  user_id: ~~~
}
*/
router.patch('/like', isLoggedIn, likeProduct);

/*
PATCH /bori-gallery/dislike
{
  bori_gallery_id: ~~~,
  user_id: ~~~
}
*/
router.patch('/dislike', isLoggedIn, dislikeProduct);

module.exports = router;