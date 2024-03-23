const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //console.log("DB connection successfull.")
  } catch (error) {
    //console.log("DB connection failed.")
    console.error(error);
    process.exit(1);
  }
};
