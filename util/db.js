const mongodb = require("mongodb");
const client = mongodb.MongoClient;

let _db;

// liên kết và lưu kiên kết vào database
const mongoConnect = (callback) => {
  client
    .connect(
      "mongodb+srv://mongodb_admin:mongodb_admin@cluster0.e6b0l5j.mongodb.net/shop?retryWrites=true&w=majority"
    )
    .then((result) => {
      console.log("CONNECTED::MONGODB");
      _db = result.db();
      callback(result);
    })
    .catch((err) => console.log("err:", err));
};

// trả về liên kết database nếu có tồn tại
const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "no database found";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
