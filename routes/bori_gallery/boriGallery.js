const express = require("express");
const { isLoggedIn } = require("../../middlewares");
const { getBoriGallery, getBoriGalleryById, makeBoriGallery, updateBoriGallery,
  updateBoriGalleryImage, deleteBoriGallery, likeBoriGallery, dislikeBoriGallery } = require("../../controllers/bori_gallery/boriGallery")
const router = express.Router();
const { boriGalleryUpload } = require("../../utils/uploadImage")

//GET /bori-gallery
router.get('/', getBoriGallery);

//GET /bori-gallery/:bori_gallery_id
router.get('/:bori_gallery_id', getBoriGalleryById);

/*
POST /bori-gallery
{
  bori_gallery: {
    bori_gallery_title: ~~~,
    bori_gallery_desc: ~~~,
  }
}
*/
router.post('/', isLoggedIn, boriGalleryUpload.single('bori_gallery_images'), makeBoriGallery);

/*
PATCH /bori-gallery
{
  bori_gallery: {
    bori_gallery_title: ~~~,
    bori_gallery_desc: ~~~,
  }
}
*/
router.put('/:bori_gallery_id', isLoggedIn, updateBoriGallery);

/*
PATCH /bori-gallery/image/:bori_gallery_id
*/
router.patch('/image/:bori_gallery_id', isLoggedIn, boriGalleryUpload.single('bori_gallery_images'), updateBoriGalleryImage);


/*
DELETE /bori-gallery/:bori_gallery_id
*/
router.delete('/:bori_gallery_id', isLoggedIn, deleteBoriGallery);

/*
PATCH /bori-gallery/like
{
  bori_gallery_id: ~~~,
}
*/
router.patch('/like', isLoggedIn, likeBoriGallery);

/*
PATCH /bori-gallery/dislike
{
  bori_gallery_id: ~~~,
}
*/
router.patch('/dislike', isLoggedIn, dislikeBoriGallery);

module.exports = router;