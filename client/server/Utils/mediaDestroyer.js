const cloudinary = require("cloudinary").v2

exports.destroyMedia = async (url) => {
  const u = url.split("/")
  let public_id = u[u.length - 2] + "/" + u[u.length - 1]
  public_id = public_id.substring(0, public_id.length - 4)
  return await cloudinary.uploader.destroy(public_id)
}
