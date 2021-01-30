const Discord = require('discord.js')

module.exports = {
  name: 'shop',
  description: 'Replies with the shop',
  usage: 'shop',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' shop')
    message.channel.send({embed: {
      color: 0x7a19a8,
      title: 'Paper Shop',
      description: 'do p.buy [itemnumber/itemname] to buy an item using blanks',
      fields: [
        {name: 'Color Roles',
        value: `1. crimson - 9600
                2. sky blue - 7360
                3. cobalt - 7040
                4. purple - 6000
                5. titanium white - 5360
                6. black - 5360
                7. forest green - 5200
                8. lime - 4320
                9. orange - 4320
                10. saffron - 4000
                11. grey - 1200
                12. pink - 960
                13. burnt sienna - 800
                `}
      ]
    }
    })
  }
}
