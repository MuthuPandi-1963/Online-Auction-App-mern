import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
const DBConnection = async ()=>{
    await mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database is connected");
    })
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })
}
export default DBConnection;