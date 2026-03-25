import express from "express";
import { registerUser, loginUser, getMe, logoutUser, updateUser, deleteUser } from "../Controllers/userController.js";
import { authenticateUser } from "../Middleware/authentication.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticateUser, getMe);
router.post("/logout", logoutUser);
router.put("/:id", authenticateUser, updateUser);
router.delete("/:id", authenticateUser, deleteUser);

export default router;