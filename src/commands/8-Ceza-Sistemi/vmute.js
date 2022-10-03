const { MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');
const Discord = require("discord.js");


const vmuteLimit = new Map();

const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")

const coin = require("../../schemas/coin");
const ceza = require("../../schemas/ceza");
const cezapuan = require("../../schemas/cezapuan")


const settings = require("../../configs/settings.json")
const serverSettings =require('../../models/sunucuayar')
const { red, green, Mute, revusome, kirmiziok } = require("../../configs/emojis.json")




module.exports = {
  conf: {
    aliases: ["vmute","vmute"],
    name: "vmute",
    help: "vmute"
  },

  run: async (client,message, args, embed) => {

    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

  if (!message.member.hasPermission(8) && !conf.vmuteHammer.some(x => message.member.roles.cache.has(x))) 
  {
  message.react(red)
  message.channel.send("Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000})) 
  return } 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!member) { message.channel.send("Bir üye belirtmelisin!") 
message.react(red)
return }
if (conf.voiceMute.some(x => member.roles.cache.has(x))) 
{ message.channel.send("Bu üye zaten susturulmuş!").then(x=>x.delete({timeout:5000}))
message.react(red)
return }
if (message.member.roles.highest.position <= member.roles.highest.position) 
  {
message.react(red)
message.channel.send("Kendinle aynı yetkide ya da daha yetkili olan birini susturamazsın!").then(x=>x.delete({timeout:5000})) 
return
}
if (!member.manageable) 
{
message.react(red)
message.channel.send("Bu üyeyi susturamıyorum!").then(x=>x.delete({timeout:5000})) 
return
}
if (settings.voicemutelimit > 0 && vmuteLimit.has(message.author.id) && vmuteLimit.get(message.author.id) == settings.voicemutelimit) 
{
message.react(red)
message.channel.send("Saatlik susturma sınırına ulaştın!").then(x=>x.delete({timeout:5000})) 
return
}
     
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -10 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send(`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`);


let cmute1 = new MessageButton().setLabel("1").setID("cmute1").setStyle("gray")
let cmute2 = new MessageButton().setLabel("2").setID("cmute2").setStyle("gray")
let cmute3 = new MessageButton().setLabel("3").setID("cmute3").setStyle("gray")
let cmute4 = new MessageButton().setLabel("4").setID("cmute4").setStyle("gray")
let cmute5 = new MessageButton().setLabel("5").setID("cmute5").setStyle("gray")

let cmute6 = new MessageButton().setLabel("6").setID("cmute6").setStyle("gray")
let cmute7 = new MessageButton().setLabel("7").setID("cmute7").setStyle("gray")
let cmute8 = new MessageButton().setLabel("8").setID("cmute8").setStyle("gray")
let cmute9 = new MessageButton().setLabel("9").setID("cmute9").setStyle("gray")
let iptal = new MessageButton().setLabel("X").setID("iptal").setStyle("red")

const row = new MessageActionRow()
.addComponents(cmute1, cmute2, cmute3, cmute4, cmute5)

const row2 = new MessageActionRow()
.addComponents(cmute6, cmute7, cmute8, cmute9, iptal)

embed.setDescription(`Merhabalar ${message.author} aşağıdan cezalandırmak istediğiniz ${member} adlı kullanıcı için bir cezalandırma şekli seçiniz.
\`\`\`
1 Ailevi Küfür - 20 dakika
2 Küfür - 10 dakika
3 Troll / Düzen Bozmak - 10 dakika
4 Tartışma / Kavga - 15 dakika
5 Ortam Bozma / Rahatsızlık Verme - 10 dakika 
6 Sunucuyu Kötülemek - 30 dakika 
7 Manevi Değerlere Küfür / Hakaret - 50 dakika
8 Kadın Üyelere Sarkmak - 20 dakika
9 Siyaset - 20 dakika

\`\`\`
Bu cezalandırma seçeneklerinden birini başlarındaki numara bulunan butonu tıklayarak seçebilirsiniz. Seçmek için toplam 1 dakika süreniz mevcuttur.
`)


    

    let msg = await message.channel.send({ components : [row,row2], embed: embed})
    var filter = (button) => button.clicker.user.id === message.author.id; 
    let collector = await msg.createButtonCollector(filter, { time: 99999999 })
    collector.on("collect", async (button) => {
      
  if(button.id === "cmute1") {

    member.roles.add(conf.voiceMute);
    if (member.voice.channelID && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    
    const reason = `Ailevi Küfür`

    const time = 1000 * 60 * 20;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");
   
    await button.reply.defer()

    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
    message.react(green)
    message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))
    if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});

    const log = embed
      .setColor("#2f3136")
      .setDescription(`
${member.toString()} Adlı Kişiye Ses Mutesi Atıldı

${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Süresi: \`20 Dakkika\`
${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
${kirmiziok} Ceza Sebebi: \`${reason}\`


      `)
      .setFooter(`${moment(Date.now()).format("LLL")}`)
      client.channels.cache.get(client.channels.cache.find(x => x.name == "ses-mute-log").id).wsend(embed)
  
      if (settings.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }

    }
  



    if(button.id === "cmute2") {
      member.roles.add(conf.voiceMute);
      if (member.voice.channelID && !member.voice.serverMute) {
        member.voice.setMute(true);
        member.roles.add(conf.voiceMute);
      }
      
      const reason = `Küfür`
  
      const time = 1000 * 60 * 10;
      const cıkaralım = time + Date.parse(new Date());
      const şuanki = moment(Date.parse(new Date())).format("LLL");
      const sonraki = moment(cıkaralım).format("LLL");
     
      await button.reply.defer()
  
      const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
      message.react(green)
      message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))
      if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});
  
      const log = embed
        .setColor("#2f3136")
        .setDescription(`
  ${member.toString()} Adlı Kişiye Ses Mutesi Atıldı
  
  ${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
  ${revusome} Ceza Süresi: \`10 Dakkika\`
  ${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
  ${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
  ${kirmiziok} Ceza Sebebi: \`${reason}\`
  
  
        `)
        .setFooter(`${moment(Date.now()).format("LLL")}`)
        client.channels.cache.get(client.channels.cache.find(x => x.name == "ses-mute-log").id).wsend(embed)
    
        if (settings.voicemutelimit > 0) {
          if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
          else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
          setTimeout(() => {
            if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
          }, 1000 * 60 * 60);
  
      }
    }


        if(button.id === "cmute3") {
          member.roles.add(conf.voiceMute);
          if (member.voice.channelID && !member.voice.serverMute) {
            member.voice.setMute(true);
            member.roles.add(conf.voiceMute);
          }
          
          const reason = `Troll / Düzen Bozmak`
      
          const time = 1000 * 60 * 10;
          const cıkaralım = time + Date.parse(new Date());
          const şuanki = moment(Date.parse(new Date())).format("LLL");
          const sonraki = moment(cıkaralım).format("LLL");
         
          await button.reply.defer()
      
          const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
          message.react(green)
          message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))
          if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});
      
          const log = embed
            .setColor("#2f3136")
            .setDescription(`
      ${member.toString()} Adlı Kişiye Ses Mutesi Atıldı
      
      ${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
      ${revusome} Ceza Süresi: \`10 Dakkika\`
      ${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
      ${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
      ${kirmiziok} Ceza Sebebi: \`${reason}\`
      
      
            `)
            .setFooter(`${moment(Date.now()).format("LLL")}`)
            client.channels.cache.get(client.channels.cache.find(x => x.name == "ses-mute-log").id).wsend(embed)
        
            if (settings.voicemutelimit > 0) {
              if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
              else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
              setTimeout(() => {
                if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
              }, 1000 * 60 * 60);
      
          }
        }
            
            

          if(button.id === "cmute4") {
            member.roles.add(conf.voiceMute);
            if (member.voice.channelID && !member.voice.serverMute) {
              member.voice.setMute(true);
              member.roles.add(conf.voiceMute);
            }
            
            const reason = `Tartışma / Kavga`
        
            const time = 1000 * 60 * 15;
            const cıkaralım = time + Date.parse(new Date());
            const şuanki = moment(Date.parse(new Date())).format("LLL");
            const sonraki = moment(cıkaralım).format("LLL");
           
            await button.reply.defer()
        
            const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
            message.react(green)
            message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))
            if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});
        
            const log = embed
              .setColor("#2f3136")
              .setDescription(`
        ${member.toString()} Adlı Kişiye Ses Mutesi Atıldı
        
        ${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
        ${revusome} Ceza Süresi: \`15 Dakkika\`
        ${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
        ${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
        ${kirmiziok} Ceza Sebebi: \`${reason}\`
        
        
              `)
              .setFooter(`${moment(Date.now()).format("LLL")}`)
              client.channels.cache.get(client.channels.cache.find(x => x.name == "ses-mute-log").id).wsend(embed)
          
              if (settings.voicemutelimit > 0) {
                if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
                else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
                setTimeout(() => {
                  if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
                }, 1000 * 60 * 60);
        
            }
          }
    

            if(button.id === "cmute5") {
              member.roles.add(conf.voiceMute);
              if (member.voice.channelID && !member.voice.serverMute) {
                member.voice.setMute(true);
                member.roles.add(conf.voiceMute);
              }
              
              const reason = `Ortam Bozma / Rahatsızlık Verme`
          
              const time = 1000 * 60 * 10;
              const cıkaralım = time + Date.parse(new Date());
              const şuanki = moment(Date.parse(new Date())).format("LLL");
              const sonraki = moment(cıkaralım).format("LLL");
             
              await button.reply.defer()
          
              const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
              message.react(green)
              message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))
              if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});
          
              const log = embed
                .setColor("#2f3136")
                .setDescription(`
          ${member.toString()} Adlı Kişiye Ses Mutesi Atıldı
          
          ${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
          ${revusome} Ceza Süresi: \`10 Dakkika\`
          ${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
          ${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
          ${kirmiziok} Ceza Sebebi: \`${reason}\`
          
          
                `)
                .setFooter(`${moment(Date.now()).format("LLL")}`)
                client.channels.cache.get(client.channels.cache.find(x => x.name == "ses-mute-log").id).wsend(embed)
            
                if (settings.voicemutelimit > 0) {
                  if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
                  else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
                  setTimeout(() => {
                    if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
                  }, 1000 * 60 * 60);
          
              }
            }

              if(button.id === "cmute6") {
                member.roles.add(conf.voiceMute);
                if (member.voice.channelID && !member.voice.serverMute) {
                  member.voice.setMute(true);
                  member.roles.add(conf.voiceMute);
                }
                
                const reason = `Sunucuyu Kötülemek`
            
                const time = 1000 * 60 * 30;
                const cıkaralım = time + Date.parse(new Date());
                const şuanki = moment(Date.parse(new Date())).format("LLL");
                const sonraki = moment(cıkaralım).format("LLL");
               
                await button.reply.defer()
            
                const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
                message.react(green)
                message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))
                if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});
            
                const log = embed
                  .setColor("#2f3136")
                  .setDescription(`
            ${member.toString()} Adlı Kişiye Ses Mutesi Atıldı
            
            ${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
            ${revusome} Ceza Süresi: \`30 Dakkika\`
            ${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
            ${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
            ${kirmiziok} Ceza Sebebi: \`${reason}\`
            
            
                  `)
                  .setFooter(`${moment(Date.now()).format("LLL")}`)
                  client.channels.cache.get(client.channels.cache.find(x => x.name == "ses-mute-log").id).wsend(embed)
              
                  if (settings.voicemutelimit > 0) {
                    if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
                    else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
                    setTimeout(() => {
                      if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
                    }, 1000 * 60 * 60);
                }
              }


                if(button.id === "cmute7") {
                  member.roles.add(conf.voiceMute);
                  if (member.voice.channelID && !member.voice.serverMute) {
                    member.voice.setMute(true);
                    member.roles.add(conf.voiceMute);
                  }
                  
                  const reason = `Manevi Değerlere Küfür / Hakaret`
              
                  const time = 1000 * 60 * 50;
                  const cıkaralım = time + Date.parse(new Date());
                  const şuanki = moment(Date.parse(new Date())).format("LLL");
                  const sonraki = moment(cıkaralım).format("LLL");
                 
                  await button.reply.defer()
              
                  const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
                  message.react(green)
                  message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))
                  if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});
              
                  const log = embed
                    .setColor("#2f3136")
                    .setDescription(`
              ${member.toString()} Adlı Kişiye Ses Mutesi Atıldı
              
              ${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
              ${revusome} Ceza Süresi: \`50 Dakkika\`
              ${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
              ${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
              ${kirmiziok} Ceza Sebebi: \`${reason}\`
              
              
                    `)
                    .setFooter(`${moment(Date.now()).format("LLL")}`)
                    client.channels.cache.get(client.channels.cache.find(x => x.name == "ses-mute-log").id).wsend(embed)
                
                    if (settings.voicemutelimit > 0) {
                      if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
                      else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
                      setTimeout(() => {
                        if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
                      }, 1000 * 60 * 60);
                  }
                }
  
                  if(button.id === "cmute8") {
                    member.roles.add(conf.voiceMute);
                    if (member.voice.channelID && !member.voice.serverMute) {
                      member.voice.setMute(true);
                      member.roles.add(conf.voiceMute);
                    }
                    
                    const reason = `Kadın Üyelere Sarkmak`
                
                    const time = 1000 * 60 * 20;
                    const cıkaralım = time + Date.parse(new Date());
                    const şuanki = moment(Date.parse(new Date())).format("LLL");
                    const sonraki = moment(cıkaralım).format("LLL");
                   
                    await button.reply.defer()
                
                    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
                    message.react(green)
                    message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))
                    if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});
                
                    const log = embed
                      .setColor("#2f3136")
                      .setDescription(`
                ${member.toString()} Adlı Kişiye Ses Mutesi Atıldı
                
                ${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
                ${revusome} Ceza Süresi: \`20 Dakkika\`
                ${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
                ${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
                ${kirmiziok} Ceza Sebebi: \`${reason}\`
                
                
                      `)
                      .setFooter(`${moment(Date.now()).format("LLL")}`)
                      client.channels.cache.get(client.channels.cache.find(x => x.name == "ses-mute-log").id).wsend(embed)
                  
                      if (settings.voicemutelimit > 0) {
                        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
                        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
                        setTimeout(() => {
                          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
                        }, 1000 * 60 * 60);
                
                    }
                  }

                    if(button.id === "cmute9") {
                      member.roles.add(conf.voiceMute);
                      if (member.voice.channelID && !member.voice.serverMute) {
                        member.voice.setMute(true);
                        member.roles.add(conf.voiceMute);
                      }
                      
                      const reason = `Siyaset`
                  
                      const time = 1000 * 60 * 20;
                      const cıkaralım = time + Date.parse(new Date());
                      const şuanki = moment(Date.parse(new Date())).format("LLL");
                      const sonraki = moment(cıkaralım).format("LLL");
                     
                      await button.reply.defer()
                  
                      const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
                      message.react(green)
                      message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))
                      if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});
                  
                      const log = embed
                        .setColor("#2f3136")
                        .setDescription(`
                  ${member.toString()} Adlı Kişiye Ses Mutesi Atıldı
                  
                  ${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
                  ${revusome} Ceza Süresi: \`20 Dakkika\`
                  ${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
                  ${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
                  ${kirmiziok} Ceza Sebebi: \`${reason}\`
                  
                  
                        `)
                        .setFooter(`${moment(Date.now()).format("LLL")}`)
                        client.channels.cache.get(client.channels.cache.find(x => x.name == "ses-mute-log").id).wsend(embed)
                    
                        if (settings.voicemutelimit > 0) {
                          if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
                          else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
                          setTimeout(() => {
                            if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
                          }, 1000 * 60 * 60);
                  
                      }
                    }

  if(button.id === "iptal") {
    await button.reply.defer()
    msg.delete();
  }


 })


}
};
