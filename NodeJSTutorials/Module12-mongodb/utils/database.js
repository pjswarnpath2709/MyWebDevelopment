const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callBack) => {
  const uri =
    "mongodb+srv://pulkit:pulkit@cluster0.03yuict.mongodb.net/shop?retryWrites=true&w=majority";

  MongoClient.connect(uri)
    .then((client) => {
      _db = client.db();
      callBack();
    })
    .catch((err) => {
      console.error("\x1b[31m", " 👎👎👎 :", err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw new Error("No database found!!");
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
