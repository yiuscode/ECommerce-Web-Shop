import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName:{ type : String, required: true},
    lastName:{ type : String, required: true},
    address:{ type : String, required: true},
    suburb:{ type : String, required: true},
    postcode:{ type : String, required: true},
    state:{ type : String, required: true},
    email:{ type : String, required: true, unique: true},
    password:{ type : String, required: true},
    isAdmin:{ type : Boolean, required: true},
    regTime : { type : Date, default: Date.now },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;