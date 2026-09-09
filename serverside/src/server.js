import express from 'express'
import dbConnect from './config/connectDB.js'
import dotenv from 'dotenv'
import patientRoute from './routes/patient.routes.js'
import doctorRoute from './routes/doctor.routes.js'
import appointmentRouter from './routes/appointment.routes.js'
import morgan from 'morgan';

dotenv.config();
const app = express();


console.log('Server done...')
// Database Connection
dbConnect();
console.log('Database Connection done...')

// Middleware
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', patientRoute);
app.use('/api', doctorRoute);
app.use('/api', appointmentRouter);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Hospital Management System API is running'
    });
});
app.listen(process.env.SERVER_PORT || 8080, () => {
    console.log(`server is started `)
})