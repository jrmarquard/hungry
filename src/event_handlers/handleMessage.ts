import { Client } from 'eris';
import { getEnvVar } from '../services/config';
import { foodService } from '../services/food';
import { getBot } from '../services/getBot';

export type DiscordMessage = {
  content: string;
  id: string;
  author: {
    id: string;
    name?: string;
  };
  channel: {
    id: string;
    name: string;
  };
  guild: {
    id: string;
    name?: string;
  };
};

export const handleMessage = async (msg: DiscordMessage) => {
  const bot = await getBot();

  console.log(`messageCreate : ${msg.author.name} : ${msg.content}`);

  let content: null | string = null;

  if (msg.content.toLowerCase() === 'what should i eat?') {
    content = foodService.getFood();
  }

  if (content !== null) {
    console.log(`replying with : ${content}`);
    try {
      await bot.createMessage(msg.channel.id, {
        content,
        messageReference: {
          messageID: msg.id,
        },
      });
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }
};
