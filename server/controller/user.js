const mongoose = require("mongoose");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const pic = req.file ? req.file.filename : null;
    console.log(req.file);
    const emailfind = await User.findOne({ email });

    if (emailfind) {
      return res.json({ status: false, msg: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hash, pic });
    delete User.password;

    const createdUser = await User.findOne({ email }).select("-password");

    return res.json({
      msg: "Register Successfull",
      status: true,
      user,
      token: generateToken(createdUser),
    });
  } catch (error) {
    console.log("Error" + error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ msg: "Invalid credentials", status: false });
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);

  if (!isMatchPassword) {
    return res.json({ msg: "Invalid credentials", status: false });
  }

  const afterAuth = await User.findOne({ email }).select("-password");

  return res.json({
    msg: "Log in successfull",
    status: true,
    user,
    token: generateToken(afterAuth),
  });
};

module.exports = { RegisterUser, loginUser };
