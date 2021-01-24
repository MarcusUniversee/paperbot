const Discord = require('discord.js')
const leveling = require('discord-leveling');
module.exports = {
  name: 'rank',
  description: 'Replies with you or a mentioned user\'s rank',
  usage: 'rank [user(optional)]',

  async run (client, message, params) {
    console.log(message.author.tag + ' rank')
    var user = message.mentions.users.first() || message.author

    var output = await leveling.Fetch(user.id)
    if (message.mentions.users.first()) return message.reply(`${message.mentions.users.first().tag} is level ${output.level}!`);
    message.reply(`You are level ${output.level}!`);
  }
}
