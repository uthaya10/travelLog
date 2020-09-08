var mongoose=require("mongoose")
var passportLocal=require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	phno: String,
	username: String,
	password:String
})

userSchema.plugin(passportLocal)

module.exports = mongoose.model("User", userSchema)