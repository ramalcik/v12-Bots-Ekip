const Discord = require("discord.js");
const settings = require("../../configs/settings.json");
const serverSettings = require('../../models/sunucuayar')

module.exports = {
  conf: {
    aliases: [],
    name: "rolsuz",
    owner: true,
  },

  run: async (client, message, args, embed) => {
   
    let conf = await serverSettings.findOne({
      guildID: settings.guildID
  });

    let ramalcim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
    if(args[0] == "ver") {
      ramalcim.forEach(r => {
    r.roles.add(conf.unregRoles)
    })
    message.channel.send(embed
    .setDescription("Sunucuda rolü olmayan \`"+ ramalcim.size +"\` kişiye kayıtsız rolü verildi!"))
    } else if(!args[0]) {
    message.channel.send(embed
    .setDescription("Sunucumuzda rolü olmayan \`"+ ramalcim.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` komutunu uygulayın!"))    
}
  },
};
 