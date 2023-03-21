const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const cartSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  bori_goods_id: {
    type: ObjectId,
    required: true,
    ref: 'BoriGoods',
  },
  bori_goods_stock: {
    type: Number,
    required: true,
  },
  bori_goods_name: {
    type: String,
    required: true,
  },
  bori_goods_image: {
    type: String,
    required: true,
  },
  bori_goods_price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Cart', cartSchema);