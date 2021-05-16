import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name:{ type : String, required: true},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    image:{ type : String, required: true},
    description:{ type : String, required: true},
    price:{ type :  Number, default: 0,required: true},
    brand:{ type : String, required: true},
    rating:{ type :  Number, default: 0,required: true},
    countInStock:{ type :  Number, default: 0,required: true},
    numReviews:{ type :  Number,default: 0, required: true}
});



const productModel = mongoose.model("products", productSchema);


export default productModel;