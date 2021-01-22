const Discord = require('discord.js')
const eco = require('discord-economy');

module.exports = {
  name: 'bal',
  description: 'Replies with you or a mentioned user\'s balance',
  usage: 'p!bal [user(optional)]',

  async run (client, message, params) {
    console.log(message.author.tag + ' bal');
    if(!params[0]) {
      var output = await eco.FetchBalance(message.author.id)
      message.channel.send(`Hey ${message.author.tag}! You own ${output.balance} blanks.`);
      return;
    };
    var output = await eco.FetchBalance(message.mentions.users.first().id)
    message.channel.send(`${message.mentions.users.first().tag} owns ${output.balance} blanks.`);

    return;
  }
}
