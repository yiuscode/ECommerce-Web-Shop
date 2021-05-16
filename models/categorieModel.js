import mongoose from 'mongoose';

const categorieSchema = new mongoose.Schema({
    name:{ type : String, required: true},
    isLimit:{type: Boolean}
});

const categorieModel = mongoose.model("categories", categorieSchema);
export default categorieModel;