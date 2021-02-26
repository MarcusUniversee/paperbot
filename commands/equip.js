const Discord = require('discord.js')
const inv = require('inventory');
const prof = require('profile')
module.exports = {
  name: 'equip',
  description: 'Equips an item',
  expectedArgs: '[itemName]',
  category: 'Inventory',
  permissionError: 'no',
  minArgs: 1,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' equip')
    var item = await inv.fetchItem(message.author.id, paramsCom[0])
    if (!item.pID) return message.reply('You do not own an item with this name')

    switch (item.type) {
      case 'color':
      case 'role':
        const role = message.guild.roles.cache.find(role => role.name === paramsCom[0]);
        message.member.roles.add(role);
        message.channel.send({embed: {
          color: 0x7a19a8,
          title: 'Item Equipped',
          fields: [
            {
              name: `${item.name}`,
              value: `type: ${item.type}`,
            },
          ],
        }})
        var eItem = await inv.equipItem(message.author.id, paramsCom[0])
      break;
      case 'badge':
        message.channel.send({embed: {
          color: 0x7a19a8,
          title: 'Item Equipped',
          fields: [
            {
              name: `${item.name}`,
              value: `type: ${item.type}`,
            },
          ],
        }})
        var eItem = await inv.equipItem(message.author.id, paramsCom[0])
      break;
      case 'profile':
        message.channel.send({embed: {
          color: 0x7a19a8,
          title: 'Item Equipped',
          fields: [
            {
              name: `${item.name}`,
              value: `type: ${item.type}`,
            },
          ],
        }})
        var eItem = await inv.equipItem(message.author.id, paramsCom[0])
        var profUpdate = await prof.updateField(message.author.id, item.name, true)
      break;
      default:
        message.channel.send('You cannot equip this item')
      break;
    }

  },
  permissions: [],
  requiredRoles: [],
}
