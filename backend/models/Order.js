const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  stripe_id: {
    type: String,
    require: true,
    min: 3,
    max: 150,
    unique: true,
  },
  products: {
    type: Object,
    // default: [],
    require: true,
  },
  order_info: {
    type: Object,
    require: true,

    // default: "",
  },
});

module.exports = mongoose.model("Order", OrderSchema);
