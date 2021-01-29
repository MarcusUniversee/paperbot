const Discord = require('discord.js')
const eco = require('discord-economy');
const inv = require('inventory');
module.exports = {
  name: 'shop',
  description: 'Shop for items!',
  usage: 'shop [item]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' shop')
    if (paramsCom[0]) var item = paramsCom[0].toLowerCase()
    switch (item) {
      case '1':
      case 'crimson':
        var price = 9600;
        var itemName = 'crimson';
        var itemType = 'color';
        var hasItem = await inv.fetchItem(message.author.id, itemName)
        if (hasItem.pID) return message.reply('You already own this item')
        var output = await eco.FetchBalance(message.author.id)
        if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
        var profile = await eco.SubtractFromBalance(message.author.id, 1)
        var itemInv = await inv.addItem(message.author.id, itemType, itemName)
        message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
      break;
      case '2':
      case 'sky blue':
        var price = 7360;
        var itemName = 'sky blue';
        var itemType = 'color';
        var hasItem = await inv.fetchItem(message.author.id, itemName)
        if (hasItem.pID) return message.reply('You already own this item')
        var output = await eco.FetchBalance(message.author.id)
        if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
        var profile = await eco.SubtractFromBalance(message.author.id, 1)
        var itemInv = await inv.addItem(message.author.id, itemType, itemName)
        message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
      break;
      case '3':
      case 'cobalt':
        var price = 7040;
        var itemName = 'cobalt';
        var itemType = 'color';
        var hasItem = await inv.fetchItem(message.author.id, itemName)
        if (hasItem.pID) return message.reply('You already own this item')
        var output = await eco.FetchBalance(message.author.id)
        if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
        var profile = await eco.SubtractFromBalance(message.author.id, 1)
        var itemInv = await inv.addItem(message.author.id, itemType, itemName)
        message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
      break;
      case '4':
      case 'purple':
        var price = 6000;
        var itemName = 'purple';
        var itemType = 'color';
        var hasItem = await inv.fetchItem(message.author.id, itemName)
        if (hasItem.pID) return message.reply('You already own this item')
        var output = await eco.FetchBalance(message.author.id)
        if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
        var profile = await eco.SubtractFromBalance(message.author.id, 1)
        var itemInv = await inv.addItem(message.author.id, itemType, itemName)
        message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
      break;
      case '5':
      case 'tw':
      case 'titanium white':
        var price = 5360;
        var itemName = 'titanium white';
        var itemType = 'color';
        var hasItem = await inv.fetchItem(message.author.id, itemName)
        if (hasItem.pID) return message.reply('You already own this item')
        var output = await eco.FetchBalance(message.author.id)
        if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
        var profile = await eco.SubtractFromBalance(message.author.id, 1)
        var itemInv = await inv.addItem(message.author.id, itemType, itemName)
        message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
      break;
      case '6':
      case 'black':
        var price = 5360;
        var itemName = 'black';
        var itemType = 'color';
        var hasItem = await inv.fetchItem(message.author.id, itemName)
        if (hasItem.pID) return message.reply('You already own this item')
        var output = await eco.FetchBalance(message.author.id)
        if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
        var profile = await eco.SubtractFromBalance(message.author.id, 1)
        var itemInv = await inv.addItem(message.author.id, itemType, itemName)
        message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
      break;
      case '7':
      case 'forest green':
        var price = 5200;
        var itemName = 'forest green';
        var itemType = 'color';
        var hasItem = await inv.fetchItem(message.author.id, itemName)
        if (hasItem.pID) return message.reply('You already own this item')
        var output = await eco.FetchBalance(message.author.id)
        if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
        var profile = await eco.SubtractFromBalance(message.author.id, 1)
        var itemInv = await inv.addItem(message.author.id, itemType, itemName)
        message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
      break;
      case '8':
      case 'lime':
        var price = 4320;
        var itemName = 'lime';
        var itemType = 'color';
        var hasItem = await inv.fetchItem(message.author.id, itemName)
        if (hasItem.pID) return message.reply('You already own this item')
        var output = await eco.FetchBalance(message.author.id)
        if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
        var profile = await eco.SubtractFromBalance(message.author.id, 1)
        var itemInv = await inv.addItem(message.author.id, itemType, itemName)
        message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
      break;
      case '9':
      case 'orange':
        var price = 4320;
        var itemName = 'orange';
        var itemType = 'color';
        var hasItem = await inv.fetchItem(message.author.id, itemName)
        if (hasItem.pID) return message.reply('You already own this item')
        var output = await eco.FetchBalance(message.author.id)
        if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
        var profile = await eco.SubtractFromBalance(message.author.id, 1)
        var itemInv = await inv.addItem(message.author.id, itemType, itemName)
        message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
      break;
      case '10':
      case 'saffron':
        var price = 4000;
        var itemName = 'saffron';
        var itemType = 'color';
        var hasItem = await inv.fetchItem(message.author.id, itemName)
        if (hasItem.pID) return message.reply('You already own this item')
        var output = await eco.FetchBalance(message.author.id)
        if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
        var profile = await eco.SubtractFromBalance(message.author.id, 1)
        var itemInv = await inv.addItem(message.author.id, itemType, itemName)
        message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
      break;
      case '11':
      case 'grey':
        var price = 1200;
        var itemName = 'grey';
        var itemType = 'color';
        var hasItem = await inv.fetchItem(message.author.id, itemName)
        if (hasItem.pID) return message.reply('You already own this item')
        var output = await eco.FetchBalance(message.author.id)
        if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
        var profile = await eco.SubtractFromBalance(message.author.id, 1)
        var itemInv = await inv.addItem(message.author.id, itemType, itemName)
        message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
      break;
      case '12':
      case 'pink':
        var price = 960;
        var itemName = 'pink';
        var itemType = 'color';
        var hasItem = await inv.fetchItem(message.author.id, itemName)
        if (hasItem.pID) return message.reply('You already own this item')
        var output = await eco.FetchBalance(message.author.id)
        if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
        var profile = await eco.SubtractFromBalance(message.author.id, 1)
        var itemInv = await inv.addItem(message.author.id, itemType, itemName)
        message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
      break;
      case '13':
      case 'burnt sienna':
        var price = 800;
        var itemName = 'burnt sienna';
        var itemType = 'color';
        var hasItem = await inv.fetchItem(message.author.id, itemName)
        if (hasItem.pID) return message.reply('You already own this item')
        var output = await eco.FetchBalance(message.author.id)
        if (!(output.balance >= price)) return message.reply('You do not own enough blanks')
        var profile = await eco.SubtractFromBalance(message.author.id, 1)
        var itemInv = await inv.addItem(message.author.id, itemType, itemName)
        message.reply(`Successfully purchased ${itemInv.name}! You now own ${profile.newbalance} blanks.`);
      break;
      default:
        message.channel.send({embed: {
          color: 0x7a19a8,
          title: 'Paper Shop',
          description: 'do p.shop [itemnumber/itemname] to buy an item using blanks',
          fields: [
            {name: 'Color Roles',
            value: `1. crimson - 9600
                    2. sky blue - 7360
                    3. cobalt - 7040
                    4. purple - 6000
                    5. titanium white - 5360
                    6. black - 5360
                    7. forest green - 5200
                    8. lime - 4320
                    9. orange - 4320
                    10. saffron - 4000
                    11. grey - 1200
                    12. pink - 960
                    13. burnt sienna - 800
                    `}
          ]
        }
        })
      break;
    }
  }
}
