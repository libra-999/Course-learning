import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { env, isDEV, isPROD } from '@/domain/config/app.environment.js'
import AbaPayment from '@/presentation/routes/payment/abaPayment.js'
import StripPayment from '@/presentation/routes/payment/stripPayment.js'
import CryptoPayment from '@/presentation/routes/payment/cryptoPayment.js'
import Rustfs from '@/presentation/routes/file/rustfs.js'
import NowPayment from '@/presentation/routes/payment/nowPayment.js'
import { DBConnect } from '@/domain/config/db.config.js'

const app = express();
const CONNECTION = `${env.MONGO_NAME}://${env.MONGO_SERVER}:${env.MONGO_PORT}/${env.MONGO_DATABASE}`

app.use(cors())
app.use(bodyParser.json())

//  Router Feature
app.use("/aba", AbaPayment)
app.use("/stripe", StripPayment)
app.use("/crypto", CryptoPayment)
app.use("/nowpay",NowPayment)
app.use("/file", Rustfs)

if (isDEV){
	console.log(`unlimited life of token `)
}
if (isPROD){
	console.log(`implement the specific date and object base on real information`)
}

// connecting to DB
await DBConnect(CONNECTION)
app.listen(8900)
