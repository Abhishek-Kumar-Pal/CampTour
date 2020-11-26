var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require(./models/comment);

var data=[
	{
		name : "Cloud mountain",
		image: "https://inteng-storage.s3.amazonaws.com/img/iea/MRw4y5ABO1/sizes/camping-tech-trends_resize_md.jpg",
		description:"Nice"
	},
	{
		name : "Mt high",
		image: "https://cdn.hiconsumption.com/wp-content/uploads/2019/07/Best-Affordable-Camping-Gear-000-Hero.jpg",
		description:"Nice"
	},
	{
	    name : "Nice",
		image : "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
		description:"Nice"
	}
];

function seedb()
{
	Campground.remove({},function(err){
		if(err)
			{
				console.log(err);
			}
		else
			{
				console.log("removed campgrounds");
							data.forEach(function(seed){
							Campground.create(seed,function(err,Campground){
					if(err)
						{
							console.log(err);
						}
					else 
						{
							console.log("Added a Campground");
							Comment.create({
								text:"nice place to visit but there is no internet",
								author:"anoymous"
							},function(err,comment){
								if(err)
									{
										console.log(err);
									}
								else
									{
										Campground.comments.push(comment);
										Campground.save();
							console.log("added comment");
									}
							});
						}
				});
			});
			}
	});
}

module.exports=seedb;


