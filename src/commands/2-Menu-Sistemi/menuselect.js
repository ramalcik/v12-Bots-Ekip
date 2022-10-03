const { MessageEmbed, Client, Message } = require("discord.js");
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const client = global.client;
const conf = require("../../configs/sunucuayar.json");
const { ramalnitro, ramalnetflix, ramalspotify, ramalexxen, ramalblutv, star} = require("../../configs/emojis.json")

const katılımcı = {
  "945953085681991711": "945958928250961950",
  "945954549628280903": "945958928955621406"
}; 

const burclar = {
  "945981020245753867": "945958767986630658",
  "945982600353312768": "945958776727556156",
  "945988416598847548": "945958738077044796",
  "945990349304786965": "945958771719557181",
  "945982400104656906": "945958780275929138",
  "945981829536690187": "945958739402457098",
  "945983752604094475": "945958766753480714",
  "945981903062843392": "945958776014536744",
  "945981144292270121": "945986020611084388",
  "945982694486077461": "945958767550418964",
  "945989901755744306": "945958765709123636",
  "945989230612582420": "945958738722947103"
};

const renkler = {
  "🍓": "🍓",
  "🍌": "945958943736365137",
  "🍑": "945958948337500190",
  "🍇": "945958948111015977",
  "🍏": "945958948312317992"
};

const ilişki = {
  "946310885650104320": "945958929861586954",
  "946315370380267540": "945958934148165682",
  "946119260000878644": "945958934198509588"
}; 

const oyunlar = {
  "945991950635507712":"946015657244364820",
  "945991630660440064":"946015703046180874",
  "945992038996914196":"946015756020232242",
  "946673728123707423":"946015796751138867",
  "945992294157414410":"946015830037114951",
  "945991861024215090":"946015892419014696",
  "946673883954700328":"946016025902718976",
  "946678463249666069":"946016206723371038"
};

