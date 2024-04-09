const joi = require('joi');
module.exports=reviewSchema=joi.object({
    review:joi.object({
       description:joi.string().required(),
       rating:joi.number().required().min(1).max(5),
    }).required()
});