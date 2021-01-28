const Discord = require('discord.js')
const eco = require('discord-economy');

module.exports = {
  name: 'addblanks',
  description: 'Adds blanks to a mentioned user\'s balance',
  usage: 'addblanks [user], [amount]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' addblanks');
    if(message.member.hasPermission('ADMINISTRATOR')) {
      if (!message.mentions.users.first()) return message.reply('Error: No user mentioned')
      if (!paramsCom[1]) return message.reply('Error: No blank amount specified')
      if (!parseInt(paramsCom[1])) return message.reply('Error: Blank amount has to be a number')
      var profile = await eco.AddToBalance(message.mentions.users.first().id, paramsCom[1])
      message.reply(`${message.mentions.users.first().tag} now owns ${profile.newbalance} blanks.`);
      return;
    } else {
      message.reply("no")
    }
  }
}
