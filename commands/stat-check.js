const challenge = require('challenges')
const dailyStats = require('dailystats')
const challengeList = require('../getJSON/challenges.json')
const leveling = require('discord-leveling');
const eco = require('discord-economy');
const inv = require('inventory')

module.exports = {

  statCheck: async function (playerID, message) {
    //check for every stat and compare to challenges
    var pChallenges = await challenge.fetchChallenges(playerID)
    if (pChallenges[0]) {
      for (var i=0; i<pChallenges.length; i++) {

        if (pChallenges[i].dataValues.category === 'messagecount') {
          var cID = pChallenges[i].dataValues.cID
          var count = await dailyStats.fetchStat(playerID, 'messagecount')
          if (challengeList[cID-1].value <= count.value) {
            await challenge.updateChallenge(playerID, cID, 'inactive')
            message.reply('Challenge complete: ' + challengeList[cID-1].title)
            var difficulty = challengeList[cID-1].difficulty
            if (pChallenges[1]) {
              return this.chalReward(playerID, difficulty, message)
            } else {
              this.chalReward(playerID, 'bonus', message)
              return this.chalReward(playerID, difficulty, message)
            }
          }
        }

        if (pChallenges[i].dataValues.category === 'tradecrate') {
          var cID = pChallenges[i].dataValues.cID
          var count = await dailyStats.fetchStat(playerID, 'tradecrate')
          if (challengeList[cID-1].value <= count.value) {
            await challenge.updateChallenge(playerID, cID, 'inactive')
            message.reply('Challenge complete: ' + challengeList[cID-1].title)
            var difficulty = challengeList[cID-1].difficulty
            if (pChallenges[1]) {
              return this.chalReward(playerID, difficulty, message)
            } else {
              this.chalReward(playerID, 'bonus', message)
              return this.chalReward(playerID, difficulty, message)
            }
          }
        }

        if (pChallenges[i].dataValues.category === 'blankcount') {
          var cID = pChallenges[i].dataValues.cID
          var count = await dailyStats.fetchStat(playerID, 'blankcount')
          if (challengeList[cID-1].value <= count.value) {
            await challenge.updateChallenge(playerID, cID, 'inactive')
            message.reply('Challenge complete: ' + challengeList[cID-1].title)
            var difficulty = challengeList[cID-1].difficulty
            if (pChallenges[1]) {
              return this.chalReward(playerID, difficulty, message)
            } else {
              this.chalReward(playerID, 'bonus', message)
              return this.chalReward(playerID, difficulty, message)
            }
          }
        }

        if (pChallenges[i].dataValues.category === 'opencrate') {
          var cID = pChallenges[i].dataValues.cID
          var count = await dailyStats.fetchStat(playerID, 'opencrate')
          if (challengeList[cID-1].value <= count.value) {
            await challenge.updateChallenge(playerID, cID, 'inactive')
            message.reply('Challenge complete: ' + challengeList[cID-1].title)
            var difficulty = challengeList[cID-1].difficulty
            if (pChallenges[1]) {
              return this.chalReward(playerID, difficulty, message)
            } else {
              this.chalReward(playerID, 'bonus', message)
              return this.chalReward(playerID, difficulty, message)
            }
          }
        }

        if (pChallenges[i].dataValues.category === 'findcrate') {
          var cID = pChallenges[i].dataValues.cID
          var count = await dailyStats.fetchStat(playerID, 'findcrate')
          if (challengeList[cID-1].value <= count.value) {
            await challenge.updateChallenge(playerID, cID, 'inactive')
            message.reply('Challenge complete: ' + challengeList[cID-1].title)
            var difficulty = challengeList[cID-1].difficulty
            if (pChallenges[1]) {
              return this.chalReward(playerID, difficulty, message)
            } else {
              this.chalReward(playerID, 'bonus', message)
              return this.chalReward(playerID, difficulty, message)
            }
          }
        }

      }
    } else {
      return;
    }
  },

  chalCheck: async function (playerID) {
    //check for challenge expiration
    var eChallenges = await challenge.fetchAllChallenges(playerID)
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear().toString().substr(2);
    var preDate = yyyy + '-' + mm + '-' + dd
    var date = preDate.replace(/0/g, '')
    if (eChallenges[0]) {
      var dataDate = eChallenges[0].dataValues.date.substr(2, 8).replace(/0/g, '')
      if (dataDate != date) {
        await challenge.resetAllChallenges(playerID)
      }
    }
  },

  chalReward: async function (playerID, difficulty, message) {
    var profile = await leveling.Fetch(playerID)
    if (profile.level >= 120) {
      var maxXp = 550
    } else {
      var maxXp = Math.floor((40*(Math.log(profile.level + 1))) + (3*profile.level)) + 1; //y=40ln(x+1)+3x+1
    }

    var curXp = profile.xp
    switch (difficulty) {
      case 'very easy':
        var xpReward = 10
        var totalXp = curXp+xpReward
        if (totalXp > maxXp) {
          await leveling.AddLevel(playerID, 1)
          await leveling.SetXp(playerID, totalXp-maxXp)
          var money = 1 + Math.floor(profile.level/5)
          var itemType = 'crate'
          var itemName = 'rank crate'
          var itemInv = await inv.addItem(message.author.id, itemType, itemName)
          var profileBal = await eco.AddToBalance(message.author.id, money)
          await dailyStats.updateStat(message.author.id, 'blankcount', money)
          message.reply(`You just ranked up!! You are now rank ${profile.level + 1} and you have earned ${money} blanks and a rank crate!`)
        } else {
          await leveling.AddXp(playerID, xpReward)
        }
        message.reply(`You have earned ${xpReward} xp!`);
      break;
      case 'easy':
        var xpReward = 20
        var totalXp = curXp+xpReward
        if (totalXp > maxXp) {
          await leveling.AddLevel(playerID, 1)
          await leveling.SetXp(playerID, totalXp-maxXp)
          var money = 1 + Math.floor(profile.level/5)
          var itemType = 'crate'
          var itemName = 'rank crate'
          var itemInv = await inv.addItem(message.author.id, itemType, itemName)
          var profileBal = await eco.AddToBalance(message.author.id, money)
          await dailyStats.updateStat(message.author.id, 'blankcount', money)
          message.reply(`You just ranked up!! You are now rank ${profile.level + 1} and you have earned ${money} blanks and a rank crate!`)
        } else {
          await leveling.AddXp(playerID, xpReward)
        }
        message.reply(`You have earned ${xpReward} xp!`);
      break;
      case 'medium':
        var xpReward = 40
        var totalXp = curXp+xpReward
        if (totalXp > maxXp) {
          await leveling.AddLevel(playerID, 1)
          await leveling.SetXp(playerID, totalXp-maxXp)
          var money = 1 + Math.floor(profile.level/5)
          var itemType = 'crate'
          var itemName = 'rank crate'
          var itemInv = await inv.addItem(message.author.id, itemType, itemName)
          var profileBal = await eco.AddToBalance(message.author.id, money)
          await dailyStats.updateStat(message.author.id, 'blankcount', money)
          message.reply(`You just ranked up!! You are now rank ${profile.level + 1} and you have earned ${money} blanks and a rank crate!`)
        } else {
          await leveling.AddXp(playerID, xpReward)
        }
        message.reply(`You have earned ${xpReward} xp!`);
      break;
      case 'hard':
        var xpReward = 60
        var totalXp = curXp+xpReward
        if (totalXp > maxXp) {
          await leveling.AddLevel(playerID, 1)
          await leveling.SetXp(playerID, totalXp-maxXp)
          var money = 1 + Math.floor(profile.level/5)
          var itemType = 'crate'
          var itemName = 'rank crate'
          var itemInv = await inv.addItem(message.author.id, itemType, itemName)
          var profileBal = await eco.AddToBalance(message.author.id, money)
          await dailyStats.updateStat(message.author.id, 'blankcount', money)
          message.reply(`You just ranked up!! You are now rank ${profile.level + 1} and you have earned ${money} blanks and a rank crate!`)
        } else {
          await leveling.AddXp(playerID, xpReward)
        }
        message.reply(`You have earned ${xpReward} xp and ${blankReward} blanks!`);
      break;
      case 'very hard':
        var xpReward = 80
        var totalXp = curXp+xpReward
        if (totalXp > maxXp) {
          await leveling.AddLevel(playerID, 1)
          await leveling.SetXp(playerID, totalXp-maxXp)
          var money = 1 + Math.floor(profile.level/5)
          var itemType = 'crate'
          var itemName = 'rank crate'
          var itemInv = await inv.addItem(message.author.id, itemType, itemName)
          var profileBal = await eco.AddToBalance(message.author.id, money)
          await dailyStats.updateStat(message.author.id, 'blankcount', money)
          message.reply(`You just ranked up!! You are now rank ${profile.level + 1} and you have earned ${money} blanks and a rank crate!`)
        } else {
          await leveling.AddXp(playerID, xpReward)
        }
        message.reply(`You have earned ${xpReward} xp and ${blankReward} blanks!`);
      break;
      case 'bonus':
        var itemType = 'crate'
        var itemName = 'challenge crate 1'
        var quantity = 1
        var itemInv = await inv.addItem(playerID, itemType, itemName, quantity)
        message.reply(`All challenges complete! You have won challenge crate`);
      break;
    }
  }


}
