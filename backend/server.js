import express from "express";
import connectToMongo from "./Connection/connection.js";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import cookieParser from "cookie-parser";


const PORT = 3000;
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectToMongo();
