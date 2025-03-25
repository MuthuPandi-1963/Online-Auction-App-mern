import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref:"users"
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    pincode : {
        type : Number,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    profilePicture: { type: String, default: "" },
  bio: { type: String, default: "" },
  bidHistory: [
    {
      auction: { type: mongoose.Schema.Types.ObjectId, ref: "Auction" },
      amount: Number,
      bidTime: { type: Date, default: Date.now },
    },
  ],
  wonAuctions: [
    {
      auction: { type: mongoose.Schema.Types.ObjectId, ref: "Auction" },
      finalPrice: Number,
      wonAt: { type: Date, default: Date.now },
    },
  ],
} , {timestamps : true})

const ProfileModel = mongoose.model("profiles",ProfileSchema) 
export default ProfileModel;
