import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import ABAPayment from './payment/ABAPayment.js'
import StripPayment from './payment/StripPayment.js'

const app = express();
app.use(cors())
app.use(bodyParser.json())

//  Router Feature
app.use("/aba", ABAPayment)
app.use("/stripe", StripPayment)

app.listen(8900)
