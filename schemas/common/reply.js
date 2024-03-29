const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const replySchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  email: {
    type: String,
    allowNull: false,
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
    default: Date.now,
  },
});

module.exports = { replySchema };