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
  //자식댓글
  reply_child: {
    type: Array,
    default: []
  },
  created_at: {
    type: Date,
    default: Date.NOW,
  },
});

module.exports = { replySchema };