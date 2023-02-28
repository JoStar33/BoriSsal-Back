const mongoose = require('mongoose');
const { Types: { ObjectId } } = Schema;
const { replySchema } = require('../reply');
const { Schema } = mongoose;

const boriGalleryReplySchema = new Schema({
  ...replySchema.obj,
  bori_gallery_id: {
    type: ObjectId,
    required: true,
    ref: 'BoriGallery',
  }
});

module.exports = mongoose.model('BoriGalleryReply', boriGalleryReplySchema);