var express = require("express");
var router = express.Router();
const productsList = require("../Product");

let cartItems = {};

router.get("/", function (req, res, next) {
  res.send({
    code: 200,
    response: {
      data: productsList,
    },
  });
  // cartItems=[]
});

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

router.post("/", (request, response) => {
  cartItems = {
    items: { ...request.body.items },
    cart: { ...cartItems.cart, ...request.body.cart },
    total: request.body.total,
    orderId: request.body.orderId,
    lastOrderId: request.body.lastOrderId,
  };
  console.log(cartItems);
  response.send({ status: 200, message: "Cart updated in server" });
});

router.get("/cart", (req, res) => {
  if (Object.keys(cartItems).length) {
    res.json(cartItems);
    console.log(cartItems);
  } else {
    res.status(400).json({ msg: "Empty Cart! Please add items" });
  }
});

// console.log(cartItems);
module.exports = router;
