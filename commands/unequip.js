const Discord = require('discord.js')
const inv = require('inventory');
module.exports = {
  name: 'unequip',
  description: 'Equips an item',
  usage: 'unequip [itemName]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' unequip')
    if (!params[0]) return message.reply('Error: No item specified')
    var item = await inv.fetchItem(message.author.id, paramsCom[0])
    if (!item.pID) {
      return message.reply('You do not own an item with this name')
    }
    var eItem = await inv.unequipItem(message.author.id, paramsCom[0])
    if (eItem.type === 'color') {
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
    }
  }
}
