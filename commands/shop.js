const Discord = require('discord.js')
const list = require('../getJSON/shop.json')
module.exports = {
  name: 'shop',
  description: 'Replies with the shop',
  expectedArgs: '',
  category: 'Economy',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' shop')
    const categories = ['color', 'role']
    var reply = []
    for (var i=0;i<categories.length;i++) {
      var desc = [];
      var categoryCap = categories[i].charAt(0).toUpperCase() + categories[i].slice(1)
      for (var j=0;j<list.length;j++) {
        if (list[j].type === categories[i]) {
          var num = j + 1
          desc.push(`${num}. ${list[j].name} - ${list[j].price}\n`)
        }
      }
      reply.push({type: `**${categoryCap}s**`, value: desc.join(" ")})
    }


    let page = 0;



    const messageEmbed = new Discord.MessageEmbed()
    	.setColor('0x7a19a8')
    	.setTitle('Shop')
      .addField(reply[0].type, reply[0].value);

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
          var field = {name: reply[page].type, value: reply[page].value}
          messageEmbed.spliceFields(0, 1, field)
          msg.edit(messageEmbed)
        })

        forwards.on('collect', r => {
          r.users.remove(message.author.id)
          if (page === (categories.length - 1)) return;
          page++;
          var field = {name: reply[page].type, value: reply[page].value}
          messageEmbed.spliceFields(0, 1, field)
          msg.edit(messageEmbed)
        })
      })
    });
  },
  permissions: [],
  requiredRoles: [],
}
