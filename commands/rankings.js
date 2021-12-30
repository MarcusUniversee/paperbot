const Discord = require('discord.js')
const leveling = require('discord-leveling');
const leveling2 = require('discord-leveling2');

module.exports = {
  name: 'rankings',
  description: 'Shows the top 5 highest level users',
  expectedArgs: '',
  category: '',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom, client) => {
    console.log(message.author.tag + ' rankings');
    if (paramsCom[0]) {
      if (paramsCom[0] == 'season') {
        var output = await leveling2.Leaderboard({
          search: message.author.id
        })
        leveling2.Leaderboard({
          limit: 5
        }).then(async users => {

          var authorLvl = await leveling2.Fetch(message.author.id)

          if (users[0]) {
            var firstplace = await client.users.fetch(users[0].userid)
            var firstlvl = users[0].level
          } else {
            var firstplace = 'Nobody Yet';
            var firstlvl = 'None';
          }
          if (users[1]) {
            var secondplace = await client.users.fetch(users[1].userid)
            var secondlvl = users[1].level
          } else {
            var secondplace = 'Nobody Yet';
            var secondlvl = 'None';
          }
          if (users[2]) {
            var thirdplace = await client.users.fetch(users[2].userid)
            var thirdlvl = users[2].level
          } else {
            var thirdplace = 'Nobody Yet';
            var thirdlvl = 'None';
          }
          if (users[3]) {
            var fourthplace = await client.users.fetch(users[3].userid)
            var fourthlvl = users[3].level
          } else {
            var fourthplace = 'Nobody Yet';
            var fourthlvl = 'None';
          }
          if (users[4]) {
            var fifthplace = await client.users.fetch(users[4].userid)
            var fifthlvl = users[4].level
          } else {
            var fifthplace = 'Nobody Yet';
            var fifthlvl = 'None';
          }

          message.channel.send({embed: {
          color: 0x7a19a8,
          title: 'Rank Leaderboard',
          description: `1. ${firstplace} - Rank ${firstlvl}
                        2. ${secondplace} - Rank ${secondlvl}
                        3. ${thirdplace} - Rank ${thirdlvl}
                        4. ${fourthplace} - Rank ${fourthlvl}
                        5. ${fifthplace} - Rank ${fifthlvl}

                        ${output}. ${message.author.tag} - Rank ${authorLvl.level}`,
          }})
        })
        return;
      }

    }
    var output = await leveling.Leaderboard({
      search: message.author.id
    })
    leveling.Leaderboard({
      limit: 5
    }).then(async users => {

      var authorLvl = await leveling.Fetch(message.author.id)

      if (users[0]) {
        var firstplace = await client.users.fetch(users[0].userid)
        var firstlvl = users[0].level
      } else {
        var firstplace = 'Nobody Yet';
        var firstlvl = 'None';
      }
      if (users[1]) {
        var secondplace = await client.users.fetch(users[1].userid)
        var secondlvl = users[1].level
      } else {
        var secondplace = 'Nobody Yet';
        var secondlvl = 'None';
      }
      if (users[2]) {
        var thirdplace = await client.users.fetch(users[2].userid)
        var thirdlvl = users[2].level
      } else {
        var thirdplace = 'Nobody Yet';
        var thirdlvl = 'None';
      }
      if (users[3]) {
        var fourthplace = await client.users.fetch(users[3].userid)
        var fourthlvl = users[3].level
      } else {
        var fourthplace = 'Nobody Yet';
        var fourthlvl = 'None';
      }
      if (users[4]) {
        var fifthplace = await client.users.fetch(users[4].userid)
        var fifthlvl = users[4].level
      } else {
        var fifthplace = 'Nobody Yet';
        var fifthlvl = 'None';
      }

      message.channel.send({embed: {
      color: 0x7a19a8,
      title: 'Rank Leaderboard',
      description: `1. ${firstplace} - Rank ${firstlvl}
                    2. ${secondplace} - Rank ${secondlvl}
                    3. ${thirdplace} - Rank ${thirdlvl}
                    4. ${fourthplace} - Rank ${fourthlvl}
                    5. ${fifthplace} - Rank ${fifthlvl}

                    ${output}. ${message.author.tag} - Rank ${authorLvl.level}`,
      }})
    })
  },
  permissions: [],
  requiredRoles: [],
}
