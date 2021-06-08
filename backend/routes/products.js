const router = require("express").Router();

const Product = require("../models/Product");

// router.get("/", function (req, res) {
//   res.cookie("name", "express").send("cookie set"); //Sets name = express
//   console.log("Cookies: ", req.cookies);
// });

// router.get("/clear", function (req, res) {
//   res.clearCookie("name");
//   res.send("cookie name cleared");
// });

// Get a product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all products
router.get("/all/all", async (req, res) => {
  try {
    const all = await Product.find({}, { __v: 0 }); // we dont want to return "__v" also
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a product
router.post("/create", async (req, res) => {
  try {
    const newProduct = await new Product({
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
      price: req.body.price,
      product_price: req.body.product_price,
      tabelMarimi: req.body.tabelMarimi,
    });
    const product = await newProduct.save();
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
});

// Add an image to a product
router.put("/:id/add/image", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // _id
    await product.updateOne({ $push: { images: req.body.image } });
    res.status(200).json("Image added!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add stock to a product
router.put("/:id/add/stock", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // _id
    await product.updateOne({
      $push: {
        stock: {
          size: req.body.size,
          number: req.body.number,
        },
      },
    });
    res.status(200).json("stock added!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.deleteOne();
    res.status(200).json("the product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const product = await Post.findById(req.params.id);
    await product.updateOne({ $set: req.body });
    res.status(200).json("the product has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

//     .o88b.  .d88b.   .d88b.  db   dD d888888b d88888b .d8888.
//    d8P  Y8 .8P  Y8. .8P  Y8. 88 ,8P'   `88'   88'     88'  YP
//    8P      88    88 88    88 88,8P      88    88ooooo `8bo.
//    8b      88    88 88    88 88`8b      88    88~~~~~   `Y8b.
//    Y8b  d8 `8b  d8' `8b  d8' 88 `88.   .88.   88.     db   8D
//     `Y88P'  `Y88P'   `Y88P'  YP   YD Y888888P Y88888P `8888Y'

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

// router.get("/to-cart/:id/S", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     const newSaleProduct = {};

//     newSaleProduct["_id"] = product._id;

//     newSaleProduct["name"] = product.name;
//     newSaleProduct["image"] = product.images[0];
//     newSaleProduct["price"] = product.price;
//     newSaleProduct["quantity"] = 0;
//     newSaleProduct["size"] = "S";
//     res
//       .cookie(
//         product.name + " " + newSaleProduct.size,
//         JSON.stringify(newSaleProduct)
//       )
//       .json(newSaleProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/to-cart/:id/:size", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const newSaleProduct = {};
    newSaleProduct["_id"] = product._id;

    newSaleProduct["name"] = product.name;
    newSaleProduct["image"] = product.images[0];
    newSaleProduct["price"] = product.price;
    newSaleProduct["quantity"] = 0;
    newSaleProduct["size"] = req.params.size;
    res
      .cookie(
        product.name + " " + newSaleProduct.size,
        JSON.stringify(newSaleProduct)
      )
      .json(newSaleProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/get-all/cookies", async (req, res) => {
  try {
    res.status(200).json(req.cookies);
  } catch (err) {
    res.status(500).json(err);
  }
  // res.clearCookie("name");
});

module.exports = router;

// to-cart/60a78a73e4deea5360fc3a0c/M
