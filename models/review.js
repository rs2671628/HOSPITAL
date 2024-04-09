const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const reviewSchema=new Schema({
    description:{
        type:String,
        require:true,
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
});
const review=mongoose.model("review",reviewSchema);
module.exports=review;
