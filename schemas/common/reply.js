const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

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
  //μμλκΈ
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