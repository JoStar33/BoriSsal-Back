const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const orderSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  email: {
    type: String,
    allowNull: true,
    unique: true,
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
  phone_number: {
    type: String,
  },
  address: {
    type: String,
  },
  address_detail: {
    type: String,
  },
  order_detail: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Order', orderSchema);