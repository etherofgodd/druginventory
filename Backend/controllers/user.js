import expressAsyncHandler from "express-async-handler";
import generateToken from "../helpers/generateToken.js";
import User from "../models/user.js";

// @desc Get all Users
// @route GET /api/user
// @access Private Admin

const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password -__v");
  res.json({ users });
});

// @desc Register a new User
// @route GET /api/users
// @access Public

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const userExists = await User.findOne({
    name,
  });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  } else {
    const user = await User.create({
      name,
      password,
    });

    if (user) {
      res.status(201).json({
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user Request");
    }
  }
});

// @desc LOGIN  User
// @route POST /api/users/login
// @access Public

const authUser = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name });

  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid NIN or Password");
  }
});

export { getUsers, registerUser, authUser };
