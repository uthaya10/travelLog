var express = require("express")
	router = express.Router()
	Place = require("../models/places")

//new form
router.get("/travellog/new", isLoggedIn ,function(req, res){
	res.render("newplace")
})

// index Routes
router.get("/travellog/:type",isLoggedIn, function(req, res){
	var type = req.params.type
	if(type === "visited"){
		Place.find({visited: true, username: req.user.username}, function(err, places){
			if(err){
				console.log(err)
			}
			else{
				res.render("travel.ejs",{places: places, type: type})
			}
		})
	}else{
		Place.find({bucket: true, username: req.user.username}, function(err, places){
			if(err){
				console.log(err)
			}
			else{
				res.render("travel.ejs",{places: places, type: type})
			}
		})
	}
	
})

//Create POST
router.post("/travellog",isLoggedIn,function(req,res){
		var newp = {
			name:req.body.name,
			image:req.body.image,
			date: req.body.date,
			description:req.body.desc,
			visited: req.body.visited,
			bucket: req.body.bucket,
			id:req.user._id,
			username:req.user.username
		}
		Place.create(newp, function(err,place){
			if(err){
				console.log(err);
			}else{
				if(req.body.visited){
					res.redirect("/travellog/visited")
				}
				if(req.body.bucket){
					res.redirect("/travellog/bucket")
				}
				
			}
		});
});
router.get("/travellog/:id/edit", function(req,res){
	Place.findById(req.params.id, function(err, place){
		res.render("edit",{place: place})
	})
})

router.put("/travellog/:id", checkOwner, function(req, res){
	Place.findByIdAndUpdate(req.params.id,req.body.place,function(err,place){
		if(err){
			res.redirect("back");
		}
		else{
			if(place.visited){
				res.redirect("/travellog/visited")
			}else{
				res.redirect("/travellog/bucket")
			}
		}
	})
})
router.delete("/travellog/:id",checkOwner, function(req, res){
	Place.findById(req.params.id, function(err, place){
		if(err){
			console.log(err)
			res.redirect("/travellog/visited")
		}else{
			Place.findByIdAndRemove(req.params.id, function(err,place){
				if(err){
					console.log(err);
				}
				else{
					if(place.visited){
						res.redirect("/travellog/visited")
					}else{
						res.redirect("/travellog/bucket")
					}
				}
			})
		}
	})
})

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	else{
		//console.log("login")
		res.redirect("/")
	}
}

function checkOwner(req,res,next){
	if(req.isAuthenticated()){
		Place.findById(req.params.id,function(err,place){
			if(err){
				res.redirect("back");
			}
			else{
				if(place.id.equals(req.user._id)){
					return next();
				}
				else{
					res.redirect("back");
				}
			}
		})
	}
	else{
		res.redirect("back");
	}
}
module.exports = router;

