const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  amount: { type: Number, default: 0 },
  created_at: { type: date },
  updated_at: { type: date },
});

export default User;
