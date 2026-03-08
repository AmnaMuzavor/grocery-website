const { Users, Sequelize } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRET;


const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await Users.findOne({
      where: { [Op.or]: [{ email }, { phone }] }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email or phone already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await Users.create({
      name: name.trim(),
      email,
      phone,
      password_hash: hashedPassword,
      verification_token: verificationToken
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const verifyLink = `${process.env.CLIENT_URL}/verify/${verificationToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your account",
      html: `<h3>Click below to verify your account</h3>
             <a href="${verifyLink}">${verifyLink}</a>`
    });

    res.status(201).json({
      message: "Signup successful. Please verify your email."
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const login = async (req, res) => {
  try {

    const { emailOrPhone, password } = req.body;

    const user = await Users.findOne({
      where: {
        [Op.or]: [
          { email: emailOrPhone },
          { phone: emailOrPhone }
        ]
      }
    });


    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    if (!user.is_verified) {
      return res.status(401).json({
        message: "Please verify your email first"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }


    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};



const resetPassword = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    res.json({ message: "Route working" });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); 

    user.reset_token = resetToken;
    user.reset_token_expiry = expiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetLink = `${process.env.CLIENT_URL}/reset/${resetToken}`;

    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `<a href="${resetLink}">Reset Password</a>`
    });

    res.json({ message: "Reset link sent to email" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,resetPassword
};