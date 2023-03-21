const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const boriGoodsSchema = new Schema({
  category_id: {
    type: ObjectId,
    required: true,
    ref: 'BoriGoodsCategory',
  },
  bori_goods_name: {
    type: String,
    allowNull: false,
  },
  bori_goods_price: {
    type: Number,
    allowNull: false,
  },
  bori_goods_stock: {
    type: Number,
    allowNull: false,
  },
  bori_goods_desc: {
    type: String,
    allowNull: false,
  },
  bori_goods_like: {
    type: Number,
    default: 0
  },
  bori_goods_image: {
    type: String,
    allowNull: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BoriGoods', boriGoodsSchema);