require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const bet = require('betting')
const inv = require('inventory')
const prof = require('profile')
const eco = require('discord-economy');
const leveling = require('discord-leveling');

const list = require('./getJSON/crates.json')
const prizeList = require('./getJSON/prizes.json')

const fs = require('fs');
const path = require('path');

const loadCommands = require('./commands/load-commands')

client.commands = new Discord.Collection();
//prefix
let prefix = 'p.';

client.setMaxListeners(40);

client.on('ready', async () => {
  console.log('The client is ready!')

  loadCommands(client)
})

//hi
client.on('error', console.error);

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  var botchannel = message.guild.channels.cache.get('801558022823477339')
  botchannel.setRateLimitPerUser(2);
  var profile = await leveling.Fetch(message.author.id)
  //if (message.author.id == '381910494493278208') return message.reply('Imposter! you get no xp')
  if (message.channel.id === '704489252125409314' || message.channel.id === '789215234376073236' || message.channel.id === '801939862303014912' || message.channel.id == '801558022823477339') {//chat school and trivia

    if (message.content == 'hi') return;
    if (message.content.includes('hello')) return;
    if (message.content.startsWith('http')) return;
    if (message.embeds[0]) return;
    /*if (profile.xp%3 === 0) { //Double xp every other
      leveling.AddXp(message.author.id, 1)
    } else {
      leveling.AddXp(message.author.id, 2)
    }*/
    leveling.AddXp(message.author.id, 1)
    //If user xp higher than 100 add level
    if (profile.level >= 90) {
      var maxXp = 450
    } else {
      var maxXp = Math.floor((40*(Math.log(profile.level + 1))) + (3*profile.level)) + 1; //y=40ln(x+1)+3x+1
    }
    if (profile.xp + 1 > maxXp) {
      var money = 1 + Math.floor(profile.level/5)
      await leveling.AddLevel(message.author.id, 1)
      await leveling.SetXp(message.author.id, 0)
      var itemType = 'crate'
      var itemName = 'rank crate'
      var itemInv = await inv.addItem(message.author.id, itemType, itemName)
      var profileBal = await eco.AddToBalance(message.author.id, money)
      message.reply(`You just ranked up!! You are now rank ${profile.level + 1} and you have earned ${money} blanks and a rank crate!`)

    }

    var iType = 'crate'
    var chance = Math.random()
    console.log("crate chance: " + chance)
    //1.5x CRATE EVENT
    var vrchance = 0.000027
    var rchance = 0.00024
    var uchance = 0.0021
    var cchance = 0.018

    //2.0x CRATE EVENT
    /*var vrchance = 0.000036
    var rchance = 0.00032
    var uchance = 0.0028
    var cchance = 0.024*/

    //Original
    /*var vrchance = 0.000018
    var rchance = 0.00016
    var uchance = 0.0014
    var cchance = 0.012*/
    if (chance < vrchance) {
      var itemInv = await inv.addItem(message.author.id, iType, 'very rare crate')
      message.reply(`You just found a very rare crate!`)
      console.log(message.author.tag + ' very rare crate')
    } else if (chance < rchance) {
      var itemInv = await inv.addItem(message.author.id, iType, 'rare crate')
      message.reply(`You just found a rare crate!`)
      console.log(message.author.tag + ' rare crate')
    } else if (chance < uchance) {
      var itemInv = await inv.addItem(message.author.id, iType, 'uncommon crate')
      message.reply(`You just found a uncommon crate!`)
      console.log(message.author.tag + ' uncommon crate')
    } else if (chance < cchance) {
      var itemInv = await inv.addItem(message.author.id, iType, 'common crate')
      message.reply(`You just found a common crate!`)
      console.log(message.author.tag + ' common crate')
    }
  }

  if (message.channel.id === '789215234376073236') {
    return;
  }
  if (message.channel.id === '704489252125409314') {
    return;
  }
  if(!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1); //array containing each param
  let args = message.content.split(' '); //same as params but also contains command at first index  args[2] == params[1]
  let params1 = message.content.split(' ').slice(1).join(" "); //same as params but as a string with a space in between
  let paramsCom = message.content.split(' ').slice(1).join(" ").split(', '); //array containing each param when set by comma



  /*copypaste code
  embed:
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: '',
        description: '',
        }})

  exampleEmbed = {
    color: ,
    title: '',
    url: '',
    author: {
      name: '',
      icon_url: '',
      url: '',
    },
    description: '',
    thumbnail: {
      url: '',
    },
    fields: [
      {
        name: '',
        value: '',
      },
      {
        name: '',
        value: '',
        inline: false,
      },
      {
        name: '',
        value: '',
        inline: true,
      },
    ],
    image: {
      url: '',
    },
    timestamp: new Date(),
    footer: {
      text: '',
      icon_url: '',
    },
  };



*/

});

client.on('ready', () => {
  client.user.setPresence({
        activity: {
            name: 'p.help'
        },
        status: 'online'
    })
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
