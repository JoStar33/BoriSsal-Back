const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const cartSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  product_id: {
    type: ObjectId,
    required: true,
    ref: 'Product',
  },
  product_stock: {
    type: Number,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Cart', cartSchema);