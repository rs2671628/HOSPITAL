const User=require("../models/user.js");
const ExpressError=require("../utils/ExpressError.js");

module.exports.getSignup=(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.postSignup=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const regUser=await User.register(newUser,password);
    req.login(regUser,(err)=>{
        if(err){
            return next(err);
        }
    req.flash("success","you finally Signed Up");
    res.redirect("/listing");
    })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}
module.exports.getLogin=(req,res)=>{
    res.render("users/login.ejs");
}
module.exports.postLogin=async(req,res)=>{
    req.flash("success","Thanks for Login");
    console.log("hi2");
    res.redirect("./listing");
}
module.exports.getLogOut=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you re Logged Out");
        res.redirect("/listing");
    })
}