const mongoose=require("mongoose");
const review=require("../models/review.js");
const Schema=mongoose.Schema;
const listingSchema=new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        url:String,
        filename:String,
    },
    lowprice:{
        type:Number,
        require:true
    },
    highprice:{
        type:Number,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    general:{
        avaliable:Number,
        capacity:Number,
    },
    female:{
        avaliable:Number,
        capacity:Number,
    },
    cabin:{
        avaliable:Number,
        capacity:Number,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"review"
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    }
    
});
listingSchema.post("findOneAndDelete",async(listing)=>{
 if(listing){
    await review.deleteMany({_id : {$in: listing.reviews}});
    console.log("delete the ids in listings");
 }
})
const listing=mongoose.model("listing",listingSchema);
module.exports=listing;