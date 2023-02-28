const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
  product_id: {
    type: ObjectId,
    required: true,
    ref: 'Product',
  },
  user_id: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  product_count: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Cart', cartSchema);