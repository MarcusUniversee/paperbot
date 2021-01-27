const Discord = require('discord.js')
const bet = require('betting')
const eco = require('discord-economy');

module.exports = {
  name: 'stopbet',
  description: 'Stops a bet',
  usage: 'stopbet [betID]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' stopbet');
    if (!params[0]) return message.reply('Error: No bet id specified')
    var output = await bet.fetchBetPlayers(params[0])
    var betPool = await bet.fetchBet(params[0])

    for (var i=0;i<output.length;i++) {//iterates through all players who have bet on the betID
      eco.AddToBalance(output[i].dataValues.pID, output[i].dataValues.balance)
      message.channel.send(`<@${output[i].dataValues.pID}>, you have gained back ${output[i].dataValues.balance} blanks from a stopped bet!`)
    }

    message.channel.send({embed: {
    color: 0x7a19a8,
    title: 'Bet Stopped!',
    fields: [
      {
        name: 'Details:',
        value: `id: **${betPool.bID}**\n1: ${betPool.desc1}\n2: ${betPool.desc2}`,
      },
    ],
    }})

    for (var i=0;i<output.length;i++) {//iterates through all players who have bet on the betID
      bet.removePlayerBet(output[i].dataValues.pID, params[0]) //destroys the player bets
    }
    bet.removeBet(params[0]);

  }
}
