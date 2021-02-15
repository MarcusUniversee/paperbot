const Discord = require('discord.js')

var paperFacts = ['COMING SOON'
                 ]

module.exports = {
  name: 'horse',
  description: 'Replies with a horse fact',
  expectedArgs: '',
  category: 'Facts',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' horse');
    var paperNum = await Math.floor((Math.random() * horseFacts.length));
    message.reply(horseFacts[horseNum]);
  },
  permissions: [],
  requiredRoles: [],
}
