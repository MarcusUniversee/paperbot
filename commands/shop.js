const Discord = require('discord.js')
const list = require('../getJSON/shop.json')
module.exports = {
  name: 'shop',
  description: 'Replies with the shop',
  expectedArgs: '[item(optional)]',
  category: 'Economy',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' shop')
    if (!paramsCom[0]) {
      const categories = ['color', 'role', 'profile']
      var reply = [] //id. name
      var reply2 = [] //price
      var reply3 = [] //required xp
      for (var i=0;i<categories.length;i++) {
        var desc = [];
        var desc2 = [];
        var desc3 = [];
        var categoryCap = categories[i].charAt(0).toUpperCase() + categories[i].slice(1)
        for (var j=0;j<list.length;j++) {
          if (list[j].type === categories[i]) {
            var num = j + 1
            desc.push(`${num}. ${list[j].name}\n`)
            desc2.push(`${list[j].price}\n`)
            desc3.push(`${list[j].reqRank}\n`)
          }
        }
        reply.push({type: `**${categoryCap}s**`, value: desc.join(" ")})
        reply2.push({type: `Price`, value: desc2.join(" ")})
        reply3.push({type: `Required Rank`, value: desc3.join(" ")})
      }

      let page = 0;
      const messageEmbed = new Discord.MessageEmbed()
      	.setTitle('Shop')
        .setDescription('Do p.shop [item] to view more information')
        .addField(reply[0].type, reply[0].value, true)
        .addField(reply2[0].type, reply2[0].value, true)
        .addField(reply3[0].type, reply3[0].value, true)

      message.channel.send(messageEmbed).then(msg =>{
        msg.react('⬅️').then(r => {
          msg.react('➡️')
          const backFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
          const forFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id;

          const backwards = msg.createReactionCollector(backFilter, { time: 60000 })
          const forwards = msg.createReactionCollector(forFilter, { time: 60000 })

          backwards.on('collect', r => {
            r.users.remove(message.author.id)
            if (page === 0) return;
            page--;
            var field = {name: reply[page].type, value: reply[page].value, inline: true}
            var field2 = {name: reply2[page].type, value: reply2[page].value, inline: true}
            var field3 = {name: reply3[page].type, value: reply3[page].value, inline: true}
            messageEmbed.spliceFields(0, 1, field)
            messageEmbed.spliceFields(1, 1, field2)
            messageEmbed.spliceFields(2, 1, field3)
            msg.edit(messageEmbed)
          })

          forwards.on('collect', r => {
            r.users.remove(message.author.id)
            if (page === (categories.length - 1)) return;
            page++;
            var field = {name: reply[page].type, value: reply[page].value, inline: true}
            var field2 = {name: reply2[page].type, value: reply2[page].value, inline: true}
            var field3 = {name: reply3[page].type, value: reply3[page].value, inline: true}
            messageEmbed.spliceFields(0, 1, field)
            messageEmbed.spliceFields(1, 1, field2)
            messageEmbed.spliceFields(2, 1, field3)
            msg.edit(messageEmbed)
          })
        })
      });
    } else {
      //INDIVIDUAL ITEMS
      var item;
      if (paramsCom[0]) var inputItem = paramsCom[0].toLowerCase()
      if (parseInt(inputItem)) {
        item = list[parseInt(inputItem)-1]
      } else {
        for (var i=0; i<list.length;i++) {
          if (inputItem === list[i].name) {
            item = list[i];
            break;
          }
        }
        if (!item) {
          return message.reply('Not a valid item. Check p.shop to view purchasable items')
        }
      }
      if (item.type === 'color') {
        const role = message.guild.roles.cache.find(role => role.name === item.id);
        message.channel.send({embed: {
          color: role.color,
          title: `${item.name} color`,
        }});
      } else {
        message.channel.send({embed: {
          title: `${item.name}`,
          description: `${item.description}`
        }});
      }
    }
  },
  permissions: [],
  requiredRoles: [],
}
