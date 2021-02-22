require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const bet = require('betting')
const inv = require('inventory')

const eco = require('discord-economy');
const leveling = require('discord-leveling');
const fs = require('fs');

const path = require('path');

const loadCommands = require('./commands/load-commands')

client.commands = new Discord.Collection();
//prefix
let prefix = 'p.';

client.setMaxListeners(36);

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
    leveling.AddXp(message.author.id, 1)
    //If user xp higher than 100 add level
    var maxXp = ((profile.level*10)-(profile.level*2)) + 1;
    if (profile.xp + 1 > maxXp) {
      var money = 5 + Math.floor(profile.level/5)
      await leveling.AddLevel(message.author.id, 1)
      await leveling.SetXp(message.author.id, 0)
      var profileBal = await eco.AddToBalance(message.author.id, money)
      message.reply(`You just ranked up!! You are now rank ${profile.level + 1} and you have earned ${money} blanks`)

    }
    return;
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
