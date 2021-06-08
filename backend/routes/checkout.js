const router = require("express").Router();
const Product = require("../models/Product");

const stripe = require("stripe")(
  "sk_test_51IxHoLD6JHUnsXORJduuDmTLZLCWEsRpgTfnRfMoXIHQFB86SMTGlZHS6zA9ifYXtdckSQb6NUBJfLktwXDBIm6n007uvJG4Bu"
);

const YOUR_DOMAIN = "http://localhost:3000/";

router.post("/create-checkout-session", async (req, res) => {
  const cookieJar = req.body;

  // cookieJar.map((elem) => {});

  // console.log(cookieJar);

  line_items_custom_list = [];

  await Promise.all(
    cookieJar.map(async (product) => {
      try {
        const foundProduct = await Product.findById(product._id);
        const returnObj = {};
        returnObj["price"] = foundProduct.product_price;
        returnObj["adjustable_quantity"] = {
          enabled: true,
          minimum: 1,
          maximum: 10,
        };
        returnObj["quantity"] = product.quantity;
        // console.log("hahaha");
        // console.log(returnObj);
        line_items_custom_list.push(returnObj);
      } catch (err) {
        console.log(err);
      }
    })
  );

  console.log(line_items_custom_list);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: line_items_custom_list,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}success?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}`,
  });
  res.json({
    id: session.id,
  });
});

router.post("/session-existance/:id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    res.json(session);
  } catch (err) {
    res.json("INVALID");
  }
});

module.exports = router;
