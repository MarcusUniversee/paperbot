const Discord = require('discord.js')
const challenge = require('challenges')
const dailyStats = require('dailystats')
const challengeList = require('../getJSON/challenges.json')
const stats = require('../commands/stat-check.js')
const eco = require('discord-economy');

module.exports = {
  name: 'reroll',
  description: 'Shortcut for p.challenges reroll',
  expectedArgs: '',
  category: '',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' reroll')
    if (message.channel.id === '806390129022730240') return message.reply('This command does not work in this channel')
    var pChallenges = await challenge.fetchAllChallenges(message.author.id)
    //only daily challenges for now

    message.reply('Rerolling costs 20 blanks. This will also reset progress on any active challenges. Confirm by typing yes')
    const filter = m => m.author.id === message.author.id

    const respond = message.channel.createMessageCollector(filter, { time: 30000 });

    respond.on('collect', async m => {
      var confirmation = m.content.toLowerCase()
      if (confirmation === 'yes') {
        await challenge.resetAllChallenges(message.author.id)
        await eco.SubtractFromBalance(message.author.id, 20)
        var reset = dailyStats.resetAllStat(message.author.id)
        var num1 = Math.floor(Math.random()*challengeList.length) + 1
        var num2 = Math.floor(Math.random()*challengeList.length) + 1
        var num3 = Math.floor(Math.random()*challengeList.length) + 1
        while (
          (
            (
              challengeList[num1-1].category === challengeList[num2-1].category
            ) || (
              challengeList[num1-1].category === challengeList[num3-1].category
            ) || (
              challengeList[num2-1].category === challengeList[num3-1].category
            )
          ) || (
            !(
              (challengeList[num1-1].difficulty === 'hard') || (challengeList[num1-1].difficulty === 'very hard')
            ) && !(
              (challengeList[num2-1].difficulty === 'hard') || (challengeList[num2-1].difficulty === 'very hard')
            ) && !(
              (challengeList[num3-1].difficulty === 'hard') || (challengeList[num3-1].difficulty === 'very hard')
            )
          )
        ) {
          var num1 = Math.floor(Math.random()*challengeList.length) + 1
          var num2 = Math.floor(Math.random()*challengeList.length) + 1
          var num3 = Math.floor(Math.random()*challengeList.length) + 1
        }
        var dChallenge1 = await challenge.addChallenge(message.author.id, num1, challengeList[num1-1].category)
        var dChallenge2 = await challenge.addChallenge(message.author.id, num2, challengeList[num2-1].category)
        var dChallenge3 = await challenge.addChallenge(message.author.id, num3, challengeList[num3-1].category)
        message.reply('challenges rerolled! check p.challenges to view your challenges')
        respond.stop()
        return;
      } else {
        respond.stop()
        return;
      }
    })

  },
  permissions: [],
  requiredRoles: [],
}
