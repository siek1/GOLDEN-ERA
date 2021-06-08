const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//

// if (process.env.NODE_ENV !== "production") {
// require("dotenv").load();
// }

const productRoute = require("./routes/products.js");
const checkoutRoute = require("./routes/checkout.js");
const orderRoute = require("./routes/orders.js");

//

const app = express();
dotenv.config();
PORT = process.env.PORT || 5000;

// MONGO DB
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("----------- DATABASE CONNECTED -----------");
    console.log("----------- DATABASE CONNECTED -----------");
    console.log("----------- DATABASE CONNECTED -----------");
  }
);

// MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(cookieParser());

//

app.use("/api/products", productRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/orders", orderRoute);

//

app.listen(PORT, () => {
  console.log(".");
  console.log(".");
  console.log("======================================================");
  console.log("======================================================");
  console.log(`Server running on link => http://localhost:${PORT}  <=`);
  console.log("======================================================");
  console.log("======================================================");
  console.log(".");
  console.log(".");
});
