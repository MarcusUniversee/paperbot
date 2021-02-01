const Discord = require('discord.js')
const bet = require('betting')

module.exports = {
  name: 'bethistory',
  description: 'Returns a list of ended bets',
  expectedArgs: '',
  category: 'Betting',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' bethistory');
    var output = await bet.fetchArchBetList();
    var betList = [];
    for (var i=0; i<output.length; i++) {
      betList.push('id:')
      betList.push(output[i].dataValues.bID)
      betList.push('| 1:')
      betList.push(output[i].dataValues.desc1)
      betList.push('| 2:')
      betList.push(output[i].dataValues.desc2)
      betList.push('| Pool:')
      betList.push(output[i].dataValues.balance)
      betList.push('| Winning Side:')
      betList.push(output[i].dataValues.bSide)
      betList.push('\n\n')
    }

    var bets = betList.join(" ");
    message.channel.send({embed: {
    color: 0x7a19a8,
    title: 'Bet History',
    description: bets,
    }})
  },
}
