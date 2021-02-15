const Discord = require ('discord.js')

module.exports = {
  name: 'responsive',
  description: 'responsive test command',
  expectedArgs: '',
  category: '',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' responsive');
    await message.channel.send('React to this message in 10 seconds')
    await message.channel.messages.fetch({ limit: 1 }).then(async messages => {
      var messageN = await messages.first();
      const filter = (reaction, user) => reaction.emoji.name === '👍' && user.id === message.author.id;

      messageN.react('👍')
      messageN.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
      	.then(collected => {
          message.channel.send('reacted')
        })
      	.catch(collected => {
      		message.channel.send('not reacted in time')
      	});
    })
  },
  permissions: [],
  requiredRoles: [],
}
