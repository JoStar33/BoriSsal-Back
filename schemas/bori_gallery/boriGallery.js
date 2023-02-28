const { Types: { ObjectId } } = Schema;
const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  bori_gallery_title: {
    type: String,
    allowNull: false,
  },
  bori_gallery_desc: {
    type: String,
    allowNull: false,
  },
  bori_gallery_like: {
    type: Number,
    allowNull: false,
  },
  bori_gallery_img: {
    type: String,
    allowNull: false,
  },
  created_at: {
    type: Date,
    default: Date.NOW,
  },
});

module.exports = mongoose.model('Product', productSchema);