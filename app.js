if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Mongo_url="mongodb://127.0.0.1:27017/hospital";
const db_url=process.env.ATLASDB_URL;
const path=require('path');
const methodOverrride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const listingsRouter=require("./routes/mainlisting.js");
const reviewsRouter=require("./routes/mainreviews.js");
const usersRouter=require("./routes/userlisting.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const User=require("./models/user.js");
const passport = require("passport");
const LocalStrategy=require("passport-local");
const { isLogin, validateerror } = require("./middleware.js");
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverrride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
  };
async function main(){
    await mongoose.connect(db_url,options);
}
main().then(()=>{
    console.log("connected to hospital Db");
}).catch((err)=>{
    console.log(err);
});
const store=MongoStore.create({
    mongoUrl:db_url,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});
store.on("error",()=>{
    console.log("error in mongo Db",err);
})
const sessionOptions={
    store,
    secret : process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    } 
}
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    res.locals.redirectUrl=req.session.redirectUrl;
    next();
});
app.use("/listing",listingsRouter);
app.use("/listing/:id/reviews",reviewsRouter);
app.use("/",usersRouter);
app.get("/new",isLogin,async(req,res)=>{
    res.render("new.ejs");
});
// app.get("/testlisting",wrapAsync(async(req,res)=>{
//     let sampleListing=new listing({
//         title:"Rohit Hospital",
//         description:"Our Duty To Saves Life",
//         lowprice:2000,
//         highprice:5000,
//         location:"Kolkata",
//         country:"India",
//     });
//     //await sampleListing.save();
//     console.log("data has been saved");
//     res.send("successful testing");
// }));
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})
app.use((err,req,res,next)=>{
    let{status=500,message="something went wrong"}=err;
    res.render("error.ejs",{err});
});
app.listen(8080,()=>{
    console.log("YOUR PORT IS START");
});

