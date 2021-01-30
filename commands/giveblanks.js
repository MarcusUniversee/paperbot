const Discord = require('discord.js')
const eco = require('discord-economy');

module.exports = {
  name: 'giveblanks',
  description: 'Sends blanks from you to a mentioned user',
  usage: 'giveblanks [user], [amount]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' give');
    if (!message.mentions.users.first()) return message.reply('Error: No user mentioned')
    if (!paramsCom[1]) return message.reply('Error: No blank amount specified')
    if (!parseInt(paramsCom[1])) return message.reply('Amount is not a number')
    if (parseInt(paramsCom[1]) < '1') return message.reply('Amount specified is too low')
    if (message.mentions.users.first().id === message.author.id) return message.reply('You cannot give blanks to yourself')
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < params[1]) return message.reply('You do not have enough blanks!')

    var transfer = await eco.Transfer(message.author.id, message.mentions.users.first().id, paramsCom[1])
    message.reply(`Sent successfully!\n${message.author.tag} now owns ${transfer.FromUser} blanks\n${message.mentions.users.first().tag} now owns ${transfer.ToUser} blanks`);
    return;
  }
}
