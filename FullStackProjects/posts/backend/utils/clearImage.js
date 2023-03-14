const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.error("\x1b[31m", " 👎👎👎 :", err);
  });
};

module.exports = clearImage;
