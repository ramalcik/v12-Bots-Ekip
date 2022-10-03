const Discord = require("discord.js");
const { MessageEmbed, Message } = require('discord.js')
const config =require('../../models/sunucuayar')
const settings = require('../../configs/settings.json')

const { max } = require("moment");
module.exports = {
    conf: {
      aliases: ["kur", "setup","config"],
      name: "kur",
    },
    
    run: async (client, message, args, embed, prefix) => {

        if(!settings.owners.includes(message.author.id)) return
        let choose = args[0]

        if(choose === "help") {
            message.channel.send(new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setFooter("Developed By Ramal")
            .setTimestamp() // Ramal ADAMDIR 
            .setDescription(`
\`\`\`Server Bilgileri\`\`\`
Guild Owner \`(.config guildowner @User/ID)\`
Sunucu Tag \`(.config tag <serverTAG>\`
Sunucu Untag \`(.config tag2 <serverTAG>)\`
Rol Verici \`(.config rolverici <serverTAG>\`
Sunucu Urlsi \`(.config link <serverLINK>)\`
\`\`\`Sunucu İçi Kanal Ayarları\`\`\`
Genel Sohbet \`(.config chat #Kanal/ID)\`
Teyit Kanalı \`(.config register #Kanal/ID)\`
İnvite Kanalı \`(.config invite #Kanal/ID)\`
Kurallar \`(.config kurallar #Kanal/ID)\`
Tag Log \`(.config2 taglog #Kanal/ID)\`
Mute Log \`(.config2 mutelog #Kanal/ID)\`
Vmute Log \`(.config2 vmutelog #Kanal/ID)\`
Jail Log \`(.config2 jaillog #Kanal/ID)\`
Warn Log \`(.config2 warnlog #Kanal/ID)\`
Reklam Log \`(.config2 reklamlog #Kanal/ID)\`
Ban Log \`(.config2 banlog #Kanal/ID)\`
Rol Log \`(.config2 rollog #Kanal/ID)\`
\`\`\`Sunucu İçi Rol Ayarları\`\`\`
Vk Yöneticisi Rolü \`(.config vkyönetici @Rol/ID)\`
Kayıtsız Rolleri \`(.config unregister @Rol/ID)\`
Erkek Rolleri \`(.config man @Rol/ID)\`
Kadın Rolleri \`(.config woman @Rol/ID)\`
Taglı Rolü \`(.config team @Rol/ID)\`
Booster Rolü \`(.config booster @Rol/ID)\`
Cezalı Rolü \`(.config jail @Rol/ID)\`
Reklam cezalı Rolü \`(.config reklam @Rol/ID)\`
Şüpheli Hesap Rolü \`(.config supheli @Rol/ID)\`
Yasaklı Tag Rolü \`(.config bantag @Rol/ID)\`
Mute Rolü \`(.config mute @Rol/ID)\`
Vmute Rolü \`(.config vmute @Rol/ID)\`
Vk Cezalı Rolü \`(.config vkcezalı @Rol/ID)\`
Dc Cezalı Rolü \`(.config dccezalı @Rol/ID)\`
\`\`\`Sunucu İçi Hammer Rol Ayarları\`\`\`
Registerian \`(.config registerian @Rol/ID)\`
Mute Hammer \`(.config mutehammer @Rol/ID)\`
Vmute Hammer \`(.config vmutehammer @Rol/ID)\`
Jail Hammer \`(.config jailhammer @Rol/ID)\`
Warn Hammer \`(.config warnhammer @Rol/ID)\`
Ban Hammer \`(.config banhammer @Rol/ID)\`
`)


           .setColor('RANDOM')
            .setThumbnail(message.guild.iconURL({dynamic: true})))
        }
        let pusha = await config.findOne({guildID: message.guild.id})

        if(!choose) {
            let ayar = await config.findOne({guildID: message.guild.id})
            message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Ayarlar`, message.author.avatarURL({dynamic: true}))
            .addField(`
\`\`\`OWNER SETTINGS\`\`\``, `

**guildowner:** (${ayar.guildowner.length > 0 ? `${ayar.guildowner.map(x => `<@${x}>`).join(",")}` : "\`YOK\`"})
**rolverici:** (${ayar.rolverici.length > 0 ? `${ayar.rolverici.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**sahipRolu:** (${ayar.sahipRolu.length > 0 ? `${ayar.sahipRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})

**ceo:** (${ayar.ceo.length > 0 ? `${ayar.ceo.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})

`)

.addField(`
\`\`\`KORUMA SETTINGS\`\`\``, `


**ceo:** (${ayar.ceo.length > 0 ? `${ayar.ceo.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**owner:** (${ayar.owner.length > 0 ? `${ayar.owner.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**yıldız** (${ayar.yıldız.length > 0 ? `${ayar.yıldız.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)

           .addField(`
\`\`\`FAMİLY SETTINGS\`\`\``, `

**tag:** (${ayar.tag ? ayar.tag : "\`YOK\`"}) 
**ikinciTag:** (${ayar.ikinciTag ? ayar.ikinciTag : "\`YOK\`"})
**ekipRolu:** (${ayar.ekipRolu.length > 0 ? `${ayar.ekipRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)
.addField(`
\`\`\`YETKİLİ SETTINGS\`\`\``, `

**staffs:** (${ayar.staffs.length > 0 ? `${ayar.staffs.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**teyitciRolleri:** (${ayar.teyitciRolleri.length > 0 ? `${ayar.teyitciRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**warnHammer:** (${ayar.warnHammer.length > 0 ? `${ayar.warnHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**banHammer:** (${ayar.banHammer.length > 0 ? `${ayar.banHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**jailHammer:** (${ayar.jailHammer.length > 0 ? `${ayar.jailHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**VipHammer:** (${ayar.VipHammer.length > 0 ? `${ayar.VipHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**cmuteHammer:** (${ayar.cmuteHammer.length > 0 ? `${ayar.cmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**vmuteHammer:** (${ayar.vmuteHammer.length > 0 ? `${ayar.vmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)
.addField(`
\`\`\`SUNUCU SETTINGS\`\`\``, `

**erkekRolleri:** (${ayar.erkekRolleri.length > 0 ? `${ayar.erkekRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**kizRolleri:** (${ayar.kizRolleri.length > 0 ? `${ayar.kizRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**vipRole:** (${ayar.vipRole.length > 0 ? `${ayar.vipRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**boosterRolu:** (${ayar.boosterRolu.length > 0 ? `${ayar.boosterRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**unregRoles:** (${ayar.unregRoles.length > 0 ? `${ayar.unregRoles.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})

**çekilis:** (${ayar.çekilis.length > 0 ? `${ayar.çekilis.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**etkinlik:** (${ayar.etkinlik.length > 0 ? `${ayar.etkinlik.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**film:** (${ayar.film.length > 0 ? `${ayar.film.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})

`)

.addField(`
\`\`\`CEZA SETTINGS\`\`\``, `

**jailRole:** (${ayar.jailRole.length > 0 ? `${ayar.jailRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**VkCezalı:** (${ayar.VkCezalı.length > 0 ? `${ayar.VkCezalı.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**DcCezalı:** (${ayar.DcCezalı.length > 0 ? `${ayar.DcCezalı.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**chatMute:** (${ayar.chatMute.length > 0 ? `${ayar.chatMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**voiceMute:** (${ayar.voiceMute.length > 0 ? `${ayar.voiceMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**fakeAccRole:** (${ayar.fakeAccRole.length > 0 ? `${ayar.fakeAccRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**reklamRole:** (${ayar.reklamRole.length > 0 ? `${ayar.reklamRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**yasaklıtagRole:** (${ayar.yasaklıtagRole.length > 0 ? `${ayar.yasaklıtagRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)

.addField(`
\`\`\`TOPLANTİ SETTINGS\`\`\``, `

**uyariRole:** (${ayar.uyariRole.length > 0 ? `${ayar.uyariRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**katildiRole:** (${ayar.katildiRole.length > 0 ? `${ayar.katildiRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**mazaretliRole:** (${ayar.mazaretliRole.length > 0 ? `${ayar.mazaretliRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**enAltYetkiliRole:** (${ayar.enAltYetkiliRole.length > 0 ? `${ayar.enAltYetkiliRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)

           .setColor('RANDOM')
            .setThumbnail(message.guild.iconURL({dynamic: true})))
        }

        let ramal = await config.findOne({guildID: message.guild.id})

        if (["guildowner"].some(x => x === choose)) {
            let rol;
            if (message.mentions.users.size >= 1) {
                rol = message.mentions.users.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucunun ownerlarını belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.users.cache.get(id)).filter(r => r != undefined);
            }
            ramal.guildowner = rol, ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucunun ownerları başarıyla ${rol.map(x => `<@${x}>`)} olarak ayarlandı`, message.author, message.channel))
        };

        if(["rolverici"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu rolverici komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.rolverici = rol, await ramal.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu rolverici komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["sahiprolu"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu SahipRolü rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.sahipRolu = rol, await ramal.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu SahipRolü rolünü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }


        if (["tag"].some(x => x === choose)) {
            let select = args[1];
            if (!select) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucunun tagını belirtmelisin`, message.author, message.channel))
            ramal.tag = select, ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu tagı başarıyla ${select} olarak ayarlandı`, message.author, message.channel))
        };

        if (["ikinciTag","tag2"].some(x => x === choose)) {
            let select = args[1];
            if (!select) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucunun ikinci tagını belirtmelisin`, message.author, message.channel))
            ramal.ikinciTag = select, ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu ikinci tagı başarıyla ${select} olarak ayarlandı`, message.author, message.channel))
        };

        if(["ekiprolu","team"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu ekip rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.ekipRolu = rol, await ramal.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu ekipRolu başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }
    
        if(["staffs"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu staffs komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.staffs = rol, await ramal.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu teyitciRolleri komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }
        
        if(["teyitciRolleri","registerian"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu staffs komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.teyitciRolleri = rol, await ramal.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu teyitciRolleri komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["warnhammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu warnHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.warnHammer = rol, await ramal.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu warnHammer komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["banhammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu banHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.banHammer = rol, await ramal.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu banHammer komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["jailhammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.jailHammer = rol, await ramal.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailHammer komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["viphammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu VipHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.VipHammer = rol, await ramal.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu VipHammer komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["cmutehammer","mutehammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu cmuteHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.cmuteHammer = rol, await ramal.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu cmuteHammer komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

        if(["vmutehammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vmuteHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.vmuteHammer = rol, await ramal.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vmuteHammer komut yetkilisi başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }

    if(["erkekRolleri","man"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu erkek rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
    ramal.erkekRolleri = rol, await ramal.save() 
    message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu erkek rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["kizRolleri","woman"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu kadın rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
    ramal.kizRolleri = rol, await ramal.save() 
    message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu kadın rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["vipRole","vip"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vipRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.vipRole = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vipRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["boosterRolu","booster"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu Booster rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.boosterRolu = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu Booster rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["unregRoles","unregister"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu kayıtsız rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.unregRoles = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu kayıtsız rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["çekilis","cekilis"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu çekilis rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.çekilis = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu çekilis rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}


if(["etkinlik"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu etkinlik rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.etkinlik = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu etkinlik rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["film"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu film rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.film = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu film rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["jailRole","jail"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.jailRole = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["VkCezalı"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu VkCezalı rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.VkCezalı = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu VkCezalı rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["DcCezalı"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu DcCezalı rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.DcCezalı = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu DcCezalı rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["chatMute","mute"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu chatMute rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.chatMute = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu chatMute rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["voiceMute","vmute"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu voiceMute rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.voiceMute = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu voiceMute rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["fakeAccRole","supheli"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu fakeAccRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.fakeAccRole = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu fakeAccRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["reklamRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu reklamRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.reklamRole = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu reklamRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["yasaklıtagRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu yasaklıtagRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.yasaklıtagRole = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu yasaklıtagRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["uyariRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu uyariRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.uyariRole = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu uyariRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["katildiRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu katildiRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.katildiRole = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu katildiRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["mazaretliRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu mazaretliRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.mazaretliRole = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu mazaretliRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["enAltYetkiliRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu enAltYetkiliRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.enAltYetkiliRole = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu enAltYetkiliRole rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}



      
    }
}

