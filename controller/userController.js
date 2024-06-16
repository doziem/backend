import User from "../model/User.js";

export const findAllUser = async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
