require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const bet = require('betting')
const inv = require('inventory')

const eco = require('discord-economy');
const leveling = require('discord-leveling');
const { readdirSync } = require('fs');

const { join } = require('path');



client.commands = new Discord.Collection();
//prefix
let prefix = 'p.';

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(join(__dirname, 'commands', `${file}`));
  client.commands.set(command.name, command)
}

//hi
client.on('error', console.error);

client.on('message', async message => {

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  /*if (message.author.id === '381910494493278208') {
    if (message.channel.id === '704489252125409314' || message.channel.id === '789215234376073236') {
      message.reply("Shut up Al")
    }

  }
  if (message.content.toLowerCase().includes('hi')) {
    if (message.author.id === '381910494493278208') {
      message.reply("Shut up Al")
    }
  }
  if (message.content.toLowerCase().includes(' ')) {
    if (message.content.toLowerCase().replace(/\s+/g, '').includes('hi')) {
      if (message.author.id === '381910494493278208') {
        message.reply("Shut up Al")
      }
    }
  }*/


  var profile = await leveling.Fetch(message.author.id)
  if (message.channel.id === '704489252125409314') {

    if (message.content.includes('hi')) return;
    leveling.AddXp(message.author.id, 1)
    //If user xp higher than 100 add level
    if (message.author.id === '381910494493278208') {
      var maxXp = ((profile.level*50)) + 1;
      if (profile.xp + 1 > maxXp) {
        await leveling.AddLevel(message.author.id, 1)
        await leveling.SetXp(message.author.id, 0)
        var profileBal = await eco.AddToBalance(message.author.id, 5)
        message.reply(`You just leveled up!! You are now level ${profile.level + 1} and you have earned 5 blanks`)

      }
      return;
    }
    if (message.author.id === '389135826413682689') {
      var maxXp = ((profile.level*20)) + 1;
      if (profile.xp + 1 > maxXp) {
        await leveling.AddLevel(message.author.id, 1)
        await leveling.SetXp(message.author.id, 0)
        var profileBal = await eco.AddToBalance(message.author.id, 5)
        message.reply(`You just leveled up!! You are now level ${profile.level + 1} and you have earned 5 blanks`)

      }
      return;
    }
    var maxXp = ((profile.level*10)-(profile.level*2)) + 1;
    if (profile.xp + 1 > maxXp) {
      await leveling.AddLevel(message.author.id, 1)
      await leveling.SetXp(message.author.id, 0)
      var profileBal = await eco.AddToBalance(message.author.id, 5)
      message.reply(`You just leveled up!! You are now level ${profile.level + 1} and you have earned 5 blanks`)

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

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).run(client, message, params, paramsCom);

  } catch (error) {
    console.error(error)
  }


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
