const Discord = require('discord.js')
const bet = require('betting')

module.exports = {
  name: 'bets',
  description: 'Returns a list of bets',
  expectedArgs: '',
  category: 'Betting',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' bets');
    var output = await bet.fetchBetList();
    var betList = [];
    for (var i=0; i<output.length; i++) {
      if (output[i].dataValues.closed === 1) {
        betList.push('[CLOSED]')
      }
      betList.push('id:')
      betList.push(output[i].dataValues.id)
      betList.push('| 1:')
      betList.push(output[i].dataValues.desc1)
      betList.push('| 2:')
      betList.push(output[i].dataValues.desc2)
      betList.push('| Pool:')
      betList.push(output[i].dataValues.balance)
      betList.push('| Minimum Bet:')
      betList.push(output[i].dataValues.startBal)
      betList.push('\n\n')
    }

    var bets = betList.join(" ");
    message.channel.send({embed: {
    color: 0x7a19a8,
    title: 'Bet List',
    description: bets,
    }})
  },
  permissions: [],
  requiredRoles: [],
}
