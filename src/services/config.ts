export type BotVars =
  | 'DISCBOT_CLIENT_ID'
  | 'DISCBOT_CLIENT_SECRET'
  | 'DISCBOT_APP_ID'
  | 'DISCBOT_PUB_KEY'
  | 'DISCBOT_TOKEN';

export const getEnvVar = (s: BotVars): string => {
  const _s = process.env[s];
  if (!_s) {
    throw new Error(`${s} is missing from env var`);
  }
  return _s;
};
