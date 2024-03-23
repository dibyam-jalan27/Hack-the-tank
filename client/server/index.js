const express = require("express");

const app = express();
const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const contactRoutes = require("./routes/Contact");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnect } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinaryConnect");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    //  tempFileDir: '/tmp/',
    //  debug: true,
  })
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactRoutes);

// app.get("/",(req,res)=>{
//    res.send(`<h1>Server Started</h1>`)
// });

app.listen(PORT, () => {
  console.log("Server Started at port : " + PORT + ".");
});
