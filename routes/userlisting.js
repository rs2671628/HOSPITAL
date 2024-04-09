const express=require("express");
const User=require("../models/user.js");
const userRouter=require("../controller/userlist.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {savedRedirectUrl, isLogin}=require("../middleware.js");
const passport = require("passport");
const ExpressError=require("../utils/ExpressError.js");
const router=express.Router({mergeParams:true});
router.route("/signup")
.get(userRouter.getSignup)
.post(wrapAsync(userRouter.postSignup))
router.route("/login")
.get(userRouter.getLogin)
.post(savedRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userRouter.postLogin)
router.get("/logout",userRouter.getLogOut);
module.exports=router;