type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const order: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40
}

const currentLevel = (process.env.LOG_LEVEL as LogLevel | undefined) ?? 'info'

function canLog(level: LogLevel) {
  return order[level] >= order[currentLevel]
}

export const logger = {
  debug: (message: string) => canLog('debug') && console.debug(`[debug] ${message}`),
  info: (message: string) => canLog('info') && console.info(`[info] ${message}`),
  warn: (message: string) => canLog('warn') && console.warn(`[warn] ${message}`),
  error: (message: string) => canLog('error') && console.error(`[error] ${message}`)
}
