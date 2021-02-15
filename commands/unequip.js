const Discord = require('discord.js')
const inv = require('inventory');
module.exports = {
  name: 'unequip',
  description: 'Equips an item',
  expectedArgs: '[itemName]',
  category: 'Inventory',
  permissionError: 'no',
  minArgs: 1,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' unequip')
    var item = await inv.fetchItem(message.author.id, paramsCom[0])
    if (!item.pID) return message.reply('You do not own an item with this name')
    var eItem = await inv.unequipItem(message.author.id, paramsCom[0])
    switch (eItem.type) {
      case 'color':
      case 'role':
        const role = message.guild.roles.cache.find(role => role.name === paramsCom[0]);
        message.member.roles.remove(role);
        message.channel.send({embed: {
          color: 0x7a19a8,
          title: 'Item Unequipped',
          fields: [
            {
              name: `${eItem.name}`,
              value: `type: ${eItem.type}`,
            },
          ],
        }})
      break;
      case 'badge':
        message.channel.send({embed: {
          color: 0x7a19a8,
          title: 'Item Unequipped',
          fields: [
            {
              name: `${eItem.name}`,
              value: `type: ${eItem.type}`,
            },
          ],
        }})
      break;
      default:
        message.channel.send('Error: wrong item type')
      break;
    }
  },
  permissions: '',
  requiredRoles: [],
}
