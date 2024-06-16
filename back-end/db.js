const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/RevanthINoteBook";

const connectToMongo = () => {
  mongoose.connect(mongoURI)
    .then(() => console.log("Revanth Connected"))
    .catch((e) => console.log(e.message));
};



module.exports = connectToMongo;
