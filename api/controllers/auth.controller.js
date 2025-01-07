import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// SIGNUP Functionality

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: pass, ...rest } = user._doc;

    res
      .status(200)
      .cookie("access-token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json(rest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const google = async (req, res) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if(user){
      const token=  jwt.sign({userId:user._id},process.env.JWT_SECRET);

      const {password:pass,...rest}=user._doc;
      res.status(200).cookie('access-token',token,{
        httpOnly:true,
        maxAge:24*60*60*1000, // 1 day
      }).json(rest)

    }
    else{
      const generatedPassword= Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
      const hashedPassword= await bcrypt.hash(generatedPassword,10);
      const newUser = new User({
        username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
        email:email,
        password:hashedPassword,
        profilePicture:googlePhotoUrl,
      })
      await newUser.save();
      const token=  jwt.sign({userId:user._id},process.env.JWT_SECRET);

      const {password:pass,...rest}=user._doc;
      res.status(200).cookie('access-token',token,{
        httpOnly:true,
        maxAge:24*60*60*1000, // 1 day
      }).json(rest)

    }



  } 
  
  
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};
