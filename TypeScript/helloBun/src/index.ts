import express from "express";
import type { Express } from "express";

const app: Express = express();

app.listen(8080, () => {
  console.log("hey there server started learning bun");
});
