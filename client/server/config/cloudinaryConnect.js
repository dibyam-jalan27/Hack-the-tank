const cloudinary = require("cloudinary").v2

exports.cloudinaryConnect = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    })
    //console.log("Cloudinary connection successfull.")
  } catch (error) {
    //console.log("Connection to cloudinary failed.")
    console.error(error)
  }
}
