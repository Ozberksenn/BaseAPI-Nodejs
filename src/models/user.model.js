const mongoose = require("mongoose"); // mongoose model işlemlerini kolaylaştırır.

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // trim girilen string ifadenin başında ve sonunda boşluk varsa siler.
    },
    lastName: {
      type: String,
      required: true,
      trim: true, // trim girilen string ifadenin başında ve sonunda boşluk varsa siler.
    },
    email: {
      type: String,
      required: true,
      trim: true, // trim girilen string ifadenin başında ve sonunda boşluk varsa siler.
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true, // trim girilen string ifadenin başında ve sonunda boşluk varsa siler.
    },
  },
  { collection: "users", timestamps: true }
);

const user = mongoose.model("users", userSchema);

module.exports = user;
