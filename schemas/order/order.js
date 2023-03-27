const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const orderSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  price: {
    type: Number,
    default: 0
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  order_status: {
    type: String,
    required: true,
    default: '배송준비'
  },
  order_detail: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Order', orderSchema);