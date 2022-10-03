const moment = require("moment");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');
const {  green , red } = require("../../configs/emojis.json");
const serverSettings =require('../../models/sunucuayar')

module.exports = {
  conf: {
    aliases: ["perm","perm"],
    name: "perm",
    help: "perm"
  },

  run: async (client, message, args, embed) => {

    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });


    if (!message.member.hasPermission('ADMINISTRATOR') && !conf.rolhammer.some(x => message.member.roles.cache.has(x)))
    {
message.lineReply("Bu işlemi yapamazsın dostum!").then(x=>x.delete({timeout: 5000}))
message.react(red)
return;
}
 
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
     
let Vip = new MessageButton().setLabel("1").setID("Vip").setStyle("gray")
let Yazılımcı = new MessageButton().setLabel("2").setID("Yazılımcı").setStyle("gray")
let Tasarımcı = new MessageButton().setLabel("3").setID("Tasarımcıza").setStyle("gray")
let Müzisyen = new MessageButton().setLabel("4").setID("Müzisyen").setStyle("gray")
let iptal = new MessageButton().setLabel("X").setID("iptal").setStyle("red")
      

const row = new MessageActionRow()
.addComponents(Vip, Yazılımcı, Tasarımcı, Müzisyen, iptal)

embed.setDescription(`Merhabalar ${message.author} aşağıdan hangi rolu vermek istediğiniz ${member} adlı kullanıcı için bir rol seçiniz.
\`\`\`diff
-  1. Vip 
-  2. Yazılımcı
-  3. Tasarımcı
-  4. Müzisyen
-  X. İptal
\`\`\`
Bu rol seçeneklerinden birini başlarındaki numara bulunan butonu tıklayarak seçebilirsiniz. Seçmek için toplam 1 dakika süreniz mevcuttur.
`)


    let msg = await message.channel.send({ components : [row], embed: embed})
    var filter = (button) => button.clicker.user.id === message.author.id; 
    let collector = await msg.createButtonCollector(filter, { time: 99999999 })
    collector.on("collect", async (button) => {
      
  if(button.id === "Vip") {
    await button.reply.defer()

    message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`Vip\` Rolu verildi`).then(x=>x.delete({timeout:50000}))

    member.roles.add(conf.vipRole);
    }

    if(button.id === "Yazılımcı") {
        await button.reply.defer()
    
        message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`Yazılımcı\` Rolu verildi`).then(x=>x.delete({timeout:50000}))
    
        member.roles.add(conf.yazılımcı);
        }

        if(button.id === "Tasarımcı") {
            await button.reply.defer()
        
            message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`Tasarımcı\` Rolu verildi`).then(x=>x.delete({timeout:50000}))
        
            member.roles.add(conf.tasarımcı);
            }

            if(button.id === "Müzisyen") {
                await button.reply.defer()
            
                message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`Müzisyen\` Rolu verildi`).then(x=>x.delete({timeout:50000}))
            
                member.roles.add(conf.müzisyen);
                }



  if(button.id === "iptal") {
    await button.reply.defer()
    msg.delete();
    } 

  })
  }
};