const { Client, Collection, Discord } = require("discord.js");
require("discord-reply")
const client = (global.client = new Client({ fetchAllMembers: true }));
require('discord-buttons')(client)
const settings = require("./src/configs/settings.json");
const conf = require("./src/configs/sunucuayar.json");

const { Mute2, Unmute} = require("./src/configs/emojis.json");
const fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

const map = new Map();
const lımıt = 4;
const TIME = 180000;
const DIFF = 2000;

//RANK KISMI//

client.ranks = [ 

  { role: "989197700408963072", coin: 12000 },
  { role: "989197742003867680", coin: 12000 },
  { role: "945760985707339843", coin: 12000 },

  { role: "945760985719914591", coin: 14000 },
  { role: "945760985719914592", coin: 18000 },
  { role: "945760985719914593", coin: 20000 },
  { role: "945760985719914594", coin: 22000 },

  { role: "945760985719914595", coin: 26000 },
  { role: "945760985707339836", coin: 26000 },
  { role: "945760985707339837", coin: 26000 },
  { role: "945760985707339845", coin: 26000 },


  { role: "945760985719914597", coin: 28000 },
  { role: "945760985736708186", coin: 30000 },
  { role: "945760985736708187", coin: 32000 },

  { role: "945760985736708189", coin: 34000 },
  { role: "945760985707339838", coin: 34000 },
  { role: "945760985707339845", coin: 34000 },


  { role: "945760985736708190", coin: 38000 },
  { role: "945760985736708191", coin: 40000 },

  { role: "945760985736708193",  coin: 42000 },
  { role: "945760985707339839", coin: 42000 },
  { role: "945760985753456731", coin: 42000 },


  { role: "945760985736708194", coin: 44000 },
  { role: "945760985736708195", coin: 46000 },
  
  ]

  //KOMUT ÇALIŞTIRMA
fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[ramal] ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/commands/${f}/` + file);
        console.log(`[ramal KOMUT] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(settings.token)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));


  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });



setInterval(() => {
  let GuildID = configs.GuildID
  let OneMonth = configs.BirAy
  let ThreeMonth = configs.UcAy
  let SixMonth = configs.AltiAy
  let NineMonth = configs.DokuzAy
  let OneYear = configs.BirYil
  const server = client.guilds.cache.get(GuildID); 
  server.members.cache.forEach(async member => {
if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 30) {await member.roles.add(OneMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 90) {await member.roles.remove(OneMonth)
  await member.roles.add(ThreeMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 180) {await member.roles.remove(ThreeMonth)
await member.roles.add(SixMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 270) {await member.roles.remove(SixMonth)
  await member.roles.add(NineMonth)}

  if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 365) {await member.roles.remove(NineMonth)
    await member.roles.add(OneYear)}

        })
  }, 1000 * 60 * 60 * 24 * 7)


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  client.on("message", async message => {
    if(!message.author.id == "962417173043753022") return;
    if (message.content === ".gir") {
        client.emit(
            "guildMemberAdd",
            message.member || (await message.guild.fetchMember(message.author))
        );
    }
  });
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", async (msg) => {
  if (!msg.guild || msg.author.id === client.user.id) return;
  let reklamKoruma = true;

  if (reklamKoruma) {
    try {
      const kelime = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
      if (kelime.some(reklam => msg.content.includes(reklam))) {
        if (msg.member.permissions.has(8)) return
        msg.channel.send(`Hey ${msg.author}, sunucuda link paylaşamazsın!`).then(ramalxd => ramalxd.delete({ timeout: 3000 }));
        if (msg.deletable) msg.delete({
          timeout: 200
        }).catch(err => {});
      } else {
        let links = msg.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}?\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
        if (!links) return;
        if (msg.member.permissions.has(8)) return
        if (msg.deletable) msg.delete({
          timeout: 200
        }).catch(err => {});
        msg.channel.send(`Hey ${msg.author}, sunucuda link paylaşamazsın!`).then(ramalxd => ramalxd.delete({ timeout: 3000 }));
      }
    } catch (err) {}

  }
})

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (!newMsg.guild || newMsg.author.id === client.user.id) return;
  let reklamKoruma = true;
  if (reklamKoruma) {
    try {
      if (newMsg.member.permissions.has(8)) return
      const kelime = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
      if (kelime.some(reklam => newMsg.content.includes(reklam))) {
        newMsg.channel.send(`Hey ${newMsg.author}, sunucuda link paylaşamazsın!`).then(ramalxd => ramalxd.delete({ timeout: 3000 }));
        if (newMsg.deletable) newMsg.delete({
          timeout: 200
        }).catch(err => {});
      } else {
        let links = newMsg.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}?\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
        if (!links) return;
        if (newMsg.deletable) newMsg.delete({
          timeout: 200
        }).catch(err => {});
        newMsg.channel.send(`Hey ${newMsg.author}, sunucuda link paylaşamazsın!`).then(ramalxd => ramalxd.delete({ timeout: 3000 }));
      }
    } catch (err) {}

  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////   tag rol   //////////////////////////////////////

