import { Context, EventBridgeEvent } from 'aws-lambda';
import { DiscordMessage, handleMessage } from './handleMessage';

export const handler = async (
  event: EventBridgeEvent<string, DiscordMessage>,
  context: Context
) => {
  try {
    await handleMessage(event.detail);
  } catch (error: unknown) {
    console.error(error);
    console.info(`event: ${JSON.stringify(event)}`);
  }
};
