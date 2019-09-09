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
});

bot.on('message', (user, userID, channelID, message, evt) => {
    const args = message.split(' ');
    if (args[0].toLowerCase() === 'soumit') {
        const cmd = args[1].toLowerCase();
        (commands[cmd] || commands.DEFUALT)(bot, args.splice(2), user, userID, channelID, message, evt);
    }
});