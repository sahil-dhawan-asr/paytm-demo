const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sahildhawan74:1Qi9xmcPCuHUBBzb@cluster0.uozoafd.mongodb.net/paytm"
  )
  .then(() => console.log("connected"));

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  password: { type: String },
  amount: { type: Number, default: 0 },
  created_at: { type: Date },
  updated_at: { type: Date },
});

const User = mongoose.model("User", UserSchema);

const accountsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountsSchema);

module.exports = {
  User,
  Account,
};
