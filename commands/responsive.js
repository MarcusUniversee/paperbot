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

    message.channel.send({
      "content": 'hello',
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "label": "Click me!",
              "style": 1,
              "custom_id": "click_one"
            }
          ]

        }
      ]
    })

  },
  permissions: [],
  requiredRoles: [],
}
