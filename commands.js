exports.ding = (bot, args, user, userID, channelID, message, evt) => {
    bot.sendMessage({
        to: channelID,
        message: 'Dong!'
    });
}

exports.s = (bot, args, user, userID, channelID, message, evt) => {
    bot.sendMessage({
        to: channelID,
        message: `Please na bhai na. Abar P marish na. <@${userID}>`
    });
}

exports.placements = (bot, args, user, userID, channelID, message, evt) => {
    bot.sendMessage({
        to: channelID,
        message: `Lol lol kotha bolis na. <@${userID}>`
    });
}

exports.girlfriend = (bot, args, user, userID, channelID, message, evt) => {
    bot.sendMessage({
        to: channelID,
        message: `Gaanja kheyechis? <@${userID}>`
    });
}

exports.timothy =
exports.souravyadav =
exports.caseyneistat = (bot, args, user, userID, channelID, message, evt) => {
    bot.sendMessage({
        to: channelID,
        message: `Seta abar k? <@${userID}>`
    });
}

exports.sambit = (bot, args, user, userID, channelID, message, evt) => {
    Object.keys(bot.users).forEach(userId => {
        if (bot.users[userId].username !== 'Hirodane')
            return;
        bot.sendMessage({
            to: channelID,
            message: `<@${userId}>`
        }); 
    });
}

exports.voice = (bot, args, user, userID, channelID, message, evt) => {
    for (const id in bot.channels) {
        if (bot.channels[id].name === 'voice chat hub') {
            bot.joinVoiceChannel(id);
        }
    }
}

exports.DEFUALT = (bot, args, user, userID, channelID, message, evt) => {
    bot.sendMessage({
        to: channelID,
        message: `R bolish na. Jibon tai akta black hole. <@${userID}>`
    });
}
