const express = require("express");

const router = express.Router();

const userRouter = require("./userRoutes");
const accountsRouter = require("./accounts");
// const userController = require("../controllers/UsersController");

router.use("/user", userRouter);

router.use("/account", accountsRouter);
// router.post("/signup", function (req, res) {
//   userController.signup(req, res);
//   console.log("here");
// });

// router.post("signin", function () {});

// router.put("update-profile", function (req, res) {});

module.exports = router;
