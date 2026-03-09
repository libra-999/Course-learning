import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import ABAPayment from './routes/payment/ABAPayment.js'
import StripPayment from './routes/payment/StripPayment.js'
import CryptoPayment from './routes/payment/CryptoPayment.js'
import NowPayment from './routes/payment/NowPayment.js'
import Rustfs from './routes/file/rustfs.js'

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
