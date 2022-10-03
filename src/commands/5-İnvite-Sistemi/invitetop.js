const db = require("../../schemas/inviter");
const conf = require("../../configs/sunucuayar.json")
module.exports = {
  conf: {
    aliases: ["davettop"],
    name: "topdavet",
    help: "topdavet"
  },

  run: async (client, message, args, embed) => {
    let data = await db.find({ guildID: message.guild.id }).sort({ total: -1 });
    if (!data.length)return message.channel.send(embed.setDescription("Herhangi bir invite verisi bulunamadı!"));
    let arr = [];
    data.forEach((x) => arr.push({ id: x.userID, total: x.total }));
    let index = arr.findIndex((x) => x.id == message.author.id) + 1;

    let list = data
      .filter((x) => message.guild.members.cache.has(x.userID))
      .splice(0, 15)
      .map((x, index) => `${x.userID === message.author.id ? `**${index + 1}. <@${x.userID}>:  \`
      ${x.regular} regular\`**` : `**${index + 1}.** <@${x.userID}>:  \`${x.regular} regular\``}`)
      .join("\n");

    const veri = await db.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (index < 10) {
    embed.setFooter("Developed By Ramal")
    embed.setTimestamp()
      embed.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
      embed.setDescription(list);
      message.channel.send(embed);
    } else {
        embed.setFooter("Developed By Ramal")
        embed.setTimestamp()
        embed.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
      embed.setDescription( `${list}`);
      message.channel.send(embed);
    }
  }
};