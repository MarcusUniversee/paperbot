const Discord = require('discord.js')
const eco = require('discord-economy');

module.exports = {
  name: 'shop',
  description: 'test',
  usage: 'shop',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' shop')
    switch (params[0]) {
      case '1':
        var profile = await eco.SubtractFromBalance(message.author.id, 10)
        message.reply(`Successfully purchased Item 1! You now own ${profile.newbalance} blanks.`);
      break;
      case '2':
        var profile = await eco.SubtractFromBalance(message.author.id, 20)
        message.reply(`Successfully purchased Item 2! You now own ${profile.newbalance} blanks.`);
      break;
      case '3':
        var profile = await eco.SubtractFromBalance(message.author.id, 10)
        message.reply(`Successfully purchased Item 3! You now own ${profile.newbalance} blanks.`);
      break;
      case '4':
        var profile = await eco.SubtractFromBalance(message.author.id, 10)
        message.reply(`Successfully purchased Item 4! You now own ${profile.newbalance} blanks.`);
      break;
      case '5':
        var profile = await eco.SubtractFromBalance(message.author.id, 10)
        message.reply(`Successfully purchased Item 5! You now own ${profile.newbalance} blanks.`);
      break;
      case '6':
        var profile = await eco.SubtractFromBalance(message.author.id, 10)
        message.reply(`Successfully purchased Item 6! You now own ${profile.newbalance} blanks.`);
      break;
      case '7':
        var profile = await eco.SubtractFromBalance(message.author.id, 10)
        message.reply(`Successfully purchased Item 7! You now own ${profile.newbalance} blanks.`);
      break;
      case '8':
        var profile = await eco.SubtractFromBalance(message.author.id, 10)
        message.reply(`Successfully purchased Item 8! You now own ${profile.newbalance} blanks.`);
      break;
      case '9':
        var profile = await eco.SubtractFromBalance(message.author.id, 10)
        message.reply(`Successfully purchased Item 9! You now own ${profile.newbalance} blanks.`);
      break;
      default:
        message.channel.send({embed: {
          color: 0x7a19a8,
          title: 'Paper Shop',
          description: 'do p.shop [itemnumber] to buy an item',
          fields: [
            {name: "Test Group #1",
            value: "1. Test item 1 - 10 blanks\n2. Test item 2 - 20 blanks"},
            {name: "Test Group #2",
            value: "3. Test item 1 - 10 blanks\n4. Test item 2 - 10 blanks"}
          ]
        }
        })
      break;
    }
  }
}
