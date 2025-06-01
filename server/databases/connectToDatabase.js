import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectiontoMongoDB = async () => {
    try {
        
    const connection = await mongoose.connect(process.env.DB_STRING)

    console.log(connection.connection.host, connection.connection.port);


    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Re-throw the error for further handling
    }
}

export default connectiontoMongoDB;