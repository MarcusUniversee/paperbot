const Discord = require('discord.js')
const bet = require('betting')
const eco = require('discord-economy');
module.exports = {
  name: 'addtobet',
  description: 'Adds to a bet',
  usage: 'addtobet [betID], [betAmount]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' addtobet');
    if (!paramsCom[0]) return message.reply('Error: No betID amount specified')
    if (!paramsCom[1]) return message.reply('Error: No bet amount specified')

    var betted = await bet.fetchPlayerBet(message.author.id, paramsCom[0])
    if (!betted.bID) {
      return message.reply("Error: No betID exists or user has already bet")
    }
    var output = await bet.addToPlayerBet(paramsCom[0], message.author.id, paramsCom[1])


    var profile = await eco.SubtractFromBalance(message.author.id, paramsCom[1])
    message.channel.send({embed: {
    color: 0x7a19a8,
    title: 'Bet Placed!',
    fields: [
      {
        name: 'Details:',
        value: `id: **${output.bID}**\nAmount: ${output.bAmount}\nTotal Amount Bet: ${output.newbAmount}\nCurrent pool: ${output.newbalance}`,
      },
    ],
    }})
  }
}
