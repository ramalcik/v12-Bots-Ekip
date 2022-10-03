const moment = require("moment");
require("moment-duration-format");
const conf = require("../../configs/sunucuayar.json");
const {  voice, mesaj2, star, miniicon } = require("../../configs/emojis.json");
const voiceUserParent = require("../../schemas/voiceUserParent");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const cezapuan = require("../../schemas/cezapuan");
const coin = require("../../schemas/coin");
const taggeds = require("../../schemas/taggeds");
const yetkis = require("../../schemas/yetkis");
const ceza = require("../../schemas/ceza");
const toplams = require("../../schemas/toplams");
const inviterSchema = require("../../schemas/inviter");
const messageUserChannel = require("../../schemas/messageUserChannel");
const voiceUserChannel = require("../../schemas/voiceUserChannel");
module.exports = {
    conf: {
      aliases: ["veri"],
      name: "verilerim",
      help: "verilerim"
    },
run: async (client, message, args, embed, prefix) => {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: member.user.id });
const toplamData = await toplams.findOne({ guildID: message.guild.id, userID: member.user.id });
const yetkiData = await yetkis.findOne({ guildID: message.guild.id, userID: member.user.id });
const messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
const voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
const messageUsers = messageUsersData.splice(0, 10).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join(`\n`);
const voiceUsers = voiceUsersData.splice(0, 10).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\``).join(`\n`);
const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
const voiceLength = Active2 ? Active2.length : 0;
let voiceTop;
let messageTop;
Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."
Active2.length > 0 ? voiceTop = Active2.splice(0, 5).map(x => `<#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : voiceTop = "Veri bulunmuyor."  
const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
const total = inviterData ? inviterData.total : 0;
const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika]");
      };
embed.setDescription(`${member.toString()} adlı kullanıcının ses istatistikleri
**Toplam Kategori Sıralaması(${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")})**
${miniicon} Public Odalar: \`${await category(conf.publicParents)}\`
${miniicon} Secret Odalar: \`${await category(conf.privateParents)}\`
${miniicon} Alone Odalar: \`${await category(conf.aloneParents)}\`
${miniicon} Yönetim Yetkili Odaları: \`${await category(conf.funParents)}\`
${miniicon} Kayıt Odaları: \`${await category(conf.registerParents)}\`
**Toplam Kanal Sıralaması(Toplam ${voiceLength} Kanalda Durmuş)**
${voiceTop}
**Toplam Mesaj Kanal Sıralaması(${messageData ? messageData.topStat : 0} mesaj)**
${messageTop}
**Diğer Bilgiler**
${miniicon} Toplam Kayıt: \`${toplamData ? `${toplamData.toplams.length} kişi`: "Veri bulunmuyor."}\`
${miniicon} Toplam Davet (regular): \`${inviterData ? `${total} regular`: "Veri bulunmuyor."}\`
${miniicon} Toplam Taglı: \`${taggedData ? `${taggedData.taggeds.length} kişi`: "Veri bulunmuyor."}\`
${miniicon} Toplam Çekilen Yetkili: \`${yetkiData ? `${yetkiData.yetkis.length} kişi` : "Veri bulunmuyor."}\`
`)
message.channel.send(embed)
}
}