exports.ding = (bot, args, user, userID, channelID, message, evt) => {
    bot.sendMessage({
        to: channelID,
        message: 'Dong!'
    });
}

exports.s = (bot, args, user, userID, channelID, message, evt) => {
    bot.sendMessage({
        to: channelID,
        message: `Please na bhai na. Abar P marish na.`
    });
}

exports.placements = (bot, args, user, userID, channelID, message, evt) => {
    bot.sendMessage({
        to: channelID,
        message: `Lol lol kotha bolis na.`
    });
}

exports.girlfriend = (bot, args, user, userID, channelID, message, evt) => {
    bot.sendMessage({
        to: channelID,
        message: `Gaanja kheyechis?`
    });
}

exports.timothy =
exports.souravyadav =
exports.caseyneistat = (bot, args, user, userID, channelID, message, evt) => {
    bot.sendMessage({
        to: channelID,
        message: `Seta abar k?`
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

exports.voice = (bot, args, user, userID, channelID, message, evt) => {

    const user_voice_channel_id = bot.servers[bot.channels[channelID].guild_id].members[userID].voice_channel_id;
    if (!user_voice_channel_id) {
        return bot.sendMessage({
            to: channelID,
            message: `Toke kono voice channel e khujei pelam na :disappointed_relieved:`
        });
    }

    bot.sendMessage({
        to: channelID,
        message: `Ok aschi bhai.`
    });

    bot.joinVoiceChannel(user_voice_channel_id);
}

const youtube = {
    search: require('youtube-search'),
    stream: require('ytdl-core')
};

const he = require('he'); // HTML Encoder

exports.baja = (bot, args, user, userID, channelID, message, evt) => {
    const query = preprocess_specials(args.join(' '));
    youtube.search(query, { maxResults: 1, key: process.env.YOUTUBE_API_KEY}, (err, results) => {
        if(err) return console.log(err);

        const user_voice_channel_id = bot.servers[bot.channels[channelID].guild_id].members[userID].voice_channel_id;
        if (!user_voice_channel_id) {
            return bot.sendMessage({
                to: channelID,
                message: `Toke kono voice channel e khujei pelam na :disappointed_relieved:`
            });
        }

        bot.sendMessage({
            to: channelID,
            message: `Ok bajachhi  :drum:  \`${he.decode(results[0].title)}\``
        });

        const url = results[0].link;
        bot.joinVoiceChannel(user_voice_channel_id, (err) => {
            bot.getAudioContext(user_voice_channel_id, (err, stream) => {
                if(err) return console.log(err);

                youtube.stream(url)
                    .on('error', (err) => handleError(bot, args, user, userID, channelID, message, evt))
                    .pipe(stream, {end: false});
            });
        });
    });

const preprocess_specials = (query) => {
    if (['soumit', 'bot', 'anthem'].every(word => query.includes(word))) {
        return 'gaand me danda';
    }
}

exports.bondo = (bot, args, user, userID, channelID, message, evt) => {

    const bot_voice_channel_id = bot.servers[bot.channels[channelID].guild_id].members[bot.id].voice_channel_id
    if (!bot_voice_channel_id) {
        return bot.sendMessage({
            to: channelID,
            message: `Already bondo to bhai. Kano P marchis? :disappointed_relieved:`
        });
    }

    bot.getAudioContext(bot_voice_channel_id, (err, stream) => {
        if (err) {
            handleError(bot, args, user, userID, channelID, message, evt);
            return console.log(err);
        }

        bot.sendMessage({
            to: channelID,
            message: `Ok sorry bhai. :disappointed_relieved:`
        });

        stream.stop();

    });
}

exports.bero = (bot, args, user, userID, channelID, message, evt) => {
    const bot_voice_channel_id = bot.servers[bot.channels[channelID].guild_id].members[bot.id].voice_channel_id

    if (!bot_voice_channel_id) {
        return bot.sendMessage({
            to: channelID,
            message: `Already berie achi to bhai. Kano P marchis? :disappointed_relieved:`
        });
    }

    bot.leaveVoiceChannel(bot_voice_channel_id, (err) => {
        if (err) {
            handleError(bot, args, user, userID, channelID, message, evt);
            return console.log(err);
        }
        bot.sendMessage({
            to: channelID,
            message: `Ok berochhi bhai. :disappointed_relieved:`
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
        message: `R bolish na. Jibon tai akta black hole.`
    });
}

const handleError = (bot, args, user, userID, channelID, message, evt) => {
    bot.sendMessage({
        to: channelID,
        message: `Sorry bhai kichu gondogol hoe gelo. Please P marish na jeno. :cold_sweat: <@${userID}>`
    });
}
