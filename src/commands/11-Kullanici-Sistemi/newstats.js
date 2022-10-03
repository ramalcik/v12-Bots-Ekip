const {  voice, mesaj2, star, miniicon } = require("../../configs/emojis.json");
const messageUserChannel = require("../../schemas/messageUserChannel");
const voiceUserChannel = require("../../schemas/voiceUserChannel");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const voiceUserParent = require("../../schemas/voiceUserParent");
const moment = require("moment");
const inviterSchema = require("../../schemas/inviter");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');
const conf = require("../../configs/sunucuayar.json")
module.exports = {
    conf: {
      aliases: ["nstat","nme"],
      name: "nstat",
      help: "nstat"
    },
  
run: async (client, message, args, embed, prefix) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;

    const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
      };
      
      const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
      const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
      let voiceTop;
      let messageTop;
      Active1.length > 0 ? messageTop = Active1.splice(0, 10).map((x, index) => `\`${index+1}:\` <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."
      Active2.length > 0 ? voiceTop = Active2.splice(0, 10).map((x, index) => `\`${index+1}:\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : voiceTop= "Veri bulunmuyor."

      const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
      const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });
      const messageWeekly = messageData ? messageData.weeklyStat : 0;
      const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
      const messageDaily = messageData ? messageData.dailyStat : 0;
      const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");


      embed.setDescription(`
Toplam Ses: ${moment.duration(voiceData ? voiceData.topStat : 0).format("H [ssat], m [dakika]")}
Toplam Mesaj: ${messageData ? messageData.topStat : 0} mesaj

**Ses Kategori Sıralaması**
Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
Public Odalar: \`${await category(conf.publicParents)}\`
Secret Odalar: \`${await category(conf.privateParents)}\`
Alone Odalar: \`${await category(conf.aloneParents)}\`
Yönetim Yetkili Odaları: \`${await category(conf.funParents)}\`
Kayıt Odaları: \`${await category(conf.registerParents)}\`

Ses Kanal Sıralaması
${voiceTop}
**Mesaj**
${messageTop}
`)
message.channel.send(embed)
}
}