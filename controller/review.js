const review=require("../models/review.js");
const listing=require("../models/listing.js");
const User=require("../models/user.js");
module.exports.postRoute=async(req,res)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    let newReview=await new review(req.body.review);
    newReview.author=req.user._id;
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    req.flash("success","New Review Created!");
    console.log("saved");
    console.log(newReview);
    res.redirect(`/listing/${id}`);
}
module.exports.deleteRoute=async(req,res)=>{
    let{id,rid}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:rid}});
    await review.findByIdAndDelete(rid);
    req.flash("error","Deleted the Review !");
    console.log("deleted relationship also");
    res.redirect(`/listing/${id}`);

}