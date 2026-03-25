import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const cookieSettings = { httpOnly: true, secure: false, sameSite: "lax", maxAge: 3600000 }

export const registerUser = async (req, res) => {
    try {
        const { avatar, name, contact, email, address, pincode, city, state, country, password } = req.body;
        if (!avatar || !name || !contact || !email || !address || !pincode || !city || !state || !country || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (isNaN(contact)) {
            return res.status(400).json({ message: "Contact No. must not contain any alphabets" });
        }

        if (contact.length !== 10) {
            return res.status(400).json({ message: "Please enter a valid 10-digit Contact No." });
        }

        if (isNaN(pincode)) {
            return res.status(400).json({ message: "Pincode must not contain any alphabets" });
        }

        if (pincode.length !== 6) {
            return res.status(400).json({ message: "Please enter a valid 6-digit Pincode." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({
            avatar,
            name,
            contact,
            email,
            address,
            pincode,
            city,
            state,
            country,
            password
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
        res.cookie("token", token, cookieSettings);
        res.status(200).json({ message: "User logged in successfully", user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", cookieSettings);
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out user", error });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { avatar, name, contact, email, address, pincode, city, state, country } = req.body;

        if (!avatar || !name || !contact || !email || !address || !pincode || !city || !state || !country) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (isNaN(contact)) {
            return res.status(400).json({ message: "Contact No. must not contain any alphabets" });
        }

        if (contact.length !== 10) {
            return res.status(400).json({ message: "Please enter a valid 10-digit Contact No." });
        }

        if (isNaN(pincode)) {
            return res.status(400).json({ message: "Pincode must not contain any alphabets" });
        }

        if (pincode.length !== 6) {
            return res.status(400).json({ message: "Please enter a valid 6-digit Pincode." });
        }
        const SignedInUser = req.params.id;
        if (SignedInUser !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findById(SignedInUser);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await User.findByIdAndUpdate(SignedInUser, req.body, { new: true });
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const SignedInUser = req.params.id;
        if (SignedInUser !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findById(SignedInUser);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await User.findByIdAndDelete(SignedInUser);
        res.clearCookie("token", cookieSettings);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
