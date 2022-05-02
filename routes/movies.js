var express = require("express");
var router = express.Router();
const Razorpay = require("razorpay");

// schema
const movie = require("../models/Movie");

// creating Obj with key and secret
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECERT_KEY,
});

// get movies
router.get("/", async (req, res) => {
  try {
    const data = await movie.find();

    res.send({ message: "Success!", status: true, data: data });
  } catch (err) {
    console.log(err);
    res.send({ message: "Error in connection!", status: false, err: err });
  }
});

// get individual movie
router.get("/:id", async (req, res) => {
  try {
    const data = await movie.findById(req.params.id);

    res.send({ message: "sucess!", status: true, data: data });
  } catch (err) {
    console.log(err);
    res.send({ message: "Error in connection", status: false, err: err });
  }
});

// get movie by name -> search functionality
router.post("/get-movie", async (req, res) => {
  let getMovie = req.body.name;
  try {
    const data = await movie.find({
      name: { $regex: getMovie, $options: "i" },
    });
    if (data.length !== 0) {
      res.send({ message: "Movie Found!", status: true, data: data });
    } else {
      res.send({
        message: "Movie not found! Please try the recommended movies.",
        status: false,
        data: data,
      });
    }
  } catch (err) {
    console.log(req.params.name);
    console.log(err);
    res.send({ message: "Error in connection!", status: false, error: err });
  }
});

//add movie
router.post("/add-movie", async (req, res) => {
  try {
    const data = await movie.create(req.body);
    res.send({
      message: "Movie added successfully!",
      status: true,
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.send({ message: "Error in connection!", status: false, error: err });
  }
});

// create order-ID for payments
router.post("/create-orderId", async (req, res) => {
  let options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "rcpt", // random string
  };

  instance.orders.create(options, (err, order) => {
    if (err) console.log(err);
    res.send({ data: order });
  });
});

module.exports = router;
