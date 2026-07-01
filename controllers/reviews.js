const Listing = require("../models/listing");
const Review = require("../models/review");
module.exports.createReview = async(req,res)=>{
   try{ console.log("BODY:", req.body);
    console.log("USER:",  req.user);
    console.log( "PARAMS:", req.params);
let listing = await Listing.findById(req.params.id);
let newReview = new Review(req.body.review);
newReview.author = req.user._id;
listing.reviews.push(newReview);
await newReview.save();
await listing.save();
req.flash("success","New review Created!");
return res.redirect(`/listings/${listing._id}`);}
catch(err){
    console.log("ERROR: ",err);
    res.send(err.message);
}
};

module.exports.destroyReview = async(req,res)=>{
let {id , reviewId} = req.params;
await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
await Review.findByIdAndDelete(reviewId);
req.flash("success","Review Deleted!");
return res.redirect(`/listings/${id}`);
};