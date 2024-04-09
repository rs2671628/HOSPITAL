const joi = require('joi');
module.exports=listSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        image:{
            url:joi.string(),
            filename:joi.string(),
        },
        lowprice:joi.number().required().min(0),
        highprice:joi.number().required().min(0),
        location:joi.string().required(),
        country:joi.string().required(),
        
    }).required()
});