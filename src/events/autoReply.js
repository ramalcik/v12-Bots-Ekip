const conf = require("../configs/sunucuayar.json")
const { green } = require("../configs/emojis.json");
const sunucuayar = require("../models/sunucuayar");

module.exports = async (message) => {
  if (message.content.toLowerCase() === "tag" || message.content.toLowerCase() === "!tag" || message.content.toLowerCase() === ".tag") {
    message.lineReply(`**İsim Tagı:** \`${conf.tags} - ${conf.tags2}\`
**Etiket Tagı:** \`#${conf.etikets}\``);
  }
};
module.exports.conf = {
  name: "message"
};