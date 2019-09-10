var Discord = require('discord.io');
var logger = require('winston');
require('dotenv').config();
var commands = require('./commands.js');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.AUTH_TOKEN,
   autorun: true
});

bot.on('ready', (evt) => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    bot.channelMap = {};
    for (const channelId in bot.channels) {
        bot.channelMap[bot.channels[channelId].name] = bot.channels[channelId];
    }
    bot.def_channel = bot.channelMap['bot-commands'];
    talk()
});

bot.on('guildMemberAdd', (member) => {
    console.log('Entered ', member);
    bot.sendMessage({
        to: bot.channelMap['welcome-lounge'].id,
        message: `Welcome <@${member.id}> to the chilling hub. Ebar tuio P maar.`
    });
})

bot.on('message', (user, userID, channelID, message, evt) => {
    const args = message.split(' ');
    if (args[0].toLowerCase() === 'soumit') {
        const cmd = args[1].toLowerCase();
        (commands[cmd] || commands.DEFUALT)(bot, args.splice(2), user, userID, channelID, message, evt);
    }
});

const talk = () => {
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