const Discord = require('discord.js')
const leveling = require('discord-leveling');
const eco = require('discord-economy');
module.exports = {
  name: 'addxp',
  description: 'Adds xp to a mentioned user',
  expectedArgs: '[user], [amount]',
  category: '',
  permissionError: 'no',
  minArgs: 2,
  maxArgs: 2,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' addxp')
    if (!message.mentions.users.first()) return message.reply('User not mentioned')
    if (!parseInt(paramsCom[1])) return message.reply('Amount needs to be a number!')
    var profile = await leveling.Fetch(message.mentions.users.first().id)
    //If user xp higher than 100 add level
    var maxXp = ((profile.level*10)-(profile.level*2)) + 1;
    var xp = parseInt(paramsCom[1])
    while (xp > 0) {
      profile = await leveling.Fetch(message.author.id)
      var curXp = profile.xp
      console.log("current xp: " + curXp)
      xp = xp + curXp
      console.log("total xp: " + xp)
      maxXp = ((profile.level*10)-(profile.level*2)) + 1;
      console.log("max xp: " + maxXp)
      if (xp > maxXp) {
        var money = 5 + Math.floor(profile.level/5)
        await leveling.AddLevel(message.author.id, 1)
        await leveling.SetXp(message.author.id, 0)
        var profileBal = await eco.AddToBalance(message.mentions.users.first().id, money)
        message.reply(`${message.author.tag} just leveled up!! They are now level ${profile.level + 1} and they have earned ${money} blanks`)
        xp = xp - maxXp
      } else {
        leveling.AddXp(message.author.id, xp)
        xp = 0;
        break;
      }
    }
    message.reply(`Successfully added ${paramsCom[1]} xp to ${message.mentions.users.first().tag}`)
    return;
  },
  permissions: 'ADMINISTRATOR',
  requiredRoles: [],
}
