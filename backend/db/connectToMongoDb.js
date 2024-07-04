import mongoose from "mongoose";

const connectToMongoDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL,)
        console.log("database connected successfully")

    } catch (error) {
        console.log("error connecting to mongodb" , error.message)
    }
}

export default connectToMongoDB