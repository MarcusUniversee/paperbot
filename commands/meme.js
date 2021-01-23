const Discord = require('discord.js')
const randomPuppy = require('random-puppy');

module.exports = {
  name: 'meme',
  description: 'Replies with a random meme from reddit',
  usage: 'meme',

  async run (client, message, params) {
    console.log(message.author.tag + ' meme');
    const subReddits = ['dankmeme', 'meme', 'me_irl', 'memes', 'dankmemes'];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    var img = await randomPuppy(random);
    console.log(img)

    message.reply(`from r/${random} ` + img)
  }
}
