const Discord = require('discord.js')
const eco = require('discord-economy');

module.exports = {
  name: 'addblanks',
  description: 'Adds blanks to a mentioned user\'s balance',

  async run (client, message, params) {
    console.log(message.author.tag + ' addblanks');
    if(message.member.hasPermission('ADMINISTRATOR')) {
      var profile = await eco.AddToBalance(message.mentions.users.first().id, params[1])
      message.reply(`${message.mentions.users.first().tag} now own ${profile.newbalance} blanks.`);
      return;
    } else {
      message.reply("no")
    }
  }
}
