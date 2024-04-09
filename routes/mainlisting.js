const express=require("express");
const router=express.Router({mergeParams:true});
const joiSchema=require("../joiSchema.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {isLogin, isOwner,validateerror}=require("../middleware.js");
const listingRouter=require("../controller/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const ExpressError=require("../utils/ExpressError.js");
const upload = multer({storage})
router.route("/")
.get(wrapAsync(listingRouter.slashGet))
.post(isLogin,upload.single("listing[image]"),wrapAsync(listingRouter.createRoute))
router.route("/:id")
.get(wrapAsync(listingRouter.getId))
.patch(isLogin,isOwner,upload.single("listing[image]"),wrapAsync(listingRouter.patchRoute))
.delete(isLogin,isOwner,wrapAsync(listingRouter.deleteRoute))
router.get("/:id/edit",isLogin,isOwner,wrapAsync(listingRouter.getEdit));
module.exports=router;