const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const orderSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  order_date: {
    type: Date,
    default: Date.NOW,
  },
  order_status: {
    type: String,
    required: true,
  },
  order_detail: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Order', orderSchema);