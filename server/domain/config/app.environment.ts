import dotenv from 'dotenv'

dotenv.config({
	path: `.env.${process.env.NODE_ENV || "dev"}` // custom env if dont have .env
})
const environment = process.env.NODE_ENV
export const env = process.env
export const isDEV = environment === "prod"
export const isPROD = environment === "prod"