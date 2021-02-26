const Discord = require('discord.js')
const eco = require('discord-economy')
const leveling = require('discord-leveling')
const inv = require('inventory')
const prof = require('profile')

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

    var profile = await prof.fetchProfile(user.id)

    for (var i=0; i<profile.badgeLimit; i++) {
      if (pInv[i].dataValues.equip === 1) {
        if (pInv[i].dataValues.type == 'badge') {
          invList.push(pInv[i].dataValues.name)
          invList.push('\n')
        }
      }
    }
    if (!invList[0]) invList.push('None')
    var badges = invList.join(" ") //this will later be invlist[0] OR multiple badges if they bought the customization
    var smallpfp = ''
    var medpfp = ''
    var largepfp = ''
    var xlargepfp = ''
    if (profile.smallpfp) smallpfp = user.avatarURL() || '';
    if (profile.medpfp) medpfp = user.avatarURL() || '';
    if (profile.largepfp) largepfp = user.avatarURL() || '';
    if (profile.xlargepfp) xlargepfp = user.avatarURL() || '';

    if (!profile.embed) {

      return message.reply(
        `
        **${user.tag}\'s profile**
        Badges: ${badges}
        Rank: ${rankOutput.level}
        Balance: ${balOutput.balance}`
      )
    }
    message.channel.send({embed: {
      color: 0x7a19a8,
      title: `${user.tag}\'s profile`,
      author: {
        name: profile.authorName,
        icon_url: medpfp,
        url: '',
      },
      thumbnail: {
        url: largepfp,
      },
      fields: [
        {
          name: 'Badges',
          value: badges,
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
      image: {
    		url: xlargepfp,
    	},
      footer: {
        text: user.tag,
    		icon_url: smallpfp,
    	},
    }});
  },
  permissions: [],
  requiredRoles: [],
}
