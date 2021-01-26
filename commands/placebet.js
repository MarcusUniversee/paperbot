const Discord = require('discord.js')
const bet = require('betting')
const eco = require('discord-economy');
module.exports = {
  name: 'placebet',
  description: 'Places a bet',
  usage: 'placebet [betID], [betSide], [betAmount]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' placebet');
    if (!paramsCom[0]) return message.reply('Error: No betID amount specified')
    if (!paramsCom[1]) return message.reply('Error: No side on bet chosen')
    if (!paramsCom[1] === '1' || !paramsCom[1] === '2') return message.reply('Error: Bet side must be 1 or 2')
    if (!paramsCom[2]) return message.reply('Error: No bet amount specified')
    var output = await bet.addPlayerBet(paramsCom[0], message.author.id, paramsCom[1], paramsCom[2])
    if (!output.bID) {
      message.reply("Error: No betID exists or user has already bet")
    }

    var profile = await eco.SubtractFromBalance(message.author.id, paramsCom[2])
    message.channel.send({embed: {
    color: 0x7a19a8,
    title: 'Bet Placed!',
    fields: [
      {
        name: 'Details:',
        value: `id: **${output.bID}**\nAmount: ${output.bAmount}\nCurrent pool: ${output.newbalance}`,
      },
    ],
    }})
  }
}
