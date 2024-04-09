const express=require("express");
const router=express.Router({mergeParams:true});
const joiReview=require("../joiReview.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {isLogin,validateReviewerror, isReviewAuthor}=require("../middleware.js");
const review=require("../models/review.js");
const reviewRouter=require("../controller/review.js");
const ExpressError=require("../utils/ExpressError.js");
const listing=require("../models/listing.js");
//reviews route
//post route
router.post("/",validateReviewerror,isLogin,wrapAsync(reviewRouter.postRoute));
router.delete("/:rid",isLogin,isReviewAuthor,wrapAsync(reviewRouter.deleteRoute));
module.exports=router;
