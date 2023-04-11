import { config } from "dotenv";
config({ path: "./config/config.env" });

import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// use of middlewares
const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// importing and using routes
import courseRoutes from "./routes/Course.js";
import userRoutes from "./routes/User.js";
import paymentRoutes from "./routes/Payment.js";
import otherRoutes from "./routes/Other.js";
import { errorHandler } from "./middlewares/Error.js";
app.use("/api/v1", courseRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", otherRoutes);

// error handling
app.use(errorHandler);

export default app;
