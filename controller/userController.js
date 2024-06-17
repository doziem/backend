import User from "../model/User.js";

export const findAllUser = async (_, res) => {
  try {
    const user = await User.find({}).select(
      "name email username id createdAt location"
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(401).json("User does not exist");
    }
    const { password, __v, createdAt, updatedAt, ...userData } = user._doc;

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("Successfully Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
