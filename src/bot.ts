import { getEnvVar } from './services/config';
import eris from 'eris';
import { foodService } from './services/food';

const bot = new eris.Client(getEnvVar('DISCBOT_TOKEN'));

bot.on('ready', () => {
  console.log('Connected and ready.');
});

bot.on('messageCreate', (msg) => {
  console.log(`messageCreate : ${msg.author.username} : ${msg.content}`);
  let content: null | string = null;
  if (msg.content.toLowerCase() === 'what should i eat?') {
    content = foodService.getFood();
  }
  if (content !== null) {
    console.log(`replying with : ${content}`);
    bot.createMessage(msg.channel.id, {
      content,
      messageReference: {
        messageID: msg.id,
      },
    });
  } else {
  }
});

bot.on('error', (err) => {
  console.warn(err);
});

bot.connect();
