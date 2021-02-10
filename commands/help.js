const loadCommands = require('./load-commands')
const prefix = 'p.'
const Discord = require('discord.js');
module.exports = {
  name: ['help', 'h'],
  description: "Describes all of this bot's commands",
  expectedArgs: '',
  category: '',
  callback: (message, arguments, text) => {
    const categories = ['', 'Economy', 'Betting', 'Inventory', 'Facts']
    var reply = [];
    const commands = loadCommands()
    for (var i=0;i<categories.length;i++) {
      var desc = [];
      for (const command of commands) {
        const { category } = command
        if (category !== categories[i]) continue
        // Check for permissions
        let permissions = command.permission

        if (permissions) {
          let hasPermission = true
          if (typeof permissions === 'string') {
            permissions = [permissions]
          }

          for (const permission of permissions) {
            if (!message.member.hasPermission(permission)) {
              hasPermission = false
              break
            }
          }

          if (!hasPermission) {
            continue
          }
        }

        // Format the text
        const mainCommand =
          typeof command.name === 'string'
            ? command.name
            : command.name[0]
        const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
        const { description } = command

        desc.push(`**${prefix}${mainCommand}${args}**: ${description}\n`)
      }
      reply.push({type: categories[i] || 'Commands', value: desc.join(" ")})
    }
    let page = 0;

    const messageEmbed = new Discord.MessageEmbed()
    	.setColor('0x7a19a8')
    	.setTitle('Help menu')
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
}
