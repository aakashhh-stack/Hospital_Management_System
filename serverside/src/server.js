import express from 'express'
import dbConnect from './config/connectDB.js'
import dotenv from 'dotenv'
import patientRoute from './routes/patient.routes.js'
import doctorRoute from './routes/doctor.routes.js'
dotenv.config()
const app = express();

// Database Connection
dbConnect();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', patientRoute);
app.use('/api', doctorRoute);

app.listen(process.env.SERVER_PORT || 8080, () => {
    console.log(`server is started `)
})