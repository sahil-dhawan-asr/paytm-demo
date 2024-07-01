const express = require("express");

const accountsRouter = express.Router();
const authMiddleware = require("../middleware/middleware");
const { User, Account } = require("../db");
const mongoose = require("mongoose");
const z = require("zod");

accountsRouter.get("/balance", authMiddleware, async function (req, res) {
  const userAccDetails = await Account.findOne({ userId: req.userId });
  return res.status(200).json({
    message: "User balance fetched successfully",
    balance: userAccDetails.balance,
  });
});

const transferBody = z.object({
  to: z.string(),
  balance: z.number().min(1),
});

accountsRouter.post("/transfer", authMiddleware, async function (req, res) {
  const response = transferBody.safeParse(req.body);
  if (!response.success) {
    return res.status(400).json(response.error);
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  const otherUser = await Account.findOne({ userId: req.body.to });
  if (!otherUser) {
    session.abortTransaction();
    return res.status(411).json({ message: "User not found" });
  }
  const fromUserBalance = await Account.findOne({ userId: req.userId });
  if (fromUserBalance.balance < req.body.balance || fromUserBalance == 0) {
    session.abortTransaction();
    return res
      .status(411)
      .json({ message: "User doesn't have sufficient balance" });
  }
  fromUserBalance.balance = fromUserBalance.balance - req.body.balance;
  otherUser.balance = otherUser.balance + req.body.balance;
  await fromUserBalance.save();
  await otherUser.save();
  await session.commitTransaction();
  session.endSession();
  res.status(200).json({ message: "Balance transferred successfully" });
});
module.exports = accountsRouter;
