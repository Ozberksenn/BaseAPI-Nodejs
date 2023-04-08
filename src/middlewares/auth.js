const jwt = require("jsonwebtoken");

const createToken = async (user, res) => {
  // burada user ve res bilgileri bize controllerda ki loginden gelir.
  console.log(user);

  const payload = {
    sub: user._id,
    name: user.name,
    // bu payloadı aşşağıda tanımladığımız token değişkenine vereceğiz.
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    // buraya opsiyonları gireceğiz yani jwt nin şifreleme algoritması.
    algorithm: "HS512",
    // bu tokenin sona erme tarihi yani bir gün be lirlersek aynı token ile giriş yapılamayacak süresi dolmuş olacak.
    expiresIn: process.env.JTW_EXPRESS_IN,
  });
  // token oluştururken bizden secret key ister. Secret key biz gelen tokeni çözümlememiz gerekir. Özel şifreyi bilmemiz gerekir ve onu çözümlemeliyiz
  return res.status(201).json({
    success: true,
    token,
    message: "Başarılı",
  });
};

module.exports = {
  createToken,
};
