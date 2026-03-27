import express from "express";
import connectToMongo from "./Connection/connection.js";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://react-shoppy-globe-project.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectToMongo();
