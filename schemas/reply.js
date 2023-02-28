const mongoose = require('mongoose');
const { Types: { ObjectId } } = Schema;
const { Schema } = mongoose;

const replySchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  content: {
    type: String,
    allowNull: false,
  },
  created_at: {
    type: Date,
    default: Date.NOW,
  },
  //부모댓글
  reply_origin_number: {
    type: Number
  },
  //댓글순서
  reply_order: {
    type: Number,
    allowNull: false,
  }
});

module.exports = { replySchema };