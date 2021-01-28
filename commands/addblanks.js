const Discord = require('discord.js')
const eco = require('discord-economy');
//Provides the description for p.addblanks
module.exports = {
  name: 'addblanks',
  description: 'Adds blanks to a mentioned user\'s balance',
  usage: 'addblanks [user], [amount]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' addblanks');
    //Only happens if person running command has admin
    if(message.member.hasPermission('ADMINISTRATOR')) {
      //Error if no user is mentioned
      if (!message.mentions.users.first()) return message.reply('Error: No user mentioned')
      //Error if no blank amount is specified
      if (!paramsCom[1]) return message.reply('Error: No blank amount specified')
      //Error if blank amount is not a number
      if (!parseInt(paramsCom[1])) return message.reply('Error: Blank amount has to be a number')
      //Adds blanks to a person's balance
      var profile = await eco.AddToBalance(message.mentions.users.first().id, paramsCom[1])
      message.reply(`${message.mentions.users.first().tag} now owns ${profile.newbalance} blanks.`);
      return;
    } else {
      //If person running command does not have admin
      message.reply("no")
    }
  }
}
