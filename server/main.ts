import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { isDEV, isPROD } from '@/domain/config/app.environment.js'
import AbaPayment from '@/application/routes/payment/abaPayment.js'
import StripPayment from '@/application/routes/payment/stripPayment.js'
import CryptoPayment from '@/application/routes/payment/cryptoPayment.js'
import Rustfs from '@/application/routes/file/rustfs.js'
import NowPayment from '@/application/routes/payment/nowPayment.js'

const app = express();
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
app.listen(8900)
