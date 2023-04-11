const app = require("./app");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const { config } = require("dotenv");
config({ path: "backend/config/config.env" });

//////+++++++++++++++++++++++++++++++++++++++++//////

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//////+++++++++++++++++++++++++++++++++++++++++//////

// Environment Variables
const { PORT, MONGO_URL } = process.env;

//////+++++++++++++++++++++++++++++++++++++++++//////

// Database connect and server startup
mongoose
  .connect(MONGO_URL)
  .then((data) => {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return data;
  })
  .then((data) => {
    console.log("\x1b[36m", "👍👍👍", "Database Connected");
    app.listen(PORT, () => {
      console.log(
        "\x1b[36m",
        "👍👍👍",
        `Server Started at ${PORT} : ${data.connection.host}`
      );
    });
  })
  .catch((err) => {
    console.log(
      "\x1b[36m",
      "👍👍👍",
      "An Error Occurred while connecting to database closing down the server"
    );
    console.error("\x1b[31m", " Error 👎👎👎 : ", err);
    // close the server
    process.exit(1);
  });
