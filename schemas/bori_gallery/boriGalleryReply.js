const mongoose = require('mongoose');
const { replySchema } = require('../common/reply');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const boriGalleryReplySchema = new Schema({
  ...replySchema.obj,
  bori_gallery_id: {
    type: ObjectId,
    required: true,
    ref: 'BoriGallery',
  }
});

module.exports = mongoose.model('BoriGalleryReply', boriGalleryReplySchema);