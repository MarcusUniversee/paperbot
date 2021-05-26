const Discord = require ('discord.js')
const fs = require('fs')
const boost = require('../getJSON/boosts.json')
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

    /*message.channel.send('Respond to this message!')
    const filter = m => m.author.id === message.author.id

    const respond = message.channel.createMessageCollector(filter, { time: 60000 });

    respond.on('collect', m => {
      message.reply(m.content)
      respond.stop()
    })*/
    boost[0].status = "1"
    fs.writeFile("./paperbot/getJSON/boosts.json", JSON.stringify(boost), err => {
      if (err) throw err;
      console.log('done')
    })

  },
  permissions: [],
  requiredRoles: [],
}
