const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Mongo_url="mongodb://127.0.0.1:27017/hospital";
const listing=require("/MAJORPROJECT/models/listing.js");
const initdata=require("./data.js");
async function main(){
    await mongoose.connect(Mongo_url);
}
main().then(()=>{
    console.log("connected to hospital Db");
}).catch((err)=>{
    console.log(err);
});
app.listen(8080,()=>{
    console.log("YOUR PORT IS START");
});
const initDb=async()=>{
    await listing.deleteMany({});
    //initdata.data.map((obj)=>({...obj,owner:"660dbe309e12bcb4fe779402"}))
    await listing.insertMany(initdata.data); 
    console.log("data inserted");
}
initDb();