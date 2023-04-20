const joi = require("joi");
const APIError = require("../../utils/errors");

class authValidation {
  constructor() {}
  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          // min : minimum karakter
          // required zorunlu olması
          // max : maksimum karakter
          // trim : sağ ve solda ki boşlukları siler.
          // string olduğu belirli edilir.
          name: joi.string().trim().min(3).max(50).required().messages({
            "string.base": "İsim alanı normal metin olmalıdır.",
            "string.empty": "isim alanı boş olamaz",
            "string.min": "isim alanı en az üç karakter olmalıdır.",
            "string.max": "isim alanı en fazla 100 karakterden oluşabilir.",
            "string.required": "isim alanı zorunludur.",
          }),
          lastName: joi.string().trim().min(3).max(50).required().messages({
            "string.base": "Soyad alanı normal metin olmalıdır.",
            "string.empty": "Soyad alanı boş olamaz",
            "string.min": "Soyad alanı en az üç karakter olmalıdır.",
            "string.max": "Soyad alanı en fazla 100 karakterden oluşabilir.",
            "string.required": "Soyad alanı zorunludur.",
          }),
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(50)
            .required()
            .messages({
              "string.base": "Email alanı normal metin olmalıdır.",
              "string.empty": "Email alanı boş olamaz",
              "string.email": "Lütfen geçerli bir email giriniz.",
              "string.min": "Email alanı en az üç karakter olmalıdır.",
              "string.max": "Email alanı en fazla 100 karakterden oluşabilir.",
              "string.required": "Email alanı zorunludur.",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Şifre alanı normal metin olmalıdır.",
            "string.empty": "Şifre alanı boş olamaz",
            "string.min": "Şifre alanı en az üç karakter olmalıdır.",
            "string.max": "Şifre alanı en fazla 100 karakterden oluşabilir.",
            "string.required": "Şifre alanı zorunludur.",
          }),
          profilePhoto: joi.string().trim().required().messages({
            "string.base": "image alanı normal metin olmalıdır.",
            "string.empty": "image alanı boş olamaz",
            "string.required": "profilePhoto alanı zorunludur.",
          }),
        })
        .validateAsync(req.body);
      // sonuna validateAsync(req.body) ekledik çünkü bodyden gelen değerleri alacak ve password mail kontrol edecek.
    } catch (error) {
      throw new APIError(error.detail[0].messages, 400);
    }
    next(); // burada next yazmamızın amacı bir ara yazılım yaptık ve devam etmesi gerekir bu yüzden next() demeliyiz.
    //
  };
  static login = async (req, res, next) => {
    try {
      await joi
        .object({
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(50)
            .required()
            .messages({
              "string.base": "Email alanı normal metin olmalıdır.",
              "string.empty": "Email alanı boş olamaz",
              "string.email": "Lütfen geçerli bir email giriniz.",
              "string.min": "Email alanı en az üç karakter olmalıdır.",
              "string.max": "Email alanı en fazla 100 karakterden oluşabilir.",
              "string.required": "Email alanı zorunludur.",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Şifre alanı normal metin olmalıdır.",
            "string.empty": "Şifre alanı boş olamaz",
            "string.min": "Şifre alanı en az altı karakter olmalıdır.",
            "string.max": "Şifre alanı en fazla 100 karakterden oluşabilir.",
            "string.required": "Şifre alanı zorunludur.",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      throw new APIError(error.detail[0].messages, 400);
    }
    next();
  };
}

module.exports = authValidation;
// export ettiğimiz authValidation classında ki ki register metodunu router da ' /register a post atma sırasında kontorl amaçlı araya yerleştirmeliyiz.'
