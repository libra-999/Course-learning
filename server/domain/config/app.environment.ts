import dotenv from 'dotenv'

const environment = process.env.NODE_ENV || "dev"
dotenv.config({
	path: `.env.${environment}` // load env dynamic
})
export const env = process.env
export const isDEV = environment === "dev"
export const isPROD = environment === "prod"