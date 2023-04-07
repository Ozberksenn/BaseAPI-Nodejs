const bcyrpt = require("bcrypt");
const user = require("../models/user.model");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
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
  const userSave = new user(req.body);
  await userSave
    .save()
    .then((data) => {
      return new Response(data, "Kayıt başarıyla eklendi").created(res);
      // created Response class içerisinde tanımladığımız bir method.
    })
    .catch(() => {
      throw new APIError("Kayıt Edilemedi !", 400);
    });
};

module.exports = { login, register };
