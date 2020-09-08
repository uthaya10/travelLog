var express 	= require("express");
var router		= express.Router()
var User		= require("../models/user")
var passport	= require("passport");

//login - Register FOrm

router.get("/", function(req, res){
	res.render("log_reg", {errorMessage: req.query.message,signupError: req.query.message })
})

router.post("/",passport.authenticate("local", {successRedirect: "/travellog/visited",failureRedirect:"/?message=Incorrect Password or Username"}), function(req, res){
})

router.post("/register", function(req, res){
	User.register(new User({name: req.body.city, email: req.body.email, phno: req.body.phno, username: req.body.username}),req.body.password, function(err,user){
		if(err){
			console.log(err)
			return res.redirect("back")
		}
		passport.authenticate("local")
		(req,res,function(){
			res.redirect("/travellog/visited");
		})
	})
})

router.get("/logout",function(req,res){
	req.logOut();
	res.redirect("/");
})

module.exports = router;