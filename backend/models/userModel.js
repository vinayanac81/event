import mongoose, { trusted } from "mongoose"
import findOrCreatePlugin from "mongoose-findorcreate"

const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
},
google_id:{
    type:String,
},
mobile:{
    type:String,
    // required:true
},
image:{
    type:String,
},
password:{
    type:String,
    // required:true
},
block:{
    type:Boolean,
}

})
userSchema.plugin(findOrCreatePlugin)
const userModel=mongoose.model("users",userSchema)

export default userModel

