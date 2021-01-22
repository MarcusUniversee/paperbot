const Discord = require('discord.js')
const eco = require('discord-economy');

module.exports = {
  name: 'takeblanks',
  description: 'Subtracts from a mentioned user\'s balance',
  usage: 'p!takeblanks [user] [amount]',

  async run (client, message, params) {
    console.log(message.author.tag + ' takeblanks');
    if(message.member.hasPermission('ADMINISTRATOR')) {
      if (!message.mentions.users.first()) return message.reply('Error: No user mentioned')
      if (!params[1]) return message.reply('Error: No blank amount specified')
      var profile = await eco.SubtractFromBalance(message.mentions.users.first().id, params[1])
      message.reply(`${message.mentions.users.first().tag} now own ${profile.newbalance} blanks.`);
      return;
    } else {
      message.reply("no")
    }
  }
}
