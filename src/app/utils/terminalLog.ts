type TerminalLogLevel = 'log' | 'info' | 'warn' | 'error'

const stringifyMessage = (args: unknown[]): string =>
  args
    .map((arg) => {
      if (typeof arg === 'string') return arg
      try {
        return JSON.stringify(arg)
      } catch {
        return String(arg)
      }
    })
    .join(' ')

export const terminalLog = (
  level?: TerminalLogLevel,
  source?: string,
  ...args: unknown[]
) => {
  if (!import.meta.env.DEV) return

  const message = stringifyMessage(args)

  fetch('/__client-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ level, source, message }),
  }).catch(() => {
    // Ignore network failures in logger to avoid affecting app behavior.
  })
}
