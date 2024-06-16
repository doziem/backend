import User from "../model/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    location: req.body.location,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString(),
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(401).json("Email Not found");
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET
    );

    const decryptedPass = decryptedPassword.toString(CryptoJS.enc.Utf8);

    if (decryptedPass !== req.body.password) {
      res.status(401).json("Wrong credentials");
    }

    const userToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    const { password, __v, createdAt, updatedAt, ...userData } = user._doc;

    res.status(200).json({ ...userData, token: userToken });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
