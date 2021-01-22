require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const eco = require('discord-economy');

const { readdirSync } = require('fs');

const { join } = require('path');

client.commands = new Discord.Collection();

let prefix = 'p!';

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(join(__dirname, 'commands', `${file}`));
  client.commands.set(command.name, command)
}


client.on('error', console.error);

client.on('message', async message => {

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;


  if(!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1); //array containing each param
  let args = message.content.split(' '); //same as params but also contains command at first index
  let params1 = message.content.split(' ').slice(1).join(" "); //same as params but as a string with a space in between

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).run(client, message, params);

  } catch (error) {
    console.error(error)
  }

  if(command.toLowerCase() === 'give') {
    console.log(message.author.tag + ' give');
    if (!message.mentions.users.first()) return message.reply('Error: No user mentioned')
    if (!args[2]) return message.reply('Specify the amount of blanks you want to send!')
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < args[2]) return message.reply('You do not have enough blanks!')

    var transfer = await eco.Transfer(message.author.id, message.mentions.users.first().id, args[2])
    message.reply(`Sent successfully!\n${message.author.tag} now has ${transfer.FromUser} blanks\n${message.mentions.users.first().tag} now has ${transfer.ToUser} blanks`);
    return;
  }

  if (command.toLowerCase() === 'leaderboard') {
    console.log(message.author.tag + ' leaderboard');
    var output = await eco.Leaderboard({
        filter: x => x.balance > 20,
        search: message.author.id
      })
    var authorBal = await eco.FetchBalance(message.author.id)
    eco.Leaderboard({
      limit: 5,
      filter: x => x.balance > 20
    }).then(async users => {

      if (users[0]) var firstplace = await client.users.fetch(users[0].userid)
      if (users[1]) var secondplace = await client.users.fetch(users[1].userid)
      if (users[2]) var thirdplace = await client.users.fetch(users[2].userid)
      if (users[3]) var fourthplace = await client.users.fetch(users[3].userid)
      if (users[4]) var fifthplace = await client.users.fetch(users[4].userid)

      message.channel.send({embed: {
      color: 0x7a19a8,
      title: 'Leaderboard',
      description: `1. ${firstplace.tag || 'Nobody Yet'} - ${users[0].balance || 'None'} Blanks
                    2. ${secondplace.tag || 'Nobody Yet'} - ${users[1].balance || 'None'} Blanks
                    3. ${thirdplace.tag || 'Nobody Yet'} - ${users[2].balance || 'None'} Blanks
                    4. ${fourthplace.tag || 'Nobody Yet'} - ${users[3].balance || 'None'} Blanks
                    5. ${fifthplace.tag || 'Nobody Yet'} - ${users[4].balance || 'None'} Blanks

                    ${output}. ${message.author.tag} - ${authorBal.balance} Blanks`,
      }})

    })


  }

  if(command.toLowerCase() === 'help' || command.toLowerCase() === 'h') {
    console.log(message.author.tag + ' help');
    switch (params1) {
      case 'h':
      case 'help':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p!help / p!h',
        description: '**description:** A command that opens the help menu\n**Actions:** None',
        }})
      break;
      case 'ping':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p!ping',
        description: '**description:** A command used for checking the bot is working and online\n**Actions:** Replies Pong!\n**Usage:** p!ping',
        }})
      break;
      case 'whale':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p!whale',
        description: '**description:** Whale Facts\n**Actions:** Replies with a whale fact!\n**Usage:** p!whale',
        }})
      break;
      case 'kanye':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p!kanye',
        description: '**description:** Kanye quotes/lyrics\n**Actions:** Replies with a kanye quote or lyric!\n**Usage:** p!kanye',
        }})
      break;
      case 'balance':
      case 'bal':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p!balance / p!bal',
        description: '**description:** Command for fetching balances\n**Actions:** Replies with your or someone else\'s balance\n**Usage:** p!balance [user(optional)] or p!bal [user(optional)]',
        }})
      break;
      case 'setblanks':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p!setblanks',
        description: '**description:** Command for setting balances\n**Actions:** Sets the mentioned user\'s balance to a specified amount and returns with the new balance\n**Usage:** p!setblanks [user] [amount]',
        }})
      break;
      case 'addblanks':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p!addblanks',
        description: '**description:** Command for adding blanks to balances\n**Actions:** Adds specified amount to the mentioned user\'s balance and returns with the new balance\n**Usage:** p!addblanks [user] [amount]',
        }})
      break;
      case 'takeblanks':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p!takeblanks',
        description: '**description:** Command for subtracting blanks from balances\n**Actions:** Subtracts specified amount from the mentioned user\'s balance and returns with the new balance\n**Usage:** p!takeblanks [user] [amount]',
        }})
      break;
      case 'give':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p!giveblanks',
        description: '**description:** Command for giving blanks to someone else\n**Actions:** Sends a specified amount from the user\'s balance to the mentioned user\'s balance\n**Usage:** p!give [user] [amount]',
        }})
      break;
      case 'leaderboard':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p!leaderboard',
        description: '**description:** Command that shows the blanks leaderboard\n**Actions:** Shows the top 5 players ranked by blank balance. Also shows user placement and balance\n**Usage:** p!leaderboard',
        }})
      break;
      default:
        message.channel.send({embed: {
        color: 0x7a19a8,
        description: '**A bot made of paper\ndo p!help [command] to see more help on a specific command**',
        fields: [
          {name: "Commands",
          value: "**p!ping** - Replies 'Pong' to check if the bot is working properly\n**p!whale** - Whale facts\n**p!kanye** - Kanye quotes or lyrics"},
          {name: "Economy Commands",
          value: "**p!bal** - Replies with your balance\n**p!setblanks** - Sets your balance\n**p!addblanks** - Adds to your your balance\n" +
          "**p!takeblanks** - Subtracts from your balance\n**p!give** - Sends blanks to another user\n**p!leaderboard** - Check the top 5 players by blank balance"}
        ]
      }
      })
        break;
    }
  };

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
            name: 'p!help',
            type: 'WATCHING'
        },
        status: 'online'
    })
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
