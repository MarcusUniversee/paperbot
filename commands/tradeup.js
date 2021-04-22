const Discord = require('discord.js')
const eco = require('discord-economy');
const inv = require('inventory');
const leveling = require('discord-leveling');
const list = require('../getJSON/crates.json');
const dailyStats = require('dailystats')

module.exports = {
  name: 'tradeup',
  description: 'trades up 5 crates for a crate of a higher rarity',
  expectedArgs: '',
  category: 'Inventory',
  permissionError: 'no',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' tradeup')
    var pInv = await inv.fetchInv(message.author.id)
    var invList = [];
    for (var i=0; i<pInv.length; i++) {
      if (pInv[i].dataValues.type === 'crate') {
        for (var j=0;j<list.length;j++) {
          if (list[j].name === pInv[i].dataValues.name && list[j].tradable) {
            invList.push(pInv[i].dataValues.name)
            invList.push(`(Tier ${list[j].tier})`)
            invList.push('| Quantity: ')
            invList.push(pInv[i].dataValues.quantity)
            invList.push('\n\n')
          }
        }
      }
    }
    if (!invList[0]) return message.reply('You do not own any tradable crates')
    var inventory = invList.join(" ");
    message.channel.send({embed: {
    color: 0x7a19a8,
    title: `Respond with a crate you want to trade up`,
    description: inventory,
    }})

    const filter = m => m.author.id === message.author.id

    const respond = message.channel.createMessageCollector(filter, { time: 30000 });

    respond.on('collect', async m => {
      var item = await inv.fetchItem(message.author.id, m.content)
      if (!item.pID) {
        message.reply('You do not own an item with this name')
        respond.stop()
        return;
      }
      if (item.type != 'crate') {
        message.reply('This item is not a crate')
        respond.stop()
        return;
      }
      for (var k=0;k<list.length;k++) {
        if (list[k].tradable && list[k].name === m.content) {
          if (item.quantity >= 5) {
            await inv.removeItem(message.author.id, item.name)
            await inv.removeItem(message.author.id, item.name)
            await inv.removeItem(message.author.id, item.name)
            await inv.removeItem(message.author.id, item.name)
            await inv.removeItem(message.author.id, item.name)
            var itemName = list[k].tradefor
            var itemInv = await inv.addItem(message.author.id, 'crate', itemName, 1)
            message.reply('Trade up successful!')
            dailyStats.updateStat(message.author.id, 'tradecrate', 1)
            respond.stop()
            return;
          } else {
            message.reply('You do not have 5 of this crate')
            respond.stop()
            return;
          }
        }
      }
      message.reply('This is not a tradable crate')
      respond.stop()
      return;
    })
  },
  permissions: [],
  requiredRoles: [],
}
