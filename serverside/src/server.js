import express from 'express'
import dbConnect from './config/connectDB.js'
import dotenv from 'dotenv'
import patientRoute from './routes/patient.routes.js'
import doctorRoute from './routes/doctor.routes.js'
import appointmentRouter from './routes/appointment.routes.js'
import morgan from 'morgan';

dotenv.config();
const app = express();

// Database Connection
dbConnect();

// Middleware
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', patientRoute);
app.use('/api', doctorRoute);
app.use('/api',appointmentRouter);

app.listen(process.env.SERVER_PORT || 8080, () => {
    console.log(`server is started `)
})