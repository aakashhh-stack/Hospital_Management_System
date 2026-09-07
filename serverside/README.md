# Hospital Management System

A backend REST API for managing patients, doctors, and appointments. Built with Node.js, Express.js, and MongoDB, with authentication, role-based authorization, validation, and soft-delete functionality.

## Features

### Authentication & Authorization

* Patient and doctor registration and login.
* JWT-based authentication.
* Role-based authorization for patients, doctors, and admins.
* Password hashing using bcrypt.

### Patient Management

* Register and login patients.
* View and update patient profiles.
* Soft-delete patient accounts.
* Admin can list, activate/deactivate, delete, and restore patients.

### Doctor Management

* Register and login doctors.
* View and update doctor profiles.
* Update doctor availability.
* Soft-delete doctor accounts.
* Admin can list, activate/deactivate, delete, and restore doctors.

### Appointment Management

* Patients can book appointments with doctors.
* Check doctor availability before booking.
* Prevent duplicate appointments for the same doctor and time.
* Patients can view their appointments.
* Doctors can view their appointments.
* Admin can list, update status, and soft-delete appointments.
* Controlled appointment status transitions.

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Authentication:** JWT
* **Password Hashing:** bcrypt
* **Validation:** Joi
* **Environment Variables:** dotenv

## Project Structure

```text
hospital-management-system/
├── client/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   │   ├── patient.controller.js
│   │   │   ├── doctor.controller.js
│   │   │   ├── appointment.controller.js
│   │   │   └── admin.controller.js
│   │   │
│   │   ├── models/
│   │   │   ├── patient.model.js
│   │   │   ├── doctor.model.js
│   │   │   └── appointment.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── patient.route.js
│   │   │   ├── doctor.route.js
│   │   │   ├── appointment.route.js
│   │   │   └── admin.route.js
│   │   │
│   │   ├── validations/
│   │   │   ├── patient.validation.js
│   │   │   ├── doctor.validation.js
│   │   │   └── appointment.validation.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── validation.middleware.js
│   │   │
│   │   └── server.js
│   │
│   ├── package.json
│   ├── .env
│ 
│
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/aakashhh-stack/Hospital_Management_System.git
cd hospital-management-system/server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the development server

```bash
npm run dev
```

The server will run on:

```text
http://localhost:5000
```

## API Endpoints

### Patient Routes

| Method | Endpoint                    | Description               |
| ------ | --------------------------- | ------------------------- |
| POST   | `/api/patients/register`     | Register a patient        |
| POST   | `/api/patients/login`        | Login patient             |
| GET    | `/api/patients/profile`      | Get patient profile       |
| PATCH  | `/api/patients/profile`      | Update patient profile    |
| PATCH  | `/api/patients/delete`       | Delete patient profile    |
| GET    | `/api/patients/appointments` | View patient appointments |
| POST   | `/api/patients/appointments` | Book an appointment       |

### Doctor Routes

| Method | Endpoint                   | Description                |
| ------ | -------------------------- | -------------------------- |
| POST   | `/api/doctor/register`     | Register a doctor          |
| POST   | `/api/doctor/login`        | Login doctor               |
| GET    | `/api/doctor/profile`      | Get doctor profile         |
| PATCH  | `/api/doctor/profile`      | Update doctor profile      |
| PATCH  | `/api/doctor/availability` | Update doctor availability |
| PATCH  | `/api/doctor/delete`       | Delete doctor profile      |
| GET    | `/api/doctor/appointments` | View doctor appointments   |

### Admin Routes

| Method | Endpoint                                        | Description               |
| ------ | ----------------------------------------------- | ------------------------- |
| GET    | `/api/admin/doctors`                            | List all doctors          |
| PATCH  | `/api/admin/doctors/:doctorId/status`           | Update doctor status      |
| PATCH  | `/api/admin/doctors/:doctorId/delete`           | Soft-delete doctor        |
| PATCH  | `/api/admin/doctors/:doctorId/restore`          | Restore doctor            |
| GET    | `/api/admin/patients`                           | List all patients         |
| PATCH  | `/api/admin/patients/:patientId/status`         | Update patient status     |
| PATCH  | `/api/admin/patients/:patientId/delete`         | Soft-delete patient       |
| PATCH  | `/api/admin/patients/:patientId/restore`        | Restore patient           |
| GET    | `/api/admin/appointments`                       | List all appointments     |
| PATCH  | `/api/admin/appointments/:appointmentId/status` | Update appointment status |
| PATCH  | `/api/admin/appointments/:appointmentId/delete` | Soft-delete appointment   |

> **Note:** Update endpoint paths in this README if your actual route prefixes or names differ.

## Appointment Status Flow

```text
pending
   ├── confirmed
   │      ├── completed
   │      └── cancelled
   └── cancelled
```

Completed and cancelled appointments cannot be moved to another status.

## Validation

Request data is validated using Joi before reaching the controller.

Examples of validation rules:

* Patient email must be valid.
* Password must meet the required length.
* Phone number must contain 10 digits.
* Doctor consultation fee must be at least ₹100.
* Appointment reason must not exceed 35 characters.
* Appointment status must be one of the allowed values.

## Security

* Passwords are hashed before being stored.
* JWT protects authenticated routes.
* Role-based authorization restricts admin operations.
* Passwords are excluded from API responses.
* Soft deletion preserves records instead of permanently removing them.
* Protected routes validate the authenticated user before performing operations.

## Future Improvements

* Admin dashboard with appointment statistics.
* Appointment pagination and filtering.
* Email notifications.
* Doctor schedule and time-slot management.
* Automated testing.
* API documentation using Swagger.
* Docker deployment.
* Frontend integration.

## Author

**Aakash Pandey**
