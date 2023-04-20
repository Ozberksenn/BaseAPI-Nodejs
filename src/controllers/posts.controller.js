const posts = require("../models/post.model");
const APIError = require("../utils/errors");

const post = (req, res) => {
  try {
    const postDbSave = new posts(req.body);
    postDbSave
      .save()
      .then((data) => {
        posts
          .findById(data._id)
          .populate("userId")
          .then((postData) => {
            return postData
              .save()
              .then((savedPost) => {
                return res.status(200).json({
                  data: savedPost,
                  message: "post kaydı başarılı",
                });
              })
              .catch((err) => {
                return new APIError("post kaydı başarısız.", 400);
              });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    return new APIError("Kayıt Başarısız");
  }
};

// postları çekiyoruz.
const allPosts = async (req, res) => {
  try {
    const postss = await posts.find(); // Tüm postları veritabanından çek
    res.json(postss);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { post, allPosts };
