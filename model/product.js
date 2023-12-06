const mongoose = require('mongoose');
const product = new mongoose.Schema({
    product_id : {type : String},
    product_name : {type : String},
    price : {type : Number},
    amount : {type : Number},
    product_img :{type : String},
    detail : {type : Object}
})

module.exports = mongoose.model("products",product)