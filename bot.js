require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const eco = require('discord-economy');
const leveling = require('discord-leveling');
const { readdirSync } = require('fs');

const { join } = require('path');

client.commands = new Discord.Collection();

let prefix = 'p.';

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(join(__dirname, 'commands', `${file}`));
  client.commands.set(command.name, command)
}


client.on('error', console.error);

client.on('message', async message => {

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  var profile = await leveling.Fetch(message.author.id)
  if (message.channel.id === '704489252125409314') {
    leveling.AddXp(message.author.id, 1)
    //If user xp higher than 100 add level
    var maxXp = profile.level*10 + 1;
    if (profile.xp + 1 > maxXp) {
      await leveling.AddLevel(message.author.id, 1)
      await leveling.SetXp(message.author.id, 0)
      var profileBal = await eco.AddToBalance(message.author.id, 5)
      message.reply(`You just leveled up!! You are now level: ${profile.level + 1} and you have earned 5 blanks`)
    }
  }


  if(!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1); //array containing each param
  let args = message.content.split(' '); //same as params but also contains command at first index  args[2] == params[1]
  let params1 = message.content.split(' ').slice(1).join(" "); //same as params but as a string with a space in between

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).run(client, message, params);

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
        game: {
            name: 'p.help',
            type: 'WATCHING'
        },
        status: 'online'
    })
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
