import mongoose from "mongoose";

async function connectToMongo() {
    try {
        await mongoose.connect("mongodb://localhost:27017/ShoppyGlobe");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectToMongo;
