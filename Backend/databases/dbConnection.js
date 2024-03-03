const mongoose = require("mongoose");
const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "JOB_SEEKING_APP",
    })
    .then(() => {
      console.log("Connected to Mongodb");
    })
    .catch((err) => {
      console.log(`Error in Connection to mongodb function ${err}`);
    });
};
module.exports = { dbConnection };
