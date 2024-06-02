import pino from 'pino';

/**
 * ESM version of logger helper,
 * for next.config.mjs to be able to consume it.
 */

const logLevelData = {
  '*': 'silent',
  debug: 'debug',
  info: 'info',
};

const logLevels = new Map(Object.entries(logLevelData));

export const getLogLevel = (/** @type {string} */ logger) =>
  logLevels.get(logger) || logLevels.get('*') || 'info';

export const getLogger = (/** @type {string} */ name) =>
  pino({ level: getLogLevel(name), name });
