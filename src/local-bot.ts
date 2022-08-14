import { handleMessage } from './event_handlers/handleMessage';
import { getBot } from './services/getBot';

(async () => {
  const fn = async (msg: any) => {
    await handleMessage({
      content: msg.content,
      id: msg.id,
      author: {
        id: msg.author.id,
        name: msg.author.username,
      },
      channel: {
        id: msg.channel.id,
        name: (msg.channel as any).name,
      },
      guild: {
        id: msg.guildID,
        name: undefined,
      },
    });
  };

  const bot = await getBot(fn);
  console.info(`got bot`);
})();
