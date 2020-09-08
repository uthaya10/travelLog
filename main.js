var express 		= require("express"),
	bodyParser 		= require("body-parser"),
	methodOverride 	= require("method-override"),
	mongoose 		= require("mongoose"),
	request 		= require("request"),
	passport 		= require("passport"),
	LocalStrategy 	= require("passport-local").Strategy,
	app 			= express();

//model
var User = require("./models/user")
var places= require("./models/places.js")

//RoutesImports
var authRoutes = require("./routes/auth")
var travelRoutes = require("./routes/travel")
//configuration

mongoose.connect("mongodb+srv://uthaya:uthaya123@cluster0-c4jqm.mongodb.net/travelLog?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extented: true}));
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
var session = require("express-session")({
	secret: "Love Towards Travel",
	resave: false,
	saveUninitialized: false
});

//Passport Config

app.use(session);
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req,res,next){
	res.locals.curuser=req.user;
	next();
})
// 
app.use(methodOverride("_method"));

//Use Routes
app.use(travelRoutes)
app.use(authRoutes)




app.listen(process.env.PORT || 3000, function(){
	console.log("Travel Log Server Started");
})