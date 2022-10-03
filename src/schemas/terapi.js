
   
const { Schema, model} = require('mongoose');
let schema = Schema({
    guildID: String,
    Type: Boolean,
    userID: String,
    Time: Number,
    EndTime: Number,
    Kisi: String,
    Katılanlar: Array
});
module.exports = model("terapi", schema);
