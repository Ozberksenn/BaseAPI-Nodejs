const jwt = require("jsonwebtoken");
const user = require("../models/user.model");
const APIError = require("../utils/errors");

const createToken = async (user, res) => {
  // burada user ve res bilgileri bize controllerda ki loginden gelir.
  const payload = {
    sub: user._id,
    name: user.name,
    // bu payloadı aşşağıda tanımladığımız token değişkenine vereceğiz.
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    // buraya opsiyonları gireceğiz yani jwt nin şifreleme algoritması.
    algorithm: "HS512",
    // bu tokenin sona erme tarihi yani bir gün belirlersek aynı token ile giriş yapılamayacak süresi dolmuş olacak.
    expiresIn: process.env.JTW_EXPRESS_IN,
  });
  // token oluştururken bizden secret key ister. Secret key biz gelen tokeni çözümlememiz gerekir. Özel şifreyi bilmemiz gerekir ve onu çözümlemeliyiz
  return res.status(201).json({
    success: true,
    token,
    message: "Başarılı",
  });
};
const tokenCheck = async (req, res, next) => {
  const headerToken =
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ");
  if (!headerToken)
    throw new APIError("Geçersiz oturum. Lütfen oturum açın", 401);

  const token = req.headers.authorization.split(" ")[1];

  // tokeni çözümleyeceğiz.
  // jwt.verify() ile tokeni çözümleriz.
  await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) throw new APIError("Geçersiz token.", 401);

    const userInfo = await user
      .findById(decoded.sub)
      .select("_id name lastName email");

    console.log(userInfo);

    if (!userInfo) throw new APIError("Geçersiz token", 401);

    req.user = userInfo;
    next();
  });
};

module.exports = {
  createToken,
  tokenCheck,
};
