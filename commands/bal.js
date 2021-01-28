const Discord = require('discord.js')
const eco = require('discord-economy');

module.exports = {
  name: 'bal',
  description: 'Replies with you or a mentioned user\'s balance',
  usage: 'bal [user(optional)]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' bal');
    if(!params[0]) {
      var output = await eco.FetchBalance(message.author.id)
      message.reply(`You own ${output.balance} blanks.`);
      return;
    } else if (!message.mentions.users.first()) {
      var output = await eco.FetchBalance(message.author.id)
      message.reply(`You own ${output.balance} blanks.`);
      return;
    }
    var output = await eco.FetchBalance(message.mentions.users.first().id)
    message.reply(`${message.mentions.users.first().tag} owns ${output.balance} blanks.`);

    return;
  }
}
