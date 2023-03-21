//상세 주문정보는 order에서 배열의 형태로 관리하기로 결정.

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const orderDetailSchema = new Schema({
  bori_goods_id: {
    type: ObjectId,
    required: true,
    ref: "BoriGoods",
  },
  bori_goods_name: {
    type: String,
    required: true,
  },
  bori_goods_image: {
    type: String,
    required: true,
  },
  bori_goods_stock: {
    type: Number,
    required: true
  },
  bori_goods_price: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);