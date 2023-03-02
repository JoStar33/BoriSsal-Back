const mongoose = require('mongoose');
const { Types: { ObjectId } } = Schema;
const { Schema } = mongoose;

const deliverAddressSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  phone_number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  address_detail: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('DeliverAddress', deliverAddressSchema);