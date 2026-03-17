import mongoose, { type ConnectOptions } from 'mongoose'
import { env } from '@/domain/config/app.environment.js'

mongoose.set('strictQuery', true)
const CONNECTION = `${env.MONGO_NAME}://${env.MONGO_SERVER}:${env.MONGO_PORT}/${env.MONGO_DATABASE}`
export const DBConnect = async () => {
	const DB = mongoose.connection
	DB.on('connected', () => {
		console.log('==> MongoDB connected \n ==> ENV:' , env.NODE_ENV)
	})
	DB.on('reconnected', () => {
		console.log('==> MongoDB connection again... \n ==> ENV:', env.NODE_ENV)
	})
	DB.on('error', ()=> {
		console.log(`==> MongoDB connect have something wrong  \n ==> ENV:${env.NODE_ENV}`)
	})
	DB.on('close',()=> {
		console.log('==> MongoDB connection closed \n ==>ENV:', env.NODE_ENV)
	})
	DB.on('disconnected', () => {
		console.log('==> MongoDB disconnected \n ==>ENV:', env.NODE_ENV)
		// retry timeout
		setTimeout(()=> {
			mongoose.connect(CONNECTION, {
				socketTimeoutMS: 3000,
				connectTimeoutMS: 3000,
				maxPoolSize: 10,
				serverSelectionTimeoutMS: 5000,
			} as ConnectOptions).then(r => console.log(`Back to connected , ${r}`))
		}, 3000)
	})
	await mongoose.connect(CONNECTION)
}
