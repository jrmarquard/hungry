import { Client } from 'eris';
import { getEnvVar } from './config';

let bot: undefined | Client = undefined;

export const getBot: (fn?: (msg: any) => any) => Promise<Client> = async (
  fn
) => {
  return new Promise((res) => {
    if (!bot) {
      console.info(`[init] Creating bot`);
      bot = new Client(getEnvVar('DISCBOT_TOKEN'));

      bot.on('ready', () => {
        console.log('[init] Bot connected and ready.');
        res(bot);
      });

      if (fn) {
        console.info(`[init] Attaching messageCreate fn`);
        bot.on('messageCreate', fn);
      }

      bot.on('error', (err) => {
        console.warn(err);
      });

      bot.connect();
      console.info(`[init] Bot created`);
    } else {
      res(bot);
    }
  });
};
