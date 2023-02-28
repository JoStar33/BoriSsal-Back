const { Types: { ObjectId } } = Schema;
const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  product_number: {
    type: ObjectId
  }
});