const express = require("express");
// const cors = require("cors");

const app = express();
const port = 5000;

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
