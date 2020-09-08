var mongoose=require("mongoose");
var placeSchema = new mongoose.Schema({
	name: String,
	image: String,
	date: String,
	visited: String,
	bucket: String,
	description: String,
	id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"users"
	 },
	 username: String
})

module.exports=mongoose.model("Places",placeSchema)