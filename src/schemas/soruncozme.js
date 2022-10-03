
const { Schema, model} = require('mongoose');
const schema = Schema({
    guildID: String,
    Type: Boolean,
    userID: String,
    Time: Number,
    EndTime: Number,
    Kisi: Array,
    Katılanlar: Array
});
module.exports = model("soruncozme", schema);
