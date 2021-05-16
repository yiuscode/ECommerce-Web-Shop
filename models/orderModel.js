import mongoose from 'mongoose';


const ordersSchema = new mongoose.Schema({

    
    userid:{ type : String, required: true},

    shippingInfo: 
        {
          firstName: { type: String, required: true },
          lastName: { type: String, required: true },
          address: { type: String, required: true },
          suburb: { type: String, required: true },
          state: { type: String, required: true },
          postcode: { type: Number, required: true },
        },
    paymentMethod:{ type : String, required: true},
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    totalPrice:{type: Number,required: true},
    time : { type : Date, default: Date.now },
    status: { type: String,  default: 'Received'},
    trackingNum: { type: String,  default: ''}

});



const orderModel = mongoose.model("orders", ordersSchema);


export default orderModel;