const multer = require("multer");
const path = require("path"); // node js kütüphanesi
const fs = require("fs"); // node js kütüphanesi.
const { func } = require("joi");

const fileFilter = (req, file, cb) => {
  // öncelikle dosya isimlendirmesi istediğimiz şekilde ise onu yakalayabilmemiz için dosya uzantılarını tanımlayacağız.
  const allowedMimeTypes = [
    "image/jpg",
    "image/gif",
    "image/jpeg",
    "image/png",
  ];
  if (!allowedMimeTypes.includes(file.mimeType)) {
    // yüklemeye çalıştığımız dosyanın mimeType bunun içerisinde yoksa hata verecek.
    cb(
      new Error(
        "Bu resim tipi desteklenmemektedir. Lütfen farklı bir resim seçiniz."
      ),
      false
    );
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // yüklemek istediğimiz konumu burada belirtiyoruz.
    const rootDir = path.dirname(require.main.filename); // projenin ana dizini.
    console.log("requ : ", require.main.filename);
    fs.mkdirSync(path.join(rootDir, "/public/upload"), { recursive: true }); // recursive : true iç içe dosyalar oluşturmamıza yarıyor.
    cb(null, path.join(rootDir, "/public/upload")); // burada klasörler içerisine yüklüyor önceki satırda yoksa oluşturuyor.
  },
  filename: function (req, file, cb) {
    // dosyanın uzantısını almamız lazım. url oluşturcağız.
    const extension = file.mimetype.split("/")[1];
    if (!req.savedImages) req.savedImages = [];
  },
});
