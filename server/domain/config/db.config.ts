import mongoose, { type ConnectOptions } from 'mongoose'
import { env } from '@/domain/config/app.environment.js'
import { log4j } from '@/domain/logger/logger.js'
import { fileURLToPath } from 'node:url'

mongoose.set('strictQuery', true)
const CONNECTION = `${env.MONGO_NAME}://${env.MONGO_SERVER}:${env.MONGO_PORT}/${env.MONGO_DATABASE}`
const logger = log4j(fileURLToPath(import.meta.url))

export const DBConnect = async () => {
	const DB = mongoose.connection
	DB.on('connected', () => {
		logger.info(`==> MongoDB connected, ENV:${env.NODE_ENV}` , )
	})
	DB.on('reconnected', () => {
		logger.warn(`==> MongoDB connection again, ENV:${env.NODE_ENV}`)
	})
	DB.on('error', ()=> {
		logger.error(`==> MongoDB connect have something wrong, ENV:${env.NODE_ENV}`)
	})
	DB.on('close',()=> {
		logger.warn(`==> MongoDB connection close, ENV:${ env.NODE_ENV}`,)
	})
	DB.on('disconnected', () => {
		logger.warn(`==> MongoDB disconnected, ==>ENV:${env.NODE_ENV}`)
		// retry timeout
		setTimeout(()=> {
			mongoose.connect(CONNECTION, {
				socketTimeoutMS: 3000, // 3s
				connectTimeoutMS: 3000, // 3s
				maxPoolSize: 5, // 5 times
				serverSelectionTimeoutMS: 5000,
			} as ConnectOptions).then(r => logger.info(`Back to connected , ${r.connection}`))
		}, 3000)
	})
	await mongoose.connect(CONNECTION)
}
