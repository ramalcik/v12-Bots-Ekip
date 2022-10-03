const mongoose = require("mongoose");

const SiteData = mongoose.model("sitedata", mongoose.Schema({
  guildID: { type: String, default: "" },
  channelID: { type: String, default: "" },
  tagLog: { type: String, default: "" },
  messageLog: { type: String, default: "" },
  voiceLog: { type: String, default: "" },
  yasakTagLog: { type: String, default: "" },
  denetimLog: { type: String, default: "" },
  tagliLog: { type: String, default: "" },
  banLog: { type: String, default: "" },
  muteLog: { type: String, default: "" },
  jailLog: { type: String, default: "" },
  warnLog: { type: String, default: "" },
  cezapLog: { type: String, default: "" },
  rewardLog: { type: String, default: "" },
  rolLog: { type: String, default: "" },
  serverLog: { type: String, default: "" },
  roleLog: { type: String, default: "" },
  channelLog: { type: String, default: "" },
  botSesKanal: { type: String, default: "" },
  chatchannel: { type: String, default: "" },
  girisKanal: { type: String, default: "" },
  davetKanalı: { type: String, default: "" },
  komutKanal: { type: Array, default: "" },
  cezapLog: { type: Array, default: "" },


  etkinlikRole: { type: String, default: "" },
  cekilisRole: { type: String, default: "" },
  banHammer: { type: String, default: "" },
  jailHammer: { type: String, default: "" },
  muteHammer: { type: String, default: "" },
  vmuteHammer: { type: String, default: "" },
  clownHammer: { type: String, default: "" },
  move: { type: String, default: "" },
  cezalıRol: { type: String, default: "" },
  registrar: { type: String, default: "" },
  vipRol: { type: String, default: "" },
  kayıtsızRol: { type: String, default: "" },
  tagRol: { type: String, default: "" },
  mutedRol: { type: String, default: "" },
  vmutedRol: { type: String, default: "" },
  boosterRol: { type: String, default: "" },
  yonetimRoles: { type: Array, default: "" },
  erkek: { type: Array, default: "" },
  kadın: { type: Array, default: "" },


  publicParents: { type: Array, default: "" },
  regParents: { type: Array, default: "" },
  privateParents: { type: Array, default: "" },
  gameParents: { type: Array, default: "" },



  WhiteListMembers:  { type: Array, default: [] },



  welcomeChannels:  { type: Array, default: [] },











  
}));

module.exports = SiteData