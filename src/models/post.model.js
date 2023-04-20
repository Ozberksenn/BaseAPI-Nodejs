const mongoose = require("mongoose");
const User = require("./user.model");
const postSchema = new mongoose.Schema(
  {
    postImage: {
      type: String,
      required: true,
      trim: true, // trim girilen string ifadenin başında ve sonunda boşluk varsa siler.
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  { collection: "posts", timestamps: true } // createdAt ve updateAt ekliyor.
);
const posts = mongoose.model("posts", postSchema);

module.exports = posts;
