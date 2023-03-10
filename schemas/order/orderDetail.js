//상세 주문정보는 order에서 배열의 형태로 관리하기로 결정.

const { Types: { ObjectId } } = Schema;
const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderDetailSchema = new Schema({
  product_id: {
    type: ObjectId,
    required: true,
    ref: "Product",
  },
  product_name: {
    type: String,
    required: true,
  },
  product_count: {
    type: Number,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);