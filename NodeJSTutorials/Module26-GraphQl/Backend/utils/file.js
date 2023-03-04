const path = require("path");
const fs = require("fs");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.error("\x1b[31m", " 👎👎👎 :", err);
  });
};

exports.clearImage = clearImage;
