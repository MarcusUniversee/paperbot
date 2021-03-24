const Discord = require('discord.js')
const Canvas = require('canvas')
module.exports = {
  name: 'drawing',
  description: 'Draw test',
  expectedArgs: '',
  category: '',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' drawing')
    const canvas = Canvas.createCanvas(128, 128)
    const ctx = canvas.getContext('2d')
    const pfp = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(pfp, 5, 5, canvas.width-5, canvas.height-5);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#FFD700';
    ctx.strokeRect(5, 5, canvas.width-5, canvas.height-5)



    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'image.png');
    message.channel.send(attachment)
  },
  permissions: [],
  requiredRoles: [],
}
