const Discord = require('discord.js')

module.exports = {
  name: 'ping',
  description: 'Replies with ping',
  usage: 'p!ping',

  async run (client, message, params) {
    console.log(message.author.tag + ' pong')
    message.reply('pong!!')
  }
}
