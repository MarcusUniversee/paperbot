const Discord = require('discord.js')
const eco = require('discord-economy')
const leveling = require('discord-leveling2')
const inv = require('inventory')
const prof = require('profile')
const Canvas = require('canvas')
const colorID = require('../getJSON/colorId.json');
module.exports = {
  name: ['profile', 'p', 'prof'],
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
    var xp = rankOutput.xp
    if (rankOutput.level >= 120) {
      var maxXp = 550
    } else {
      var maxXp = Math.floor((40*(Math.log(rankOutput.level + 1))) + (3*rankOutput.level)) + 1; //y=40ln(x+1)+3x+1
    }
    var showXp = xp + '/' + maxXp
    var pInv = await inv.fetchInv(user.id)
    var invList = [];
    var profile = await prof.fetchProfile(user.id)
    var border;
    var borderColor;
    for (var i=0; i<pInv.length; i++) {
      if (!pInv[i]) break;
      if (pInv[i].dataValues.equip === 1) {
        if (pInv[i].dataValues.type == 'badge') {
          if (!invList[(profile.badgeLimit-1)*2]) {
            invList.push(pInv[i].dataValues.name)
            invList.push('\n')
          }
        }
        if (pInv[i].dataValues.type == 'pfpborder') {
          border = pInv[i].dataValues.name.slice(0, -7)
          borderColor = colorID.find( ({ name }) => name === border ).id;
        }
        if (pInv[i].dataValues.name == 'progress bar') {
          var progressBar = [];
          var count = Math.floor((xp/maxXp)*10)
          var antiCount = 10-count
          for (var k=0; k<count;k++) {
            progressBar.push(':green_square:')
          }
          for (var l=0; l<antiCount;l++) {
            progressBar.push(':red_square:')
          }
          showXp = progressBar.join(' ')
        }
      }
    }
    if (!invList[0]) invList.push('None')
    const canvas = Canvas.createCanvas(128, 128)
    const ctx = canvas.getContext('2d')

    ctx.beginPath();
    ctx.arc((canvas.width/2), (canvas.height/2), 60, 0, Math.PI * 2, true);
    ctx.lineWidth = 8;
    ctx.strokeStyle = borderColor;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    const pfp = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(pfp, 4, 4, canvas.width-8, canvas.height-8);
    var attachment = new Discord.MessageAttachment(user.displayAvatarURL(), 'dimage.png');
    var badges = invList.join(" ") //this will later be invlist[0] OR multiple badges if they bought the customization
    var smallpfp = ''
    var medpfp = ''
    var largepfp = ''
    var defaultpfp = '';
    if (profile.smallpfp) {
      smallpfp = 'attachment://dimage.png';
    }
    if (profile.medpfp) {
      medpfp = 'attachment://dimage.png';
    }
    if (profile.largepfp) {
      largepfp = 'attachment://dimage.png';
    }
    if (profile.defaultpfp) {
      defaultpfp = 'attachment://dimage.png';
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
    if (!profile.smallpfp && !profile.medpfp && !profile.largepfp & !profile.defaultpfp) {
      message.channel.send({embed: {
        color: 0x7a19a8,
        title: `${tag}\'s profile`,
        author: {
          name: profile.authorName,
        },
        fields: [
          {
            name: 'Badges',
            value: badges,
          },
          {
            name: 'Rank',
            value: `${rankOutput.level}`,
            inline: true
          },
          {
            name: 'Balance',
            value: `${balOutput.balance}`,
            inline: true
          },
          {
            name: 'Xp',
            value: `${showXp}`
          },
        ],
        image: {
      		url: largepfp,
      	},
        footer: {
          text: user.tag,
      	},
      }});
    } else {
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
            inline: true
          },
          {
            name: 'Balance',
            value: `${balOutput.balance}`,
            inline: true
          },
          {
            name: 'Xp',
            value: `${showXp}`
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
    }
  },
  permissions: [],
  requiredRoles: [],
}
