const bcyrpt = require("bcrypt");
const user = require("../models/user.model");
const APIError = require("../utils/errors");
const login = async (req, res) => {
  console.log(req.body);
  return res.json(req.body);
};
const register = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  const userCheck = await user.findOne({ email });
  if (userCheck) {
    throw new APIError("Girmiş olduğunuz mail kullanımda", 401);
  }
  req.body.password = await bcyrpt.hash(req.body.password, 10);
  console.log("hesh sifre:", req.body.password);

  // veritabanına kaydediyoruz.
  try {
    const userSave = new user(req.body);
    await userSave
      .save()
      .then((response) => {
        return res.status(201).json({
          success: true,
          data: response,
          message: "kayıt başarıyla eklendi.",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(": ", error);
  }
};

module.exports = { login, register };
