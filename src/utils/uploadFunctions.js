const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadStream = async (buffer, folder) => {
  return new Promise((res, rej) => {
    const theTransformStream = cloudinary.uploader.upload_stream(
      folder,
      (err, result) => {
        if (err) return rej(err);
        res(result.secure_url);
      }
    );
    let str = Readable.from(buffer);
    str.pipe(theTransformStream);
  });
}

module.exports = uploadStream
