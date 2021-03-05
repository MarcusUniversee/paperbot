const Discord = require('discord.js')
const leveling = require('discord-leveling');

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
    var output = await leveling.Leaderboard({
      search: message.author.id
    })
    leveling.Leaderboard({
      limit: 5
    }).then(async users => {

      var authorLvl = await leveling.Fetch(message.author.id)

      if (users[0]) var firstplace = await client.users.fetch(users[0].userid)
      if (users[1]) var secondplace = await client.users.fetch(users[1].userid)
      if (users[2]) var thirdplace = await client.users.fetch(users[2].userid)
      if (users[3]) var fourthplace = await client.users.fetch(users[3].userid)
      if (users[4]) var fifthplace = await client.users.fetch(users[4].userid)

      message.channel.send({embed: {
      color: 0x7a19a8,
      title: 'Rank Leaderboard',
      description: `1. ${firstplace.tag || 'Nobody Yet'} - Rank ${users[0].level || 'None'}
                    2. ${secondplace.tag || 'Nobody Yet'} - Rank ${users[1].level || 'None'}
                    3. ${thirdplace.tag || 'Nobody Yet'} - Rank ${users[2].level || 'None'}
                    4. ${fourthplace.tag || 'Nobody Yet'} - Rank ${users[3].level || 'None'}
                    5. ${fifthplace.tag || 'Nobody Yet'} - Rank ${users[4].level || 'None'}

                    ${output}. ${message.author.tag} - Rank ${authorLvl.level}`,
      }})
    })
  },
  permissions: [],
  requiredRoles: [],
}
