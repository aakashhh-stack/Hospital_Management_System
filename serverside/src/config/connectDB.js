import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS)
        console.log('Mongo Database connected successfully...');
    } catch (error) {
        console.error('DataBase connection Error:', error);
        process.exit(1);
    }
}
export default dbConnect;