const Listing=require("./models/listing.js");
const review=require("./models/review.js");
const ExpressError=require("./utils/ExpressError.js");
const joiReview=require("./joiReview.js");
const joiSchema=require("./joiSchema.js");
module.exports.isLogin=(req,res,next)=>{
    console.log("akane vul")
    if(!req.isAuthenticated()){
        console.log("hi");
        req.flash("error","must be logged in");
        return res.redirect("/login");
    }
    next();
    
}
module.exports.savedRedirectUrl=(req,res,next)=>{
    req.session.redirectUrl=req.originalUrl;
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    console.log(id);
    let listing= await Listing.findById(id);
    console.log(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you dont have permission to do it");
        console.log("middlewares");
        res.redirect(`/listing/${id}`);
    }else{
    next();
    }
}
module.exports.validateReviewerror=(req,res,next)=>{
    console.log("yo");
    let {error}=joiReview.validate(req.body);
    if(error){
        console.log("hihe");
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(404,errMsg);
    }else{
        next();
    }
};
module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,rid}=req.params;
    let listreview=await review.findById(rid);
    if(!listreview.author.equals(res.locals.currUser._id)){
        req.flash("error","you are not the author of this Review");
        console.log("middlewares");
        res.redirect(`/listing/${id}`);
    }else{
    next();
    }

};
module.exports.validateerror=(req,res,next)=>{
    let {error}=joiSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(404,errMsg);
    }else{
        next();
    }
}