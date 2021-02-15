const Discord = require('discord.js')
const eco = require('discord-economy')
const leveling = require('discord-leveling')
const inv = require('inventory')


module.exports = {
  name: 'profile',
  description: 'Replies with you or a user\'s profile, showing ranks, balance, and badges',
  expectedArgs: '[user(optional)]',
  category: '',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' profile')

    var user = message.mentions.users.first() || message.author
    var balOutput = await eco.FetchBalance(user.id)
    var rankOutput = await leveling.Fetch(user.id)
    var pInv = await inv.fetchInv(user.id)
    var invList = [];

    for (var i=0; i<pInv.length; i++) {
      if (pInv[i].dataValues.equip === 1) {
        if (pInv[i].dataValues.type == 'badge') {
          invList.push(pInv[i].dataValues.name)
          invList.push('\n')
        }
      }
    }
    if (!invList[0]) invList.push('None')
    var inventory = invList.join(" ");

    message.channel.send({embed: {
      color: 0x7a19a8,
      title: `${user.tag}\'s profile`,
      author: {
        name: '',
        icon_url: '',
        url: '',
      },
      thumbnail: {
        url: user.avatarURL(),
      },
      fields: [
        {
          name: 'Badges',
          value: inventory,
        },
        {
          name: 'Rank',
          value: `${rankOutput.level}`,
          inline: true,
        },
        {
          name: 'Balance',
          value: `${balOutput.balance}`,
          inline: true,
        },
      ],
    }});
  },
  permissions: [],
  requiredRoles: [],
}
