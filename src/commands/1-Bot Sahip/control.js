const disbut = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
const { star, kirmiziok } = require("../../configs/emojis.json")
let serverSettings = require("../../models/sunucuayar");
let settings = require("../../configs/settings.json");

const moment = require("moment");
require("moment-duration-format");

module.exports = {
    conf: {
      aliases: ["control"],
      name: "control",
      help: "control"
    },
  
    run: async (client, message, args, durum, kanal) => {
     
       let ayar = await serverSettings.findOne({
        guildID: settings.guildID
    });

        if (message.member.permissions.has(8)) {

      let ekipRolu = "1026104838674714655"

      let etkinlik = "1026104872275288149"
      let cekilis = "1026104871029583942"

    let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(data.tag) && !s.roles.cache.has(ekipRolu))
    let et = message.guild.members.cache.filter(member => !member.roles.cache.has(cekilis) && !member.roles.cache.has(etkinlik)).size;
    let ramalcim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

let ecdagit = new disbut.MessageButton().setStyle('red').setLabel('Etkinlik/Çekiliş Rol Dağıt').setID('ecdagit')
let tagrol = new disbut.MessageButton().setStyle('green').setLabel('Tag Rol Dağıt').setID('tagrol')
let kayıtsızdagit = new disbut.MessageButton().setStyle('blurple').setLabel('Kayıtsız Rol Dağıt').setID('kayıtsızdagit')

let embed = new MessageEmbed()
.setDescription(`
${message.member.toString()}, \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` rolü olmayan üyelerin rol dağıtım tablosu aşağıda belirtilmiştir.
`)

.addFields(
{ name: "__**Etkinlik/Çekiliş Rol**__", value: `
\`\`\`fix
${et} kişi
\`\`\`
`, inline: true },
{ name: "__**Taglı Rol**__", value: `
\`\`\`fix
${taglilar.size} kişi
\`\`\`
`, inline: true },
{ name: "__**Kayıtsız Rol**__", value: `
\`\`\`fix
${ramalcim.size} kişi
\`\`\`
`, inline: true }
)

.setColor("BLACK")
.setFooter(message.author.tag, message.author.avatarURL())
.setTimestamp()
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

message.channel.send(embed, { buttons: [ecdagit,tagrol,kayıtsızdagit] })

}

client.on('clickButton', async (button) => {

    if (button.id === 'ecdagit') {

      let etkinlik = "1026104872275288149"
      let cekilis = "1026104871029583942"

    let ramal = message.guild.members.cache.filter(member => !member.roles.cache.has(etkinlik) && !member.roles.cache.has(cekilis))
    button.reply.send(`
Etkinlik/Çekiliş rolü olmayan ${ramal.size} kullanıcıya etkinlik, çekiliş rolleri verildi !

Etkinlik/Çekiliş rolü verilen kullanıcılar;
${ramal.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")}`)
        message.guild.members.cache.filter(member => !member.roles.cache.has(etkinlik) && !member.roles.cache.has(cekilis)).map(x=> x.roles.add(ayar.cekilis, ayar.etkinlik));
    }


    if (button.id === 'tagrol') {
        let ekipRolu = "1026104838674714655"

      let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.has(ekipRolu))

    button.reply.send(`
Tagı olup rolü olmayan ${taglilar.size} kullanıcıya rol verildi.

Tag Rolü verilen kullanıcılar;
${taglilar.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")}`)

    message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.has(ekipRolu)).map(x=> x.roles.add(ayar.ekipRolu))                
    }

    if (button.id === 'kayıtsızdagit') {
    let ramalcim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

    button.reply.send(`
Kayıtsız rolü olmayan ${ramalcim.size} kullanıcıya kayıtsız rolü verildi !

Kayıtsız Rolü verilen kullanıcılar;
${ramalcim.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")} `)

    message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0).map(x=> x.roles.add(ayar.unregRoles))

    }

  });
}
}