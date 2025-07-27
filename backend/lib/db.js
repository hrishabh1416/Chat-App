import mongoose from "mongoose";
export const connectDB=async function() {
    const DBURL=process.env.MONGODB_URI;
    try{
        mongoose.connection.on('connected',()=>console.log('Database Connected'));
        await mongoose.connect(DBURL);
    }
    catch(err) {
        console.log(err);
    } 
}

