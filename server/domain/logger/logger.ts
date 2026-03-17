import pino from 'pino'
import path from 'path'
import { fileURLToPath } from 'node:url'

const logger = pino({
	formatters: {
		log(object) {
			if (typeof object.module === 'string'){
				object.module = object.module.toLowerCase()
			}
			return object;
		}
	},
	transport: {
		target: "pino-pretty",
		options: {
			ignore: "pid,hostname,module", // hostname= machine's name, pid = processID
			colorize: true,
			messageFormat: "[{module}] {msg}"
		}
	}
})

export const _dirname = fileURLToPath(import.meta.url)
export const log4j = (filename: string) => {
	return logger.child({
		module: path.basename(filename)
	})
}
