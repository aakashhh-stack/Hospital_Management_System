import express from 'express'
import dbConnect from './config/connectDB.js'
import dotenv from 'dotenv';
dotenv.config();
const app = express()

// Database Connection
dbConnect()

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use('api',patientRouter)

app.listen(process.env.SERVER_PORT || 8080, () => {
    console.log(`server is started `)
})