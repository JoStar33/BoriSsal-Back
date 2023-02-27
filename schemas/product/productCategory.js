const mongoose = require('mongoose');

const { Schema } = mongoose;

const productCategorySchema = new Schema({
  category_name: {
    type: String,
    allowNull: false
  }
});

module.exports = mongoose.model('ProductCategory', productCategorySchema);