client.on("userUpdate", async function(eskiii, yeniii) {
  const guildID = "981339432303071322"
  const roleID = "1026104838674714655"//taglı_rol
  const tag = conf.tags
  const tag2 = conf.tags2
  const tag3 = conf.tags3
  const tag4 = conf.tags4
  const tag5 = conf.tags5
  const tag6 = conf.tags6
  const tag7 = conf.tags7
  const etiket = conf.etikets
  const log2 = '1026104997286522891'

  const guildd22 = client.guilds.cache.get(guildID)
  const role = guildd22.roles.cache.find(roleInfo => roleInfo.id === roleID)
  const member = guildd22.members.cache.get(yeniii.id)
  if (yeniii.username !== eskiii.username) {
    
    if (eskiii.username.includes(tag) && !yeniii.username.includes(tag)) {
      if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);
  
        member.roles.remove(roleID)
        client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
    } else if (!eskiii.username.includes(tag) && yeniii.username.includes(tag)) {
        member.roles.add(roleID)
        client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
    }
}

if (yeniii.discriminator !== eskiii.discriminator) {
  if (eskiii.discriminator == "etiketiniz" && yeniii.discriminator !== "etiketiniz") {
    if (yeniii.username.includes(tag)) return client.channels.cache.get(log2).send(`${yeniii} Etiketimizi tagımızı bıraktı ama hala üzerinde isim tagımızı olduğu için \`Tagges\` rolünü almadım`);
      member.roles.remove(roleID)
     client.channels.cache.get(log2).send(`${yeniii} etiketimizi çıkartarak ailemizden ayrıldı!`)
  } else if (eskiii.discriminator !== "etiketiniz" && yeniii.discriminator == "etiketiniz") {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(`${yeniii} etiketimizi alarak ailemize katıldı`)
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////
if (yeniii.username !== eskiii.username) {
    
  if (eskiii.username.includes(tag2) && !yeniii.username.includes(tag2)) {
    if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);

      member.roles.remove(roleID)
      client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
  } else if (!eskiii.username.includes(tag2) && yeniii.username.includes(tag2)) {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (yeniii.username !== eskiii.username) {
    
  if (eskiii.username.includes(tag3) && !yeniii.username.includes(tag3)) {
    if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);

      member.roles.remove(roleID)
      client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
  } else if (!eskiii.username.includes(tag3) && yeniii.username.includes(tag3)) {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
if (yeniii.username !== eskiii.username) {
    
  if (eskiii.username.includes(tag4) && !yeniii.username.includes(tag4)) {
    if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);

      member.roles.remove(roleID)
      client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
  } else if (!eskiii.username.includes(tag4) && yeniii.username.includes(tag4)) {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (yeniii.username !== eskiii.username) {
    
  if (eskiii.username.includes(tag5) && !yeniii.username.includes(tag5)) {
    if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);

      member.roles.remove(roleID)
      client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
  } else if (!eskiii.username.includes(tag5) && yeniii.username.includes(tag5)) {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (yeniii.username !== eskiii.username) {
    
  if (eskiii.username.includes(tag6) && !yeniii.username.includes(tag6)) {
    if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);

      member.roles.remove(roleID)
      client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
  } else if (!eskiii.username.includes(tag6) && yeniii.username.includes(tag6)) {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (yeniii.username !== eskiii.username) {
    
  if (eskiii.username.includes(tag7) && !yeniii.username.includes(tag7)) {
    if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);

      member.roles.remove(roleID)
      client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
  } else if (!eskiii.username.includes(tag7) && yeniii.username.includes(tag7)) {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})

client.on("guildMemberAdd", member => {
  const guildID = "981339432303071322"
  const roleID = "1026104838674714655"//taglı_rol
  const tag = conf.tags
  const tag2 = conf.tags2
  const tag3 = conf.tags3
  const tag4 = conf.tags4
  const tag5 = conf.tags5
  const tag6 = conf.tags6
  const tag7 = conf.tags7
  const log2 = '1026104997286522891'
  const guildd22 = client.guilds.cache.get(guildID)
  const role = guildd22.roles.cache.find(roleInfo => roleInfo.id === roleID)
  if(member.user.username.includes(tag)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  if(member.user.username.includes(tag2)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  
  }

  if(member.user.username.includes(tag3)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  
  }

  if(member.user.username.includes(tag4)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  
  }

  if(member.user.username.includes(tag5)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  
  }

  if(member.user.username.includes(tag6)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  
  }
  if(member.user.username.includes(tag7)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  
  }

}
})
