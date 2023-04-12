import app from "./app.js";
import { config } from "dotenv";
config({ path: "./config/config.env" });
import { connectDb } from "./config/database.js";
import cloudinary from "cloudinary";
import RazorPay from "razorpay";
import NodeCron from "node-cron";
import Stats from "./models/Stats.js";

export const razorPayInstance = new RazorPay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

connectDb().then(() => {
  NodeCron.schedule("0 0 0 1 * *", async () => {
    try {
      await Stats.create({});
    } catch (err) {
      console.error("\x1b[31m", " 👎👎👎 :", err);
      process.exit(1);
    }
  });

  app.listen(process.env.PORT, () => {
    console.log(
      "\x1b[36m",
      "👍👍👍",
      `Server Started at port : ${process.env.PORT}`
    );
  });
});
