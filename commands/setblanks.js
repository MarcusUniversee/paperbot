const Discord = require('discord.js')
const eco = require('discord-economy');

module.exports = {
  name: 'setblanks',
  description: 'Sets a mentioned user\'s balance',
  usage: 'setblanks [user] [amount]',

  async run (client, message, params) {
    console.log(message.author.tag + ' setblanks');
    if(message.member.hasPermission('ADMINISTRATOR')) {
      if (!message.mentions.users.first()) return message.reply('Error: No user mentioned')
      if (!params[1]) return message.reply('Error: No blank amount specified')
      var profile = await eco.SetBalance(message.mentions.users.first().id, params[1])
      message.reply(`${message.mentions.users.first().tag} now owns ${profile.balance} blanks.`);
      return;
    } else {
      message.reply("no")
    }
  }
}
