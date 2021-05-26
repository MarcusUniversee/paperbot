const Discord = require('discord.js')
const inv = require('inventory');
const prof = require('profile')
const boost = require('../getJSON/boosts.json')
const fs = require('fs')
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
    if (item.equip === 1) return message.reply('This item is already equipped')
    var profile = await prof.fetchProfile(message.author.id)
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
        if (item.name.endsWith('pfp')) {
          if (profile.smallpfp === 1) {
            var ueItem = await inv.unequipItem(message.author.id, 'smallpfp')
          }
          if (profile.medpfp === 1) {
            var ueItem = await inv.unequipItem(message.author.id, 'medpfp')
          }
          if (profile.largepfp === 1) {
            var ueItem = await inv.unequipItem(message.author.id, 'largepfp')
          }
        }
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
      case 'pfpborder'://need to add new profile column called hasBorder and it will be boolean

        if (profile.hasBorder === 1) {
          return message.reply('You already have a border equipped')
        }

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
        var profUpdate = await prof.updateField(message.author.id, 'hasBorder', true)
      break;
      case 'serverboost':
        //check if server boost already exists in json
        var isBoost = false
        var activeBoost = false
        for (var i=0; i<boost.length;i++) {
          if (item.name === boost[i].name) {
            isBoost = true
            if (boost[i].status === '0') {
              activeBoost = true
              var iBoost = i
              break;
            }
          }
        }
        if (!isBoost) return message.reply('This boost does not exist')
        if (!activeBoost) return message.reply('Boost is already currently active')
        //change status to "1"
        boost[iBoost].status = "1"
        var today = new Date();
        var hour = today.getHours()
        var minute = today.getMinutes()
        var time = hour + ':' + minute
        boost[iBoost].time = time
        fs.writeFile("./paperbot/getJSON/boosts.json", JSON.stringify(boost), err => {
          if (err) throw err;
          console.log('done')
        })
        //remove boost from inventory
        message.channel.send({embed: {
          color: 0x7a19a8,
          title: 'Boost activated',
          fields: [
            {
              name: `${item.name}`,
              value: `type: ${item.type}`,
            },
          ],
        }})
        var eItem = await inv.removeItem(message.author.id, paramsCom[0]);
      break;
      default:
        message.channel.send('You cannot equip this item')
      break;
    }

  },
  permissions: [],
  requiredRoles: [],
}
