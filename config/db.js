const mongoose = require("mongoose");
// Replace this with your MONGOURI.
const MONGOURI = "mongodb://username:password:@cluster0-jtpxd.mongodb.net/admin";
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = InitiateMongoServer;