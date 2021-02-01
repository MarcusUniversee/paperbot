const Discord = require ('discord.js')

module.exports = {
  name: 'responsive',
  description: 'responsive test command',
  usage: 'responsive [type]',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' responsive');
    if (params[0] === 'reaction') {
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

    } else if (params[0] === 'message') {
      const filter = (user) => user.id === message.author.id;
      await message.channel.send('Yes or no').then(async () => {
        message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
        	.then(collected => {
            console.log(message.content)
            message = message.first()
            console.log(message.content)
            if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
              message.channel.send(`Yes!`)
            } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
              message.channel.send(`No!`)
            } else {
              message.channel.send(`Invalid response`)
            }
          })
        	.catch(collected => {
        		message.channel.send('message not sent in time')
        	});


      });

    }
  }
}
