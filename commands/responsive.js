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

    message.channel.send('Respond to this message!')
    const filter = m => m.author.id === message.author.id

    const respond = message.channel.createMessageCollector(filter, { time: 60000 });

    respond.on('collect', m => {
      message.reply(m.content)
      respond.stop()
    })
  },
  permissions: [],
  requiredRoles: [],
}
