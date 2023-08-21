const User = require("../model/userModel");
const generateToken = require("../config/generateToken");

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const pic = req.file ? req.file.path : null;

    if (!username || !password || !email) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }

    const token = generateToken(password);

    const user = await User.create({
      username,
      email,
      password,
      pic,
    });

    res.status(201).json({
      message: "success",
      user,
      token,
    });
  } catch (error) {
    console.log("Error 💥💥" + error);
  }
};

const getUser = async (req, res) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    data: users,
  });
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        status: "success",
        data: user,
        token: generateToken(user._id),
      });
    }

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("Error in authenticating user:" + error);
  }
};

module.exports = { registerUser, getUser, authUser };
