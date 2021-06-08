const router = require("express").Router();

const Order = require("../models/Order");

router.post("/create", async (req, res) => {
  try {
    const newOrder = await new Order({
      stripe_id: req.body.stripe_id,
      order_info: req.body.order_info,
      products: req.body.products,
    });

    const order = await newOrder.save();

    res.status(200).json(order);
  } catch (err) {
    console.log(err);
  }
});

// router.get("/", function (req, res) {
//   res.cookie("name", "express").send("cookie set"); //Sets name = express
// });

// router.get("/add/order-info-to-cookies", async (req, res) => {
//   try {
//     const newOrderInfo = {};
//     newOrderInfo["First_Name"] = req.body.First_Name;

//     newOrderInfo["Last_Name"] = req.body.Last_Name;
//     newOrderInfo["Email"] = req.body.Email;
//     newOrderInfo["Telephone"] = req.body.Telephone;
//     newOrderInfo["Address"] = req.body.Address;
//     newOrderInfo["AptNumSuite"] = req.body.AptNumSuite;
//     newOrderInfo["City"] = req.body.City;
//     newOrderInfo["StateProvince"] = req.body.StateProvince;
//     newOrderInfo["Postal_Code"] = req.body.Postal_Code;
//     newOrderInfo["Country"] = req.body.Country;

//     // res.cookie("OrderInfo", JSON.stringify(newOrderInfo)).json(newOrderInfo);
//     // res.cookie("OrderInfo", "sdgsdfg").json("asdgf");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
