var mongoose=require("mongoose");
var placeSchema = new mongoose.Schema({
	name: String,
	image: String,
	date: String,
	description: String,
	author: {
		id:{
               type:mongoose.Schema.Types.ObjectId,
               ref:"users"
            },
        username:String
	}
})

module.exports=mongoose.model("Bucket",placeSchema)