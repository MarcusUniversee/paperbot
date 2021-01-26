const Discord = require('discord.js')
const bet = require('betting')

module.exports = {
  name: 'startbet',
  description: 'Starts a new bet',
  usage: 'startbet [startingBalance], [description1], [description2]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' startbet');
    if (!paramsCom[1]) return message.reply('Error: Side 1 has no description')
    if (!paramsCom[2]) return message.reply('Error: Side 2 has no description')
    if (!paramsCom[0]) return message.reply('Error: No starting balance given')
    var output = await bet.createBet(paramsCom[1], paramsCom[2], paramsCom[0])
    message.channel.send({embed: {
    color: 0x7a19a8,
    title: 'Bet Created!',
    fields: [
      {
        name: 'Details:',
        value: `id: **${output.bID}**\n1: ${output.desc1}\n2: ${output.desc2}\nMinimum bet: ${output.sBal}`,
      },
      {
        name: 'Betting',
        value: `p.placebet [betID], 1, [amount] to bet on ${output.desc1}\np.placebet [betID], 2, [amount] to bet on ${output.desc2}`,
      },
    ],
    }})
  }
}
