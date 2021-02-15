const Discord = require('discord.js')
const eco = require('discord-economy');
const inv = require('inventory');
const leveling = require('discord-leveling');
const list = require("../getJSON/shop.json")
module.exports = {
  name: 'buy',
  description: 'Buys an item from the shop',
  expectedArgs: '[itemName/itemNumber]',
  category: 'Economy',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' shop')
    if (paramsCom[0]) var inputItem = paramsCom[0].toLowerCase()
    if (parseInt(inputItem)) {
      var item = list[parseInt(inputItem)-1]
    } else {
      for (var i=0; i<list.length;i++) {
        if (inputItem === list[i].name) {
          var item = list[i];
          break;
        }
      }
      if (!item) {
        message.reply('Not a valid item. Check p.shop to view purchasable items')
      }
    }
    var price = item.price;
    var itemName = item.name;
    var itemType = item.type;
    var itemRank = item.reqRank

    //CHECKS
    var hasItem = await inv.fetchItem(message.author.id, itemName)
    if (hasItem.pID) return message.reply('You already own this item')
    var output = await eco.FetchBalance(message.author.id)
    if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
    var lvlProfile = await leveling.Fetch(message.author.id)
    if (itemRank > lvlProfile.level) return message.reply('Your rank is too low')

    //EXECUTE
    var profile = await eco.SubtractFromBalance(message.author.id, price)
    var itemInv = await inv.addItem(message.author.id, itemType, itemName)
    message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
  },
  permissions: [],
  requiredRoles: [],
}