module.exports = {
  conf: {
    aliases: ["menü","m2"],
    name: "menü",
    help: "menü",
    owner: true
  },
  
    run: async (client, message, args, durum, kanal) => {
 
      const katılımPush = [];
      const burcPush = [];
      const oyunPush = [];
      const renkPush = [];
      const digerPush = [];
      const emoji = (name) => client.emojis.cache.find(x => x.name === name);
    
    
      for (const katılım in katılımcı) {
        let sonuc = katılımcı[katılım];
        let table = new disbut.MessageMenuOption()
          .setLabel(message.guild.roles.cache.get(sonuc) ? message.guild.roles.cache.get(sonuc).name : sonuc)
          .setEmoji(emoji(katılım) ? emoji(katılım).id : katılım)
          .setValue(sonuc)
          katılımPush.push(table);
      };
      let kaldırkatılım = new disbut.MessageMenuOption()
      .setLabel("Rol İstemiyorum")
      .setEmoji("🗑️")
      .setValue("kaldır")
      let katılım = new disbut.MessageMenu()
        katılım.setID("katılım")
        katılım.setPlaceholder(`Etkinlik Rolleri`)
        katılım.setMaxValues(2)
        katılım.setMinValues(1)
        katılım.addOptions(katılımPush,kaldırkatılım)


      for (const burc in burclar) {
        let sonuc = burclar[burc];
        let table = new disbut.MessageMenuOption()
          .setLabel(message.guild.roles.cache.get(sonuc) ? message.guild.roles.cache.get(sonuc).name : sonuc)
          .setEmoji(emoji(burc) ? emoji(burc).id : burc)
          .setValue(sonuc)
     burcPush.push(table);
      };
      let kaldırburc = new disbut.MessageMenuOption()
      .setLabel("Rol İstemiyorum")
      .setEmoji("🗑️")
      .setValue("kaldır")
      let burc = new disbut.MessageMenu()
        burc.setID("burc")
        burc.setPlaceholder(`Burç Rolleri`)
        burc.setMaxValues(1)
        burc.setMinValues(1)
        burc.addOptions(burcPush,kaldırburc)
    
    
      for (const oyun in oyunlar) {
        const sonuc = oyunlar[oyun];
        let table = new disbut.MessageMenuOption()
          .setLabel(message.guild.roles.cache.get(sonuc) ? message.guild.roles.cache.get(sonuc).name : sonuc)
          .setEmoji(emoji(oyun) ? emoji(oyun).id : oyun)
          .setValue(sonuc)
         oyunPush.push(table);
      };
      let kaldıroyun = new disbut.MessageMenuOption()
      .setLabel("Rol İstemiyorum")
      .setEmoji("🗑️")
      .setValue("kaldır")
      let oyun = new disbut.MessageMenu();
      oyun.setID("oyun");
      oyun.setPlaceholder(`Oyun Rolleri`)
      oyun.setMaxValues(6);
      oyun.setMinValues(1);
      oyun.addOptions(oyunPush,kaldıroyun);
    
   for (const renk in renkler) {
        const sonuc = renkler[renk];
        let table = new disbut.MessageMenuOption()
          .setLabel(message.guild.roles.cache.get(sonuc) ? message.guild.roles.cache.get(sonuc).name : sonuc)
          .setEmoji(emoji(renk) ? emoji(renk).id : renk)
          .setValue(sonuc)
        renkPush.push(table);
      };
      let kaldırrenk = new disbut.MessageMenuOption()
      .setLabel("Rol İstemiyorum")
      .setEmoji("🗑️")
      .setValue("kaldır")
      let renk = new disbut.MessageMenu();
      renk.setID("renk");
      renk.setPlaceholder(`Renk Rolleri`)
      renk.setMaxValues(1);
      renk.setMinValues(1);
      renk.addOptions(renkPush,kaldırrenk);
    
  
    
      for (const diger in ilişki) {
        const sonuc = ilişki[diger];
        let table = new disbut.MessageMenuOption()
          .setLabel(message.guild.roles.cache.get(sonuc) ? message.guild.roles.cache.get(sonuc).name : sonuc)
          .setEmoji(emoji(diger) ? emoji(diger).id : diger)
          .setValue(sonuc)
        digerPush.push(table);
      };
      let kaldırdiger = new disbut.MessageMenuOption()
      .setLabel("Rol İstemiyorum")
      .setEmoji("🗑️")
      .setValue("kaldır")
      let diger = new disbut.MessageMenu();
      diger.setID("diger");
      diger.setPlaceholder(`İlişki Rolleri`)
      diger.setMaxValues(1);
      diger.setMinValues(1);
      diger.addOptions(digerPush,kaldırdiger);
    
      if (args[0] === "katılım") {
        message.channel.send(`<a:KonfetiGif:945953085681991711> Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız.
\`⦁\` Eğer \`@Etkinlik Katılımcısı\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz. 
        
\`⦁\` Eğer \`@Çekiliş Katılımcısı\` Rolünü alırsanız sunucumuzda sıkça vereceğimiz ${adonitro} , ${adospotify} , ${adonetflix} , ${adoexxen} , ${adoblutv} ve daha nice ödüllerin bulunduğu çekilişlerden haberdar olabilirsiniz. 
        
**NOT:** \`Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\``, katılım);
      }


      if (args[0] === "burc") {
        message.channel.send(`${star} Aşağıda ki menüden **Burç** rollerinden dilediğinizi alabilirsiniz.`, burc);
      }
    
    
      if (args[0] === "oyun") {
        message.channel.send(`${star} Aşağıda ki menüden **Oyun** rollerinden dilediğinizi alabilirsiniz.`, oyun);
      }
    
      if (args[0] === "renk") {
        message.channel.send(`${star} Aşağıda ki menüden **Renk** rollerinden dilediğinizi alabilirsiniz.`, renk);
      }
    
    
      if (args[0] === "iliski") {
        message.channel.send(`${star} Aşağıda ki menüden **İlişki** rollerinden dilediğinizi alabilirsiniz.`, diger);
      }
    
  
    },
  };

    client.on("clickMenu", async (menu) => {

      if (menu.id == "katılım") {
        await menu.reply.think(true);
        await menu.reply.edit("Rollerin güncellendi!");
        let add = [];
        let remove = [];
        let allRemove = [];
        let roller = katılımcı;
        for (const rol in roller) {
          let sonuc = roller[rol];
          allRemove.push(sonuc);
          if (menu.values.includes(sonuc)) {
          await menu.reply.edit(`Başarılı bir şekilde <@&${sonuc}> rolü üzerinize eklendi!`);
            add.push(sonuc);
          } else {
            remove.push(sonuc);
          };
        };
        if (!menu.values.some(value => value === "allDelete")) {
          if (remove.length > 0) {
            await menu.clicker.member.roles.remove(remove);
    
          };
          await menu.clicker.member.roles.add(add);
        
  
        } else {
          await menu.clicker.member.roles.remove(allRemove);
         
  
        };
        };


      if (menu.id == "burc") {
          await menu.reply.think(true);
          await menu.reply.edit("Rollerin güncellendi!");
          let add = [];
          let remove = [];
          let allRemove = [];
          let roller = burclar;
          for (const rol in roller) {
            let sonuc = roller[rol];
            allRemove.push(sonuc);
            if (menu.values.includes(sonuc)) {
            await menu.reply.edit(`Başarılı bir şekilde <@&${sonuc}> rolü üzerinize eklendi!`);
              add.push(sonuc);
            } else {
              remove.push(sonuc);
            };
          };
          if (!menu.values.some(value => value === "allDelete")) {
            if (remove.length > 0) {
              await menu.clicker.member.roles.remove(remove);
      
            };
            await menu.clicker.member.roles.add(add);
          
    
          } else {
            await menu.clicker.member.roles.remove(allRemove);
           
    
          };
          };
    
      if (menu.id == "oyun") {
        await menu.reply.think(true);
        await menu.reply.edit("Rollerin güncellendi!");
        let add = [];
        let remove = [];
        let allRemove = [];
        let roller = oyunlar;
        for (const rol in roller) {
          let sonuc = roller[rol];
          allRemove.push(sonuc);
          if (menu.values.includes(sonuc)) {
              
            await menu.reply.edit(`Başarılı bir şekilde <@&${sonuc}> rolü üzerinize eklendi!`);
            add.push(sonuc);
          } else {
            remove.push(sonuc);
          };
        };
        if (!menu.values.some(value => value === "allDelete")) {
          if (remove.length > 0) {
            await menu.clicker.member.roles.remove(remove);
          };
          await menu.clicker.member.roles.add(add);
        } else {
          await menu.clicker.member.roles.remove(allRemove);
  
        };
      };
    
      if (menu.id == "renk") {
        await menu.reply.think(true);
        if (!menu.clicker.member.roles.cache.get(conf.boosterRolu) && !menu.clicker.member.roles.cache.get(conf.ekipRolu))  return await menu.reply.edit("Rollerin güncellenirken bir sorun meydana geldi **(İsminde Sunucu Tag'ı Yoktur veya Boost basmamışsın)**");;
        await menu.reply.edit("Rollerin güncellendi!");
  
        let add = [];
        let remove = [];
        let allRemove = [];
        let roller = renkler;
        for (const rol in roller) {
  
          let sonuc = roller[rol];  
  
          allRemove.push(sonuc);
          if (menu.values.includes(sonuc)) {    
            await menu.reply.edit(`Başarılı bir şekilde <@&${sonuc}> rolü üzerinize eklendi!`);
  
            add.push(sonuc);
          } else {
            remove.push(sonuc);
  
          };
        };
        if (!menu.values.some(value => value === "allDelete")) {
          if (remove.length > 0) {
            await menu.clicker.member.roles.remove(remove);
          };
          await menu.clicker.member.roles.add(add);
        } else {
          await menu.clicker.member.roles.remove(allRemove);
  
        };
      };
      if (menu.id == "diger") {
        await menu.reply.think(true);
        await menu.reply.edit("Rollerin güncellendi!");
        let add = [];
        let remove = [];
        let allRemove = [];
        let roller = ilişki;
        for (const rol in roller) {
          let sonuc = ilişki[rol];
          allRemove.push(sonuc);
          if (menu.values.includes(sonuc)) {
              
            await menu.reply.edit(`Başarılı bir şekilde <@&${sonuc}> rolü üzerinize eklendi!`);
            add.push(sonuc);
          } else {
            remove.push(sonuc);
          };
        };
        if (!menu.values.some(value => value === "allDelete")) {
          if (remove.length > 0) {
            await menu.clicker.member.roles.remove(remove);
           
  
          };
          await menu.clicker.member.roles.add(add);
        } else {
          await menu.clicker.member.roles.remove(allRemove);
        };
      };
  
     
    });