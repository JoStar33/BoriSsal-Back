const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    allowNull: true,
    unique: true,
  },
  nick: {
    type: String,
    allowNull: false,
  },
  password: {
    type: String,
    allowNull: true,
  },
  provider: {
    type: String,
    allowNull: false,
    default: 'local',
  },
  /*
    관리자 >> 0
    일반유저 >> 1
  */
  user_role: {
    type: Number,
    allowNull: false,
  },
  sns_id: {
    type: String,
    allowNull: true,
  },
  created_at: {
    type: Date,
    default: Date.NOW,
  },
  user_like: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('User', userSchema);
