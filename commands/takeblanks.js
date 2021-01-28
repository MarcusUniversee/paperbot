const Discord = require('discord.js')
const eco = require('discord-economy');

module.exports = {
  name: 'takeblanks',
  description: 'Subtracts from a mentioned user\'s balance',
  usage: 'takeblanks [user], [amount]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' takeblanks');
    if(message.member.hasPermission('ADMINISTRATOR')) {
      if (!message.mentions.users.first()) return message.reply('Error: No user mentioned')
      if (!paramsCom[1]) return message.reply('Error: No blank amount specified')
      if (!parseInt(paramsCom[1])) return message.reply('Amount needs to be a number!')
      if (paramsCom[1] < '1') return message.reply('Amount specified is too low')
      var profile = await eco.SubtractFromBalance(message.mentions.users.first().id, paramsCom[1])
      message.reply(`${message.mentions.users.first().tag} now owns ${profile.newbalance} blanks.`);
      return;
    } else {
      message.reply("no")
    }
  }
}
