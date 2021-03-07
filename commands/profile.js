const Discord = require('discord.js')
const eco = require('discord-economy')
const leveling = require('discord-leveling')
const inv = require('inventory')
const prof = require('profile')
const Canvas = require('canvas')
const colorID = require('../getJSON/colorId.json');
module.exports = {
  name: 'profile',
  description: 'Replies with you or a user\'s profile, showing ranks, balance, and badges',
  expectedArgs: '[user(optional)]',
  category: '',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' profile')

    var user = message.mentions.users.first() || message.author
    var balOutput = await eco.FetchBalance(user.id)
    var rankOutput = await leveling.Fetch(user.id)
    var pInv = await inv.fetchInv(user.id)
    var invList = [];
    var profile = await prof.fetchProfile(user.id)
    var border;
    var borderColor;
    for (var i=0; i<pInv.length; i++) {
      if (!pInv[i]) break;
      if (invList[(profile.badgeLimit-1)*2]) break;
      if (pInv[i].dataValues.equip === 1) {
        if (pInv[i].dataValues.type == 'badge') {
          invList.push(pInv[i].dataValues.name)
          invList.push('\n')
        }
        if (pInv[i].dataValues.type == 'pfpborder') {
          border = pInv[i].dataValues.name
          borderColor = colorID.find( ({ name }) => name === border );
        }
      }
    }
    if (!invList[0]) invList.push('None')
    const canvas = Canvas.createCanvas(128, 128)
    const ctx = canvas.getContext('2d')

    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 59, 0, Math.PI * 2, true);
    ctx.lineWidth = 8;
    ctx.strokeStyle = borderColor;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    const pfp = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(pfp, 5, 5, canvas.width-5, canvas.height-5);
    var attachment = new Discord.MessageAttachment(user.displayAvatarURL(), 'dimage.png');
    var badges = invList.join(" ") //this will later be invlist[0] OR multiple badges if they bought the customization
    var smallpfp = ''
    var medpfp = ''
    var largepfp = ''
    var defaultpfp = 'attachment://dimage.png';
    if (profile.smallpfp) {
      smallpfp = 'attachment://dimage.png';
      defaultpfp = '';
    }
    if (profile.medpfp) {
      medpfp = 'attachment://dimage.png';
      defaultpfp = '';
    }
    if (profile.medpfp) {
      largepfp = 'attachment://dimage.png';
      defaultpfp = '';
    }

    if (profile.hasBorder) {
      attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'image.png');
      if (profile.smallpfp) smallpfp = 'attachment://image.png';
      if (profile.medpfp) medpfp = 'attachment://image.png';
      if (profile.largepfp) largepfp = 'attachment://image.png';
      if (defaultpfp === 'attachment://dimage.png') defaultpfp = 'attachment://image.png';
    }

    var tag = user.tag.slice(0, -5)
    if (!profile.embed) {

      return message.reply(
        `
        **${user.tag}\'s profile**
        Badges: ${badges}
        Rank: ${rankOutput.level}
        Balance: ${balOutput.balance}`
      )
    }
    message.channel.send({ files: [attachment], embed: {
      color: 0x7a19a8,
      title: `${tag}\'s profile`,
      author: {
        name: profile.authorName,
        icon_url: medpfp,
        url: '',
      },
      thumbnail: {
        url: defaultpfp,
      },
      fields: [
        {
          name: 'Badges',
          value: badges,
        },
        {
          name: 'Rank',
          value: `${rankOutput.level}`,
          inline: true,
        },
        {
          name: 'Balance',
          value: `${balOutput.balance}`,
          inline: true,
        },
      ],
      image: {
    		url: largepfp,
    	},
      footer: {
        text: user.tag,
    		icon_url: smallpfp,
    	},
    }});
  },
  permissions: [],
  requiredRoles: [],
}
