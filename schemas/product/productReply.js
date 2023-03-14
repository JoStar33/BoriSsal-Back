const mongoose = require('mongoose');
const { replySchema } = require('../common/reply');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const productReplySchema = new Schema({
  ...replySchema.obj,
  product_id: {
    type: ObjectId,
    required: true,
    ref: 'Product',
  }
});

module.exports = mongoose.model('ProductReply', productReplySchema);