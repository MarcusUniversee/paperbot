const Discord = require('discord.js')
const inv = require('inventory')
const eco = require('discord-economy');

module.exports = {
  name: 'destroyitem',
  description: 'destroys a player\'s item',
  usage: 'destroyitem [player], [itemName]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' removeItem');
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('no')
    if (!message.mentions.users.first()) return message.reply('Error: No player specified')
    if (!paramsCom[1]) return message.reply('Error: No item specified')
    var output = await inv.fetchItem(message.mentions.users.first().id, paramsCom[1])
    if (!output.pID) {
      return message.reply('Item does not exist')
    }


    message.channel.send({embed: {
    color: 0x7a19a8,
    title: 'Item Destroyed!',
    fields: [
      {
        name: 'Details:',
        value: `Player: **${message.mentions.users.first().tag}**\nItem: ${output.name}`,
      },
    ],
    }})


    inv.removeItem(message.mentions.users.first().id, paramsCom[1]);

  }
}
