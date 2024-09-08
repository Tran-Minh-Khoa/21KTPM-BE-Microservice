const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const router = express.Router();
const db = require("../Models/index");
const User = db.user;
function generateUniqueId(email) {
  return crypto.createHash("sha256").update(email).digest("hex");
}
router.post("/", async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const id = generateUniqueId(email);

    const user = await User.findOne({ where: { id: id } });
    if (user) {
      return res.status(400).send("This email has already been registered");
    } else {
      //   const newUser = new User();
      //   newUser.id = id;
      //   newUser.name = name;
      //   newUser.email = email;
      //   newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      //   const token = crypto.randomBytes(20).toString("hex");
      //   newUser.emailVerificationToken = token;
      //   newUser.emailVerificationExpires = Date.now() + 3600000;

      //   const savedUser = await newUser.save();
      // await EmailService({ customerMail: email, href: `http://localhost:3000/register/verify/${token}`, subject: "TCG-Trading Card Games - Email Verification" });

      const newUser = await User.create({
        id: id,
        email: email,
        name: name,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });

      return res.status(200).send(`Register success ${newUser}`);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
module.exports = router;
