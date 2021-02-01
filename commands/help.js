const loadCommands = require('./load-commands')
const prefix = 'p.'
const Discord = require('discord.js');
module.exports = {
  name: ['help', 'h'],
  description: "Describes all of this bot's commands",
  expectedArgs: '',
  category: '',
  callback: (message, arguments, text) => {
    const categories = ['Economy', 'Betting', 'Inventory', '']
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
      reply.push({type: categories[i] || 'Other commands', value: desc.join(" ")})
    }


    const messageEmbed = new Discord.MessageEmbed()
    	.setColor('0x7a19a8')
    	.setTitle('Commands')
    	.setDescription('Help menu')
      reply.forEach(entry => {
        console.log(entry)
        messageEmbed.addField(entry.type, entry.value);
      });


    message.channel.send(messageEmbed);

  },
}
