const Discord = require('discord.js')
const bet = require('betting')
const eco = require('discord-economy');
module.exports = {
  name: 'closebet',
  description: 'Closes a bet',
  usage: 'closebet [betID]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' placebet');
    if (!params[0]) return message.reply('Error: No betID amount specified')
    if (!parseInt(paramsCom[0])) return message.reply('BetID needs to be a number!')

    var betted = await bet.fetchBet(params[0])
    if (betted.close === 1) return message.reply('Error: Bet is already closed')

    var output = await bet.closeBet(params[0])

    message.channel.send({embed: {
    color: 0x7a19a8,
    title: 'Bet Closed!',
    fields: [
      {
        name: 'Details:',
        value: `id: **${output.bID}**\nCurrent pool: ${output.newbalance}`,
      },
    ],
    }})
  }
}
