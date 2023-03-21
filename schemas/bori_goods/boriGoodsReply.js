const mongoose = require('mongoose');
const { replySchema } = require('../common/reply');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const boriGoodsReplySchema = new Schema({
  ...replySchema.obj,
  bori_goods_id: {
    type: ObjectId,
    required: true,
    ref: 'BoriGoods',
  }
});

module.exports = mongoose.model('BoriGoodsReply', boriGoodsReplySchema);