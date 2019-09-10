const youtube = {
    search: require('youtube-search'),
    stream: require('youtube-audio-stream')
};

const he = require('he'); // HTML Encoder

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

exports.sambo =
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

exports.rohan =
exports.datta = (bot, args, user, userID, channelID, message, evt) => {
    Object.keys(bot.users).forEach(userId => {
        if (bot.users[userId].username !== 'SilverBullet')
            return;
        bot.sendMessage({
            to: channelID,
            message: `<@${userId}>`
        });
    });
}

exports.baja = (bot, args, user, userID, channelID, message, evt) => {
    const query = args.join(' ');
    youtube.search(query, { maxResults: 1, key: process.env.YOUTUBE_API_KEY}, (err, results) => {
        if(err) return console.log(err);

        bot.sendMessage({
            to: channelID,
            message: `Ok bajachhi  :drum:  \`${he.decode(results[0].title)}\``
        });

        const url = results[0].link;
        bot.joinVoiceChannel(bot.channelMap['voice chat hub'].id, (err) => {
            bot.getAudioContext(bot.channelMap['voice chat hub'].id, (err, stream) => {
                if(err) return console.log(err);

                youtube.stream(url).pipe(stream, {end: true});
            });
        });
    });
}

exports.bondo =
exports.bero = (bot, args, user, userID, channelID, message, evt) => {
    bot.leaveVoiceChannel(bot.channelMap['voice chat hub'].id, (err) => {
        if(err) return console.log(err);
        bot.sendMessage({
            to: channelID,
            message: `Ok sorry bhai.`
        });
    });
}

exports.come = (bot, args, user, userID, channelID, message, evt) => {
    const to_channel = args.splice(1).join(' ');

    if (!bot.channelMap[to_channel]) {
        bot.sendMessage({
            to: channelID,
            message: `Kothay?`
        });
        return;
    }

    bot.sendMessage({
        to: channelID,
        message: `Ok`
    });
    bot.def_channel = bot.channelMap[to_channel];
    setTimeout(() =>
        bot.sendMessage({
            to: bot.channelMap[to_channel].id,
            message: `Bol <@${userID}>`
    }), 1000)
}

exports.DEFUALT = (bot, args, user, userID, channelID, message, evt) => {
    bot.sendMessage({
        to: channelID,
        message: `R bolish na. Jibon tai akta black hole. <@${userID}>`
    });
}