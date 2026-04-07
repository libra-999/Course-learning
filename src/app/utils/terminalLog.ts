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

// create sample server log in default terminal client side
export const clientLogPlugin = () => ({
	name: 'client-log-plugin',
	configureServer,
})
const configureServer = (server: any) => {
	server.middlewares.use('/__client-log', (req: any, res: any, next: any) => {
		if (req.method !== 'POST') {
			next()
			return
		}

		let rawBody = ''
		req.on('data', (chunk: Buffer | string) => {
			rawBody += chunk.toString()
		})

		req.on('end', () => {
			try {
				const payload = JSON.parse(rawBody || '{}') as {
					level?: 'log' | 'info' | 'warn' | 'error'
					message?: string
					source?: string
				}

				const level = payload.level ?? 'log'
				const source = payload.source ?? 'client'
				const message = payload.message ?? '(empty)'

				const allowedLevel = ['log', 'info', 'warn', 'error'].includes(
					level,
				)
					? level
					: 'log'
				;(console as any)[allowedLevel](`[client:${source}] ${message}`)
			} catch {
				console.warn(`[client] invalid log payload: ${rawBody}`)
			}

			res.statusCode = 204
			res.end()
		})
	})
}
