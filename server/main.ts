import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import ABAPayment from './application/routes/payment/abaPayment.ts'
import StripPayment from './application/routes/payment/stripPayment.ts'
import CryptoPayment from './application/routes/payment/cryptoPayment.ts'
import NowPayment from './application/routes/payment/nowPayment.ts'
import Rustfs from './application/routes/file/rustfs.ts'

const app = express();
app.use(cors())
app.use(bodyParser.json())

//  Router Feature
app.use("/aba", ABAPayment)
app.use("/stripe", StripPayment)
app.use("/crypto", CryptoPayment)
app.use("/nowpay",NowPayment)
app.use("/file", Rustfs)
app.listen(8900)
