const express = require("express");

const router = express.Router();
const z = require("zod");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { User } = require("../db");
const { Account } = require("../db");
const JWT_SECRET = require("../config");
const authMiddleware = require("../middleware/middleware");

const signupBody = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});
const saltRounds = 10;

router.post("/signup", async function (req, res) {
  const response = signupBody.safeParse(req.body);
  if (!response.success) {
    return res.status(400).json(response.error);
  }

  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    const salt = await bcrypt.genSalt(saltRounds);

    const newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: await bcrypt.hash(req.body.password, salt),
    });
    const savedUser = await newUser.save();
    const account = new Account({
      userId: savedUser._id,
      balance: Math.floor(1 + Math.random() * 10000),
    });
    await account.save();
    const userToken = jwt.sign({ user_id: savedUser._id }, JWT_SECRET);
    return res
      .status(200)
      .json({ token: userToken, message: "User Signed up successfully" });
  }
  return res.status(400).json({ message: "Username is already taken" });
});

const signInBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signin", async function (req, res) {
  const userDetails = await User.findOne({
    username: req.body.username,
  });
  if (!userDetails) {
    return res.status(411).json({ message: "No such user exists" });
  }
  if (!(await bcrypt.compare(req.body.password, userDetails.password))) {
    return res.status(411).json({ message: "Invalid user password" });
  }
  const userToken = jwt.sign({ user: userDetails }, JWT_SECRET);
  return res
    .status(200)
    .json({ token: userToken, message: "User logged in successfully" });
});

router.get("/my-profile", authMiddleware, async function (req, res) {
  const user = await User.findById(req.userId);
  res.status(200).json({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    },
    message: "User details retieved successfully",
  });
});

const profileUpdate = z.object({
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6).optional(),
});

router.put("/", authMiddleware, async function (req, res) {
  const response = profileUpdate.safeParse(req.body);
  const salt = await bcrypt.genSalt(saltRounds);
  if (!response.success) {
    return res.status(400).json(response.error);
  }

  const user = await User.findById(req.userId);
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;

  if (req.body.password !== undefined) {
    user.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    await user.save();
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    return res.status(411).json({ message: err });
  }
});

router.get("/bulk", authMiddleware, async function (req, res) {
  const filter = req.query.filter || "";
  const userDetails = await User.find({
    _id: { $ne: req.userId },
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });
  const users = userDetails.map((user) => ({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  }));
  return res
    .status(200)
    .json({ data: users, message: "Users list retrieved successfully" });
});

module.exports = router;
