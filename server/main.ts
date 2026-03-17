import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import {  isDEV, isPROD } from '@/domain/config/app.environment.js'
import AbaPayment from '@/presentation/routes/payment/abaPayment.js'
import StripPayment from '@/presentation/routes/payment/stripPayment.js'
import CryptoPayment from '@/presentation/routes/payment/cryptoPayment.js'
import Rustfs from '@/presentation/routes/file/rustfs.js'
import NowPayment from '@/presentation/routes/payment/nowPayment.js'
import { DBConnect } from '@/domain/config/db.config.js'
import {  log4j } from '@/domain/logger/logger.js'
import { fileURLToPath } from 'node:url'

const app = express()
const __dirname = fileURLToPath(import.meta.url)
const logger = log4j(__dirname)

app.use(cors())
app.use(bodyParser.json())

//  Router Feature
app.use('/aba', AbaPayment)
app.use('/stripe', StripPayment)
app.use('/crypto', CryptoPayment)
app.use('/nowpay', NowPayment)
app.use('/file', Rustfs)
/* Test Route */
app.get('/', (req,res) => {
	res.send('Test Connected ...')
})

// connecting to DB
DBConnect().then(() => {
	if (isDEV) {
		logger.info("==> No life time for token")
	}
	if (isPROD) {
		logger.info("==> Implement the specific date and object base on real information")
	}
})
app.listen(8900)
