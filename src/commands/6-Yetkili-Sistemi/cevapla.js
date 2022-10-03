const { MessageActionRow, MessageButton } = require('discord-buttons');
const { MessageEmbed, Discord } = require('discord.js');
const ramalayar = require("../../configs/sunucuayar.json");
const { çizgi, green, red, star } = require("../../configs/emojis.json");

module.exports = {
    conf : {
        aliases : ["cevağşa"],
        name: "cevapla",
        help : "cevapla"
        },

  run: async(client, message, args) => {   
    if (!message.member.roles.cache.has((ramalayar.YetkiliAlımRoleID)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanabilmek için Yetkili Almı Yetkisine Sahip Olman Gerek');
  let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription('**Bir üye etiketlemen gerekiyor**').setColor("Black"));
  let member = message.guild.member(kullanıcı)

	var LogChannel = message.guild.channels.cache.find((channel) => channel.id === ramalayar.BaşvuruLogChannelID);

   var onaylaa = new MessageButton()
      .setID("onay")
      .setLabel("Onayla")
      .setStyle("green")
      .setEmoji("920412144716103801")

      var reddett = new MessageButton()
      .setID("red")
      .setLabel("Reddet")
      .setStyle("red")
      .setEmoji("920412153712889877")

      var onaylaa2= new MessageButton()
      .setID("onay")
      .setLabel("Onayla")
      .setStyle("green")
      .setEmoji("920412144716103801")
      .setDisabled(true);

      var reddett2= new MessageButton()
      .setID("red")
      .setLabel("Reddet")
      .setStyle("red")
      .setEmoji("920412153712889877")
      .setDisabled(true);

      const row = new MessageActionRow()
      .addComponent(onaylaa)
      .addComponent(reddett)

      const row2= new MessageActionRow()
      .addComponent(onaylaa2)
      .addComponent(reddett2)

    let ramal = new MessageEmbed()
.setDescription(`${kullanıcı} üyesinin yetkili başvurusunu belirtmek için butonları kullanınız.`)
.setFooter(`Lütfen 30 saniye alttaki butonlara basarak kullanıcının başvuru durumunu belirleyin.`)
.setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }))
.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
 
let msg = await message.channel.send({ components : [ row ], embed: ramal})

    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 30000 })

      collector.on("collect", async (button) => {

if(button.id == "onay") {

await button.reply.defer()

const embeds = new MessageEmbed()
.setDescription(`${kullanıcı} üyesine başarıyla yetki aldırıldı!`)
.setTimestamp()

   kullanıcı.roles.add(ramalayar.VerilecekYetkiliRolleriID)

   client.channels.cache.get(ramalayar.BaşvuruDurumLog).send(`
  ${kullanıcı}, Tebrikler! Başvurunuz **kabul edildi** ve **yetkili ekibimize** onaylandınız. ${green}
  ${star} **Sizi onaylayan kişi :** ${button.clicker.member}
  **Önemli:** ||\`[ DM Kutunuzu açınız, size özelden ek olarak ulaşılacaktır. ]\`||
  ${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}
`) 
    kullanıcı.send(`Yetkili Başvurun Başarıyla **Onaylanmıştır**! ${green} Desteklerin için \`teşekkürler!\` ${green}`);

msg.edit({
embed: embeds,
components : row2
})

}

if(button.id == "red") {

await button.reply.defer()

const embedss = new MessageEmbed() 
.setDescription(`${kullanıcı} Adlı Üyenin Yetkili Başvurusu \`reddedildi!\``)
.setTimestamp()

 client.channels.cache.get(ramalayar.BaşvuruDurumLog).send(`
  ${kullanıcı}, Maalesef ! Başvurunuz **kabul edilmedi** ve **yetkili ekibimize** onaylanmadınız. ${red}
  ${star} **Sizi onaylamayan kişi :** ${button.clicker.member} 
  **Önemli:** ||\`[ DM Kutunuzu açınız, size özelden ek olarak ulaşılacaktır. ]\`||
  ${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}
`) 
    kullanıcı.send(`Maalesef Yetkili Başvurun \`Reddedilmiştir!\` ${red}`);

msg.edit({
embed: embedss,
components : row2
})
    }
 });


}
}