const User = require("../models/userModel");
const GoogleUser = require("../models/googleUserModel");
const validator = require("validator");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  try {
    if (req.body.googleAccessToken) {
      const googleRes = req.body.googleAccessToken;

      const email = googleRes.email;

      const googleUser = await GoogleUser.findOne({ email });

      if (!googleUser) {
        throw Error("Email is not registered yet");
      }

      res.status(200).json({ email });
    } else {
      const { email, password } = req.body;

      if (!email || !password) {
        throw Error("Need to have both fields");
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw Error("Email is not registered yet");
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw Error("Wrong password");
      }

      // const token = createToken(user._id);

      res.status(200).json({ email });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    if (req.body.googleAccessToken) {
      const googleRes = req.body.googleAccessToken;

      const email = googleRes.email;

      const exists = await GoogleUser.findOne({ email });

      if (exists) {
        throw Error("Email already registered");
      }

      const googleUser = new GoogleUser({ email });

      const savedGoogleUser = googleUser.save();

      res.status(200).json({ email });
    } else {
      const { email, password } = req.body;

      if (!email || !password) {
        throw Error("Need to have both fields");
      }

      if (!validator.isEmail(email)) {
        throw Error("Enter valid email");
      }

      const exists = await User.findOne({ email });

      if (exists) {
        throw Error("Email already registered");
      }

      const salt = await bcrypt.genSalt(10);

      const hash = await bcrypt.hash(password, salt);

      const user = new User({
        email,
        password: hash,
      });

      const savedUser = await user.save();

      // const token = createToken(savedUser._id);

      res.status(200).json({ email });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, registerUser };
