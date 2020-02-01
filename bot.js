var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Cosas para el comando memes
var randomPuppy = require('random-puppy');
var reddit = ["meme", "animemes", "animememes", "MemesOfAnime", "AnimeFunny", "dankmemes", "dankmeme", "wholesomememes", "MemeEconomy", "techsupportanimals", "meirl", "me_irl", "2meirl4meirl", "AdviceAnimals"]
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
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !bot
            case 'bot':
                bot.sendMessage({
                    to: channelID,
                    message: '!human'
                });
            break;
            // !human
            case 'human':
                bot.sendMessage({
                    to: channelID,
                    message: 'Aún no soy un humano, solamente un simple bot...'
                });
            break;
            // !meme
            case 'meme':
				let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
				randomPuppy(subreddit).then(url => {
					bot.sendMessage({
						to: channelID,
						message: url,
					});
				}).catch(err => console.error(err));
            break;
			// !animeme
            case 'animeme':
				randomPuppy('animemes').then(url => {
					bot.sendMessage({
						to: channelID,
						message: url,
					});
				}).catch(err => console.error(err));
            break;
         }
     }
});