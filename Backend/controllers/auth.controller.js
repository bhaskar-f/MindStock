import { sentVarificationMail, welcomeEmail } from "../middleware/Email.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    const varificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // Create new user
    const user = await User.create({
      name: name,
      email: email,
      password: password,
      role: role || "builder",
      varificationCode: varificationCode,
    });

    await sentVarificationMail(user.email, user.name, varificationCode);
    // Return success response without password
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
      message: "User registered successfully",
      data: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
}

export async function verifyEmail(req, res) {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        message: "Verification code is required",
      });
    }

    const user = await User.findOne({
      varificationCode: code,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }

    // Mark user as verified
    user.isVarified = true;
    user.varificationCode = undefined;
    await user.save();

    // Send welcome email
    await welcomeEmail(user.email, user.name);

    return res.status(200).json({
      message: "Email verified successfully! You can now login.",
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error verifying email",
      error: error.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check if email is verified
    if (!user.isVarified) {
      return res.status(403).json({
        message: "Please verify your email first",
      });
    }

    // Compare passwords using bcrypt
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        _id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY },
    );

    return res.status(200).json({
      message: "Login successful",
      data: {
        email: user.email,
        name: user.name,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
}

function getAuthenticatedUserId(req) {
  return req.user?.userId || req.user?._id;
}

export async function getProfile(req, res) {
  try {
    const userId = getAuthenticatedUserId(req);
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const user = await User.findById(userId).select(
      "-password -varificationCode -resetPasswordToken -resetPasswordExpires",
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio || "",
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching profile",
      error: error.message,
    });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = getAuthenticatedUserId(req);
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const { name, role, bio } = req.body;
    if (name === undefined && role === undefined && bio === undefined) {
      return res.status(400).json({
        message: "At least one field is required to update profile",
      });
    }

    const updates = {};
    if (name !== undefined) {
      updates.name = String(name).trim();
    }
    if (role !== undefined) {
      updates.role = String(role).toLowerCase().trim();
    }
    if (bio !== undefined) {
      updates.bio = String(bio).trim();
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select(
      "-password -varificationCode -resetPasswordToken -resetPasswordExpires",
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio || "",
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
}
