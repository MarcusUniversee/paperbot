const Discord = require('discord.js')
const eco = require('discord-economy');
const inv = require('inventory');
const leveling = require('discord-leveling');
const list = require('../getJSON/crates.json')
const rolesList = require('../getJSON/roles.json')
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
        console.log("crate: " + crate)
        break;
      }
    }
    //give prizes
    for (var j=0;j<crate.contents.length;j++) {
      var min = crate.contents[j][1]
      var max = crate.contents[j][2]
      var chances = crate.contents[j][3]
      var chance = Math.random() < chances
      console.log("chance: " + chance)
      if (chance) {
        var amount = Math.floor(Math.random() * ((max - min) + 1) + min);
        console.log("amount: " + amount)
        switch (crate.contents[j][0]) {
          case "blanks":
            var profile = await eco.AddToBalance(message.author.id, amount)
            message.reply(`You have earned ${amount} blanks and now own ${profile.newbalance} blanks.`);
          break;
          case "xp":
            var profile2 = await leveling.Fetch(message.author.id)
            //If user xp higher than 100 add level
            var maxXp = ((profile2.level*10)-(profile2.level*2)) + 1;
            var xp = amount
            message.reply(`You have earned ${amount} xp`);
            while (xp > 0) {
              profile2 = await leveling.Fetch(message.author.id)
              var curXp = profile2.xp
              console.log("current xp: " + curXp)
              xp = xp + curXp
              console.log("total xp: " + xp)
              maxXp = ((profile2.level*10)-(profile2.level*2)) + 1;
              console.log("max xp: " + maxXp)
              if (xp > maxXp) {
                var money = 5 + Math.floor(profile2.level/5)
                await leveling.AddLevel(message.author.id, 1)
                await leveling.SetXp(message.author.id, 0)
                var profileBal = await eco.AddToBalance(message.author.id, money)
                message.reply(`${message.author.tag} just leveled up!! They are now level ${profile2.level + 1} and they have earned ${money} blanks`)
                xp = xp - maxXp
              } else {
                leveling.AddXp(message.author.id, xp)
                xp = 0;
                break;
              }
            }
          break;
          case "color":
            var role = rolesList[Math.floor(Math.random() * rolesList.length)]
            var hasItem = await inv.fetchItem(message.author.id, role.name)
            if (hasItem.pID) {
              var profile3 = await eco.AddToBalance(message.author.id, amount)
              message.reply(`You already own ${role.name} so you have recieved 150 blanks. You now own ${profile3.newbalance} blanks.`);
            } else {
              var itemInv = await inv.addItem(message.author.id, "color", role.name)
              message.reply(`You found the color ${role.name}!`);
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
