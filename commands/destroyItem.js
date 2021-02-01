const Discord = require('discord.js')
const inv = require('inventory')
const eco = require('discord-economy');

module.exports = {
  name: 'destroyitem',
  description: 'destroys a player\'s item',
  expectedArgs: '[player], [itemName]',
  category: 'Inventory',
  permissionError: 'no',
  minArgs: 2,
  maxArgs: 2,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' removeItem');
    if (!message.mentions.users.first()) return message.reply('Error: No player specified')
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
  },
  permissions: 'ADMINISTRATOR',
  requiredRoles: [],
}
