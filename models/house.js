const mongoose = require("mongoose") 
const houseSchema = mongoose.Schema({ 
 house_bedrooms: Number, 
 house_rent: Number, 
 house_address: String 
}) 
 
module.exports = mongoose.model("House", 
houseSchema)