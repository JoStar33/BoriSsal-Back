const { Types: { ObjectId } } = Schema;
const mongoose = require('mongoose');

const { Schema } = mongoose;

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
  }
});

module.exports = mongoose.model('Order', orderSchema);