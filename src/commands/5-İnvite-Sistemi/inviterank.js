const { MessageEmbed } = require("discord.js");
const inviterSchema = require("../../schemas/inviter");
const inviteMemberSchema = require("../../schemas/inviteMember");
module.exports = {
  conf: {
    aliases: ["rank"],
    name: "davet",
    help: "davet"
  },

  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;
    const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
    let ado = new MessageEmbed() .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true})).setFooter("Developed By Ramal")
      
      .setDescription(`
Toplam **${total}** davete sahip. \`(${regular} gerçek, ${bonus} bonus, ${fake} fake, ${leave} ayrılan)\``);
    message.channel.send(ado)
  },

}