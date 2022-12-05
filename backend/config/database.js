const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`Database server connected at port: ${data.connection.port}`);
    console.log(`Database server connected at host: ${data.connection.host}`);
  });
  // .catch((err) => {
  //   console.log(err);
  // });
};

module.exports = connectDatabase;
