const { Types: { ObjectId } } = Schema;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  category_id: {
    type: ObjectId,
    required: true,
    ref: 'ProductCategory',
  },
  product_name: {
    type: String,
    allowNull: false,
  },
  product_price: {
    type: Number,
    allowNull: false,
  },
  product_stock: {
    type: Number,
    allowNull: false,
  },
  product_desc: {
    type: String,
    allowNull: false,
  },
  product_like: {
    type: Number,
    default: 0
  },
  product_image: {
    type: String,
    allowNull: false,
  },
  created_at: {
    type: Date,
    default: Date.NOW,
  },
});

module.exports = mongoose.model('Product', productSchema);