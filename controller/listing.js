const listing=require("../models/listing.js");
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const ExpressError=require("../utils/ExpressError.js");
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
module.exports.slashGet=async (req,res)=>{
    let lists=await listing.find({}).populate("reviews");
    res.render("listings.ejs",{lists});
}
module.exports.index = async (req, res) => {
    try {
        let search = '';
        const dj=req.query.search;
        console.log("dj"+dj)
        if (req.query.search) {
            search = req.query.search;
        }
        const allListings = await listing.find({
            title: {
                $regex: '.*' + search + '.*',
                $options: 'i'
            }
        });

        res.render("listing/listings.ejs", { allListings });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("An error occurred while fetching listings.");
    }
};

module.exports.renderNew=async(req,res)=>{
    res.render("new.ejs");    
}
module.exports.getId=async(req,res)=>{
    let {id}=req.params;
    let db=await listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    }).populate("owner");
    if(!db){
        req.flash("error","Listing You requested Doesn't Exist !");
        res.redirect("/listing");
    }else{
        
    res.render("listingdetails.ejs",{db});
    }
}
module.exports.createRoute=async(req,res)=>{
    let response=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send()
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,"",filename);
    const newlisting= new listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image={url,filename};
    newlisting.geometry=response.body.features[0].geometry;
    console.log(req.user._id);
    let geo=await newlisting.save();
    console.log(geo);
    if(!newlisting){
       req.flash("success","New Listing Created !");
    }
    console.log("successfully inserted");
    res.redirect("/listing");
}
module.exports.getEdit=async(req,res)=>{
    let {id}=req.params;
    let db=await listing.findById(id);
    if(!db){
        req.flash("error","You Can't edit Because The Hospital Doesn't Exist !");
        res.redirect("/listing");
    }else{
        let originalUrl=db.image.url;
        originalUrl=originalUrl.replace("/upload","/upload/h_300,w_250")
    res.render("edit.ejs",{db,originalUrl});
    }
}
module.exports.patchRoute=async(req,res)=>{
    console.log(req.body.listing.location);
    let response=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send()
    let {id}=req.params;
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing");
    }
    let listi=await listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listi.image={url,filename};
    await listi.save();
    }
    console.log(req.body.listing.location);
    //console.log(response)
    console.log(response.body.features[0].geometry);
    listi.geometry.type=response.body.features[0].geometry.type;
    listi.geometry.coordinates=response.body.features[0].geometry.coordinates;
    await listi.save();
    req.flash("success","Succesfully Updated Hospital Data !");
    console.log("updated");
    res.redirect(`/listing/${id}`);
}
module.exports.deleteRoute=async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Finally Deleted the Hospital!");
    console.log("deleted");
    res.redirect("/listing");
}