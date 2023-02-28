const { Types: { ObjectId } } = Schema;
const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderDetailSchema = new Schema({
  order_id: {
    type: ObjectId,
    required: true,
    ref: "Order",
  },
  product_id: {
    type: ObjectId,
    required: true,
    ref: "Product",
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