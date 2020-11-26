var express=require("express"),
	app=express(),
	bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
	seedb=require("./seed");
	Campground=require("./models/campground");

seedb();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/camp_tour");
app.use(bodyParser.urlencoded({extended:true}));
 app.set("view engine","ejs");



// Campground.create({
// 	name:"Mount Everst",
// 	image:"https://cdn.hiconsumption.com/wp-content/uploads/2019/07/Best-Affordable-Camping-Gear-000-Hero.jpg",
// 	description:"It is very high and cold but nice place to visit."
// },function(err,campground){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(campground);
// 	}
// });

//Routes
app.get("/",function(req,res){
	res.render("landing");
});

//Index - Displays a list of campgrounds
app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,campgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index",{campground:campgrounds});
		}
	});
});

// Create - Add a new campground
app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newCampground={name:name,image:image,description:desc};
	Campground.create(newCampground,function(err,campground){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

//New - Displays a form to add a new campground
app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

//Show - shows the info about one campground
app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("show",{campground : foundCampground});
		}
	});
});

app.listen(process.env.PORT || 3000,process.env.IP,function(){
	console.log("The Camp Tour Server has started");
});