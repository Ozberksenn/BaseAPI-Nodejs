const bcyrpt = require("bcrypt");
const user = require("../models/user.model");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const login = async (req, res) => {
  const { email, password } = req.body;
  // const user = user.findOne({email : req.body.email}) // bu şekilde de kullanılabilir ancak allta ki kullaım daha doğru.
  const userInfo = await user.findOne({ email });
  console.log(userInfo);
  if (!userInfo) throw new APIError("Email ya da password hatalı ", 401);

  const comparePasword = await bcyrpt.compare(password, userInfo.password);
  if (!comparePasword) throw new APIError("Email ya da password hatalı ", 401);

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
