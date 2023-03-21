const mongoose = require('mongoose');

const { Schema } = mongoose;

const boriGoodsCategorySchema = new Schema({
  category_name: {
    type: String,
    allowNull: false
  }
});

module.exports = mongoose.model('BoriGoodsCategory', boriGoodsCategorySchema);