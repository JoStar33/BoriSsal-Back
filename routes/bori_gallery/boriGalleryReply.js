const express = require("express");
const { getBoriGalleryReply, makeBoriGalleryReply, makeBoriGalleryChildReply, 
  updateBoriGalleryReply, updateBoriGalleryChildReply, deleteBoriGalleryReply, deleteBoriGalleryChildReply } = require("../../controllers/bori_gallery/boriGalleryReply")
const router = express.Router();
// GET /:bori_gallery_id/:limit
router.get('/:bori_gallery_id/:limit', getBoriGalleryReply);

/*
POST /bori-gallery-reply
  {
    user_id: ~~~,
    product_id: ~~~,
    content: ~~~
  }
*/
router.post('/', makeBoriGalleryReply);

/*
POST /bori-gallery-reply/child
  {
    reply_id: ~~~,
    user_id: ~~~,
    content: ~~~
  }
*/
router.post('/child', makeBoriGalleryChildReply);

/*
PATCH /bori-gallery-reply
  {
    reply_id: ~~~,
    content: ~~~
  }
*/
router.patch('/', updateBoriGalleryReply);

/*
PATCH /bori-gallery-reply/child
  {
    reply_id: ~~~,
    child_reply_id: ~~~,
    content: ~~~
  }
*/
router.patch('/child', updateBoriGalleryChildReply);

/*
DELETE /bori-gallery-reply
  {
    reply_id: ~~~
  }
*/
router.delete('/', deleteBoriGalleryReply);

/*
DELETE /bori-gallery-reply/child
  {
    reply_id: ~~~,
    child_reply_id: ~~~
  }
*/
router.delete('/child', deleteBoriGalleryChildReply);


module.exports = router;