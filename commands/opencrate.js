const Discord = require('discord.js')
const eco = require('discord-economy');
const inv = require('inventory');
const leveling = require('discord-leveling');
const list = require('../getJSON/crates.json');
const prizeList = require('../getJSON/prizes.json');
const dailyStats = require('dailystats')
module.exports = {
  name: 'opencrate',
  description: 'Opens an owned crate',
  expectedArgs: '[itemName]',
  category: 'Inventory',
  permissionError: 'no',
  minArgs: 1,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' opencrate')
    var item = await inv.fetchItem(message.author.id, paramsCom[0])
    if (!item.pID) return message.reply('You do not own an item with this name')
    if (item.type != 'crate') return message.reply('This item is not a crate')

    for (var i=0;i<list.length;i++) {
      if (paramsCom[0] === list[i].name) {
        var crate = list[i];
        break;
      }
    }
    //give prizes
    for (var j=0;j<crate.contents.length;j++) {
      var min = crate.contents[j][1]
      var max = crate.contents[j][2]
      var chances = crate.contents[j][3]
      var result = Math.random()
      var chance = result < chances
      console.log("chance: " + chances)
      console.log("result: " + result)
      if (chance) {
        dailyStats.updateStat(message.author.id, 'opencrate', 1)
        var amount = Math.floor(Math.random() * ((max - min) + 1) + min);
        console.log("amount: " + amount)
        switch (crate.contents[j][0]) {
          case "blanks":
            var profile = await eco.AddToBalance(message.author.id, amount)
            await dailyStats.updateStat(message.author.id, 'blankcount', amount)
            message.reply(`You have earned ${amount} blanks and now own ${profile.newbalance} blanks.`);
          break;
          case "item":
            var prizes = []
            for (var k=0;k<prizeList.length;k++) {
              if (prizeList[k].series === crate.series) {
                if (prizeList[k].tier <= crate.tier) {
                  prizes.push(prizeList[k])
                  if (prizeList[k].tier === crate.tier) {
                    prizes.push(prizeList[k])
                  }
                }
              }
            }
            var prize = prizes[Math.floor(Math.random() * prizes.length)]
            var hasItem = await inv.fetchItem(message.author.id, prize.name)
            if (hasItem.pID) {
              var profile3 = await eco.AddToBalance(message.author.id, 500)
              message.reply(`You already own ${prize.name} so you have recieved 500 blanks. You now own ${profile3.newbalance} blanks.`);
              await dailyStats.updateStat(message.author.id, 'blankcount', 500)
            } else {
              var itemInv = await inv.addItem(message.author.id, prize.type, prize.name)
              message.reply(`You found ${prize.name}!`);
            }
          break;
          default:
            return message.reply("Error: bad content name type")
          break;
        }
      }
    }

    var eItem = await inv.removeItem(message.author.id, paramsCom[0])

  },
  permissions: [],
  requiredRoles: [],
}
