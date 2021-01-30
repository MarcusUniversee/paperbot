const Discord = require('discord.js')
const inv = require('inventory');
module.exports = {
  name: 'inventory',
  description: 'Shows player inventory',
  usage: 'inventory [user(optional)]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' inventory')
    if(!params[0]) {
      var pInv = await inv.fetchInv(message.author.id)
      var invList = [];
      for (var i=0; i<pInv.length; i++) {
        if (pInv[i].dataValues.equip === 1) {
          invList.push('[EQUIPPED]')
        }
        invList.push('Item:')
        invList.push(pInv[i].dataValues.name)
        invList.push('| Type')
        invList.push(pInv[i].dataValues.type)
        invList.push('\n\n')
      }
      var inventory = invList.join(" ");
      message.channel.send({embed: {
      color: 0x7a19a8,
      title: `${message.author.tag}\'s Inventory`,
      description: inventory,
      }})
      return;
    } else if (!message.mentions.users.first()) {
      var pInv = await inv.fetchInv(message.author.id)
      if (!pInv[0].dataValues.id) {
        return message.reply('You own no items')
      }
      var invList = [];
      for (var i=0; i<pInv.length; i++) {
        if (pInv[i].dataValues.equip === 1) {
          invList.push('[EQUIPPED]')
        }
        invList.push('Item:')
        invList.push(pInv[i].dataValues.name)
        invList.push('| Type:')
        invList.push(pInv[i].dataValues.type)
        invList.push('\n\n')
      }
      var inventory = invList.join(" ");
      message.channel.send({embed: {
      color: 0x7a19a8,
      title: `${message.author.tag}\'s Inventory`,
      description: inventory,
      }})
    }
    var pInv = await inv.fetchInv(message.mentions.users.first().id)
    if (!pInv[0].dataValues.id) {
      return message.reply('This player owns no items')
    }
    var invList = [];
    for (var i=0; i<pInv.length; i++) {
      if (pInv[i].dataValues.equip === 1) {
        invList.push('[EQUIPPED]')
      }
      invList.push('Item:')
      invList.push(pInv[i].dataValues.name)
      invList.push('| Type')
      invList.push(pInv[i].dataValues.type)
      invList.push('\n\n')
    }
    var inventory = invList.join(" ");
    message.channel.send({embed: {
    color: 0x7a19a8,
    title: `${message.mentions.users.first().tag}\'s Inventory`,
    description: inventory,
    }})

    return;
  }
}
