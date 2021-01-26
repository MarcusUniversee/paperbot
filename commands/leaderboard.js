const Discord = require('discord.js')
const eco = require('discord-economy');

module.exports = {
  name: 'leaderboard',
  description: 'Shows the top 5 most rich users and your own rank',
  usage: 'leaderboard',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' leaderboard');
    var output = await eco.Leaderboard({
        filter: x => x.balance > 20,
        search: message.author.id
      })
    var authorBal = await eco.FetchBalance(message.author.id)
    eco.Leaderboard({
      limit: 5,
      filter: x => x.balance > 20
    }).then(async users => {

      if (users[0]) var firstplace = await client.users.fetch(users[0].userid)
      if (users[1]) var secondplace = await client.users.fetch(users[1].userid)
      if (users[2]) var thirdplace = await client.users.fetch(users[2].userid)
      if (users[3]) var fourthplace = await client.users.fetch(users[3].userid)
      if (users[4]) var fifthplace = await client.users.fetch(users[4].userid)

      message.channel.send({embed: {
      color: 0x7a19a8,
      title: 'Leaderboard',
      description: `1. ${firstplace.tag || 'Nobody Yet'} - ${users[0].balance || 'None'} Blanks
                    2. ${secondplace.tag || 'Nobody Yet'} - ${users[1].balance || 'None'} Blanks
                    3. ${thirdplace.tag || 'Nobody Yet'} - ${users[2].balance || 'None'} Blanks
                    4. ${fourthplace.tag || 'Nobody Yet'} - ${users[3].balance || 'None'} Blanks
                    5. ${fifthplace.tag || 'Nobody Yet'} - ${users[4].balance || 'None'} Blanks

                    ${output}. ${message.author.tag} - ${authorBal.balance} Blanks`,
      }})

    })
  }
}
