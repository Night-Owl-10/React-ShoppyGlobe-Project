import CartItem from "../Models/cartModel.js";

export const getCart = async (req, res) => {
    try {
        const cartItems = await CartItem.find({ user: req.user.id });
        res.status(200).json({ cartItems });
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { productId, title, price, thumbnail } = req.body;
        if (!productId || !title || !price || !thumbnail) {
            return res.status(400).json({ message: "All product fields are required" });
        }

        // If item already in cart, just increment quantity
        const existingItem = await CartItem.findOne({ user: req.user.id, productId });
        if (existingItem) {
            const updatedItem = await CartItem.findByIdAndUpdate(
                existingItem._id,
                { $inc: { quantity: 1 } },
                { new: true }
            );
            return res.status(200).json({ message: "Quantity increased", cartItem: updatedItem });
        }

        const cartItem = new CartItem({
            user: req.user.id,
            productId,
            title,
            price,
            thumbnail
        });
        await cartItem.save();
        res.status(201).json({ message: "Item added to cart", cartItem });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
};

export const increaseQuantity = async (req, res) => {
    try {
        const cartItem = await CartItem.findOne({ _id: req.params.cartItemId, user: req.user.id });
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        const updatedItem = await CartItem.findByIdAndUpdate(
            req.params.cartItemId,
            { $inc: { quantity: 1 } },
            { new: true }
        );
        res.status(200).json({ message: "Quantity increased", cartItem: updatedItem });
    } catch (error) {
        res.status(500).json({ message: "Error increasing quantity", error });
    }
};

export const decreaseQuantity = async (req, res) => {
    try {
        const cartItem = await CartItem.findOne({ _id: req.params.cartItemId, user: req.user.id });
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        if (cartItem.quantity <= 1) {
            await CartItem.findByIdAndDelete(req.params.cartItemId);
            return res.status(200).json({ message: "Item removed from cart" });
        }
        const updatedItem = await CartItem.findByIdAndUpdate(
            req.params.cartItemId,
            { $inc: { quantity: -1 } },
            { new: true }
        );
        res.status(200).json({ message: "Quantity decreased", cartItem: updatedItem });
    } catch (error) {
        res.status(500).json({ message: "Error decreasing quantity", error });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const cartItem = await CartItem.findOne({ _id: req.params.cartItemId, user: req.user.id });
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        await CartItem.findByIdAndDelete(req.params.cartItemId);
        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Error removing from cart", error });
    }
};

export const confirmOrder = async (req, res) => {
    try {
        await CartItem.deleteMany({ user: req.user.id });
        res.status(200).json({ message: "Your products will be delivered in 7-9 working days" });
    } catch (error) {
        res.status(500).json({ message: "Error confirming order", error });
    }
};
