var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var commands = require('./commands.js');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', (evt) => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    talk()
});

bot.on('message', (user, userID, channelID, message, evt) => {
    const args = message.split(' ');
    if (args[0].toLowerCase() === 'soumit') {
        const cmd = args[1].toLowerCase();
        (commands[cmd] || commands.DEFUALT)(bot, args.splice(2), user, userID, channelID, message, evt);
    }
});

const talk = () => {
    for (const id in bot.channels) {
        if (bot.channels[id].name === 'bot-commands') {
            bot.def_channel = bot.channels[id];
        }
    }

    // Get process.stdin as the standard input object.
    var standard_input = process.stdin;

    // Set input character encoding.
    standard_input.setEncoding('utf-8');

    // Prompt user to input data in console.
    console.log("Please input text in command line.");

    // When user input data and click enter key.
    standard_input.on('data', function (data) {

        // User input exit.
        if(data === 'exit\n'){
            // Program exit.
            console.log("User input complete, program exit.");
            process.exit();
        } else {
            bot.sendMessage({
                to: bot.def_channel.id,
                message: data
            }); 

        }
    });
}