const { Schema, model } = require("mongoose");

const schema = Schema({

    guildID: String,
    userID: String,
    
    yedi: {type: Object, default: {Id: "",Chat: {},Voice: {},}},

    voiceChannel: {type: Object, default: {}},
    messageChannel: {type: Object, default: {}},

    voiceCategory: {type: Object, default: {}},
    messageCategory: {type: Object, default: {}},

    totalVoice: {type: Number, default: 0},
    totalMessage: {type: Number, default: 0},

    voiceXP: {type: Number, default: 0},
    messageXP: {type: Number, default: 0},
    voiceLevel: {type: Number, default: 1},
    messageLevel: {type: Number, default: 1},
	
	
    coin: {type: Number, default: 0},
	para: {type: Number, default: 0},
	dailyCoinTime: {type: Number, default: 0},
    autoRankup: {type: Array, default: []},
    
	
   
});



module.exports = model("stats", schema);