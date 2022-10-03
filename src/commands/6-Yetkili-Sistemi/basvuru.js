const { MessageEmbed, Discord } = require('discord.js');
const ramalayar = require("../../configs/sunucuayar.json");
const { red, green, star } = require("../../configs/emojis.json");

module.exports = {
    conf : {
        aliases : ["başvuru","basvuru"],
        name: "başvuru",
        help : "başvuru"
        },

    run: async(client, message, args) => {


if(![ramalayar.TagRoleID].some(role => message.member.roles.cache.get(role))) return message.react(red)
if([ramalayar.EnAltYetkiliRoleID].some(role2 => message.member.roles.cache.get(role2))) return message.react(red) 

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if(message.channel.id === ramalayar.BasvuruKomutKullanımKanalı){
	var channel = message.guild.channels.cache.find((channel) => channel.name === `${message.member.displayName}-başvuru`);
	
	var LogChannel = message.guild.channels.cache.find((channel) => channel.id === ramalayar.BaşvuruLogChannelID);
	if(channel){
		return message.channel.send(`Zaten başvuru kanalınız açık! <#${channel.id}>`).then(msg => msg.delete({timeout: 6000}));
		} else {
        let category = message.guild.channels.cache.get(ramalayar.BaşvuruKategoryID);
        message.guild.channels.create(`${message.member.displayName}-başvuru`, {
            parent: category,
            permissionOverwrites: [
                {id: ramalayar.EveryoneRoleID, deny: ['VIEW_CHANNEL']},
                {id: message.author.id, allow: [('VIEW_CHANNEL'), ('SEND_MESSAGES')]}]
            }).then(channel => {


				const filter = m => m.author === message.author;
				var cevaplar = [];
				message.react(green)


       channel.send(`${message.author} **İsminiz ve yaşınız**`);
				channel.awaitMessages(filter, { max: 1 })
				  .then(function (collected) {
					  collected.each(msj => cevaplar.push(msj.content));

				channel.send(`${message.author} **Sunucumuzda günlük aktifliğiniz ?**`);
			    channel.awaitMessages(filter, { max: 1 })
					.then(function (collected) {
					collected.each(msj => cevaplar.push(msj.content));

				channel.send(`${message.author} **Sunucumuz için neler yapabilirsiniz**`);
				channel.awaitMessages(filter, { max: 1 })
					.then(function (collected) {
					collected.each(msj => cevaplar.push(msj.content));

				channel.send(`${message.author} **Kendiniz hakkında biraz bilgi ?**`);
				channel.awaitMessages(filter, { max: 1 })
					.then(function (collected) {
					collected.each(msj => cevaplar.push(msj.content));

 
				channel.send("Başvurunuz başarıyla alındı, yetkili arkadaşlar sizinle ilgilenecekler, başvuru için teşekkür ederiz. Kanal birazdan silinecek...")
 
    let ramal = new MessageEmbed()
.setDescription(`
**${message.author.tag}** - (\`${message.author.id}\`) **Kullanıcısının Başvuru Formu**  
  ${star} **İsminiz ve yaşınız**
  \`${cevaplar[0]}\`
  ${star} **Sunucumuzda günlük aktifliğiniz**
  \`${cevaplar[1]}\`
  ${star} **Sunucumuz için neler yapabilirsiniz**
  \`${cevaplar[2]}\`
  ${star} **Kendiniz hakkında biraz bilgi**
  \`${cevaplar[3]}\`
${message.author} Kullanıcısı'nın Başvurusu
${star} **Cevaplamak için :** \`.cevapla <id>\`
`);
 
LogChannel.send(`<@&${ramalayar.YetkiliAlımRoleID}> ${message.author}`, {embed: ramal})

									setTimeout(function() {
										channel.delete()
									}, 3000);
							  })
							  })
							  })
							  })

setTimeout(() => {
    if(!message.guild.channels.cache.get(channel.id)) return;
    channel.delete({ reason: "Yetkili Başvuru Talep Süresi Sona Erdi." })
}, 60000)

							  }).catch(console.error);
		}
	}

}
}