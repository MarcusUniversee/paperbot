const Discord = require('discord.js')
const inv = require('inventory');
const list = require('../getJSON/crates.json')
module.exports = {
  name: ['inventory', 'inv'],
  description: 'Shows player inventory',
  expectedArgs: '[user(optional)]',
  category: 'Inventory',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' inventory')
    if (!message.mentions.users.first()) {
      var user = message.author
    } else {
      var user = message.mentions.users.first()
    }

    var pInv = await inv.fetchInv(user.id)
    var invList = [];
    for (var i=0; i<pInv.length; i++) {
      if (pInv[i].dataValues.equip === 1) {
        invList.push('[EQUIPPED]')
      }
      invList.push('Item:')
      invList.push(pInv[i].dataValues.name)
      if (pInv[i].dataValues.type === 'crate') {
        for (var j=0;j<list.length;j++) {
          if (list[j].name === pInv[i].dataValues.name) {
            invList.push(`(Tier ${list[j].tier})`)
          }
        }
      }
      invList.push('| Type: ')
      invList.push(pInv[i].dataValues.type)
      invList.push('| Quantity: ')
      invList.push(pInv[i].dataValues.quantity)
      invList.push('\n\n')
    }
    var inventory = invList.join(" ");
    message.channel.send({embed: {
    color: 0x7a19a8,
    title: `${user.tag}\'s Inventory`,
    description: inventory,
    }})
    return;
  },
  permissions: [],
  requiredRoles: [],
}
