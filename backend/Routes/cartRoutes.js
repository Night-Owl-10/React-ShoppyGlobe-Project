import express from "express";
import { getCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, confirmOrder } from "../Controllers/cartController.js";
import { authenticateUser } from "../Middleware/authentication.js";

const router = express.Router();

router.get("/", authenticateUser, getCart);
router.post("/", authenticateUser, addToCart);
router.put("/:cartItemId/increase", authenticateUser, increaseQuantity);
router.put("/:cartItemId/decrease", authenticateUser, decreaseQuantity);
router.delete("/confirm", authenticateUser, confirmOrder);
router.delete("/:cartItemId", authenticateUser, removeFromCart);

export default router;
