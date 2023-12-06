const mongoose = require('mongoose');
const order = new mongoose.Schema({
    order_id : {type : String},
    buyer : {type : String},
    products_buy : {type : Array},
    summary_price : {type : Number}
})

module.exports = mongoose.model("order",order)