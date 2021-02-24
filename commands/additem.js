const Discord = require('discord.js')
const inv = require('inventory')

module.exports = {
  name: 'additem',
  description: 'Adds an item to a specified user\'s inventory',
  expectedArgs: '[player], [itemType], [itemName]',
  category: 'Inventory',
  permissionError: 'no',
  minArgs: 3,
  maxArgs: 3,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' addItem')
    var itemType = paramsCom[1]
    var itemName = paramsCom[2]
    if (!message.mentions.users.first()) return message.reply('User not mentioned')
    var hasItem = await inv.fetchItem(message.mentions.users.first().id, itemName)
    if (hasItem.pID) message.reply('This player already owns this item. Adding another one to thei inventory')
    var itemInv = await inv.addItem(message.mentions.users.first().id, itemType, itemName)
    message.reply(`Successfully added ${itemInv.name} to ${message.mentions.users.first().tag}`);
  },
  permissions: 'ADMINISTRATOR',
  requiredRoles: [],
}
