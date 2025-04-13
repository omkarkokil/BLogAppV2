const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnect = mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

module.exports = dbConnect;
