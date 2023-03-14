const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const deliverAddressSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  phone_number: {
    type: String,
  },
  address: {
    type: String,
  },
  address_detail: {
    type: String,
  }
});

module.exports = mongoose.model('DeliverAddress', deliverAddressSchema);