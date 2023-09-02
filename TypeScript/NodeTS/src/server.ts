import { app } from "./app.js";

app.get("/", (req, res) => {
  res.json("hello");
});

app.listen(8080, () => {
  console.log("\x1b[36m", "👍👍👍", "Listening on port 8080");
});
