const Discord = require('discord.js')
const inv = require('inventory');
module.exports = {
  name: 'equip',
  description: 'Equips an item',
  usage: 'equip [itemName]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' equip')
    if (!params[0]) return message.reply('Error: No item specified')
    var item = await inv.fetchItem(message.author.id, paramsCom[0])
    if (!item.pID) {
      return message.reply('You do not own an item with this name')
    }
    var eItem = await inv.equipItem(message.author.id, paramsCom[0])
    if (eItem.type === 'color') {
      const role = message.guild.roles.cache.find(role => role.name === paramsCom[0]);
      message.member.roles.add(role);
      message.channel.send({embed: {
      color: 0x7a19a8,
      title: 'Item Equipped',
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
