const app = require("./app");
const cloudinary = require("cloudinary");
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});
app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log(`Server is Listening on port number ${process.env.PORT}`);
  }
});
