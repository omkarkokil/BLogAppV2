const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const commentRouter = require("./routes/comment");
require("dotenv").config();

require("./db/db");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/public", express.static("public"));
app.use("/api/auth", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blog", commentRouter);

app.get("/", (req, res) => {
  return res.send("Booyha our backend api running⚡⚡👍");
});

app.listen(port, () => {
  console.log("Running on 5000");
});
