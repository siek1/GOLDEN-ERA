const mongoose = require("mongoose");

var slug = require("mongoose-slug-generator");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 3,
    max: 50,
    unique: true,
  },
  slug: {
    type: String,
    require: true,
    min: 3,
    max: 50,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    min: 3,
    max: 50,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
  stock: {
    type: Array,
    default: [],
  },
  colors: {
    type: Array,
    default: [],
  },
  tabelMarimi: {
    type: String,
    require: true,
    min: 3,
    max: 50,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
