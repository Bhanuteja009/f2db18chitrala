const mongoose = require("mongoose") 
const houseSchema = mongoose.Schema({ 
 house_bedrooms: {type:Number, min:1, max:7}, 
 house_rent: {type:Number,min:100,max:3000}, 
 house_address: {type:String, minLength:5} 
}) 
 
module.exports = mongoose.model("House", 
houseSchema)