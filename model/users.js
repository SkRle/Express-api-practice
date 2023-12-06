const mongoose = require('mongoose');
const user = new mongoose.Schema({
    use_id : {type : String},
    username: {type : String},
    password : {type : String},
    user_detail : {type : Object}
})

module.exports = mongoose.model("user",user)