import mongoose from 'mongoose'
const Objectid = mongoose.Types.ObjectId

const cartSchema=new mongoose.Schema({
    user_id:{
        type:Objectid
    },
    categories: [{
        _id: {
            type:String
        },
        category_name: {
            type: String
        },
        image: {
            type: String
        },
         price: {
            type: Number,
        },
        quantity:{
            type:Number,
        },
        total_price:{
            type:Number,
            
        }
    }],
})


const cartModel = mongoose.model('carts',cartSchema)
export default cartModel