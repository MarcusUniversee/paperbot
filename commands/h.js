const Discord = require ('discord.js')

module.exports = {
  name: 'h',
  description: 'Shows command list',
  usage: 'h',

  async run (client, message, params, paramsCom) {
    console.log(message.author.tag + ' help');
    switch (params[0]) {
      case 'h':
      case 'help':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.help / p.h',
        description: '**description:** A command that opens the help menu\n**Actions:** None',
        }})
      break;
      case 'ping':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.ping',
        description: '**description:** A command used for checking the bot is working and online\n**Actions:** Replies Pong!\n**Usage:** p.ping',
        }})
      break;
      case 'whale':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.whale',
        description: '**description:** Whale Facts\n**Actions:** Replies with a whale fact!\n**Usage:** p.whale',
        }})
      break;
      case 'kanye':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.kanye',
        description: '**description:** Kanye quotes/lyrics\n**Actions:** Replies with a kanye quote or lyric!\n**Usage:** p.kanye',
        }})
      break;
      case 'balance':
      case 'bal':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.balance / p.bal',
        description: '**description:** Command for fetching balances\n**Actions:** Replies with your or someone else\'s balance\n**Usage:** p.balance [user(optional)] or p.bal [user(optional)]',
        }})
      break;
      case 'setblanks':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.setblanks',
        description: '**description:** Command for setting balances\n**Actions:** Sets the mentioned user\'s balance to a specified amount and returns with the new balance\n**Usage:** p.setblanks [user], [amount]',
        }})
      break;
      case 'addblanks':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.addblanks',
        description: '**description:** Command for adding blanks to balances\n**Actions:** Adds specified amount to the mentioned user\'s balance and returns with the new balance\n**Usage:** p.addblanks [user], [amount]',
        }})
      break;
      case 'takeblanks':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.takeblanks',
        description: '**description:** Command for subtracting blanks from balances\n**Actions:** Subtracts specified amount from the mentioned user\'s balance and returns with the new balance\n**Usage:** p.takeblanks [user], [amount]',
        }})
      break;
      case 'giveblanks':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.giveblanks',
        description: '**description:** Command for giving blanks to someone else\n**Actions:** Sends a specified amount from the user\'s balance to the mentioned user\'s balance\n**Usage:** p.give [user], [amount]',
        }})
      break;
      case 'leaderboard':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.leaderboard',
        description: '**description:** Command that shows the blanks leaderboard\n**Actions:** Shows the top 5 players ranked by blank balance. Also shows user placement and balance\n**Usage:** p.leaderboard',
        }})
      break;
      case 'meme':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.meme',
        description: '**description:** Command that generates a randome meme\n**Actions:** Searches reddit and finds and replies a meme\n**Usage:** p.meme',
        }})
      break;
      case 'rank':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.rank',
        description: '**description:** Command that replies with your rank\n**Actions:** Replies you or a mentioned user\'s rank\n**Usage:** p.rank [user(optional)]',
        }})
      break;
      case 'bets':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.bets',
        description: '**description:** Command that displays ongoing bets\n**Actions:** Replies a list of ongoing bets, and information about them\n**Usage:** p.bets',
        }})
      break;
      case 'startbet':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.startbet',
        description: '**description:** Command that starts a bet\n**Actions:** Adds the bet to the database, then replies with information about the bet\n**Usage:** p.startbet [minimumBalance], [description1], [description2]',
        }})
      break;
      case 'placebet':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.placebet',
        description: '**description:** Command that places a bet\n**Actions:** Places a bet on a specified betID and adds it to the pool\n**Usage:** p.placebet [betID], [betSide], [betAmount]',
        }})
      break;
      case 'addtobet':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.addtobet',
        description: '**description:** Command that adds on to a placed bet\n**Actions:** Adds to a placed bet on a specified betID and adds it to the pool\n**Usage:** p.addtobet [betID], [betAmount]',
        }})
      break;
      case 'endbet':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.endbet',
        description: '**description:** Ends a bet\n**Actions:** Ends an ongoing bet and distributes blanks to the winners\n**Usage:** p.endbet [betID], [winningSide]',
        }})
      break;
      case 'stopbet':
        message.channel.send({embed: {
        color: 0x7a19a8,
        title: 'p.stopbet',
        description: '**description:** Stops a bet\n**Actions:** Stops an ongoing bet and gives everyone who bet their blanks back\n**Usage:** p.stopbet [betID]',
        }})
      break;
      default:
        message.channel.send({embed: {
        color: 0x7a19a8,
        description: '**A bot made of paper\ndo p.help [command] to see more help on a specific command**',
        fields: [
          {name: "Commands",
          value: "**p.ping** - Replies 'Pong' to check if the bot is working properly\n**p.rank** - Replies with your rank\n**p.whale** - Whale facts\n**p.kanye** - Kanye quotes or lyrics\n**p.meme** - Meme generator"},
          {name: "Economy Commands",
          value: "**p.bal** - Replies with your balance\n**p.setblanks** - Sets your balance\n**p.addblanks** - Adds to your your balance\n" +
          "**p.takeblanks** - Subtracts from your balance\n**p.give** - Sends blanks to another user\n**p.leaderboard** - Check the top 5 players by blank balance"},
          {name: "Bet Commands",
          value: "**p.bets** - Displays ongoing bets\n**p.startbet** - Starts a bet\n**p.placebet** - Places a bet\n" +
          "**p.addtobet** - Adds on to a placed bet\n**p.endbet** - Ends an ongoing bet\n**p.stopbet** - Stops an ongoing bet"}
        ]
      }
      })
        break;
    }
  }
}
