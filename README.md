# Fleet Management System

A comprehensive fleet management solution for tracking vehicles, drivers, maintenance, and fuel consumption.

## Features

- 🚗 **Vehicle Management** - Add, edit, and track all fleet vehicles
- 👥 **Driver Management** - Manage drivers and assign them to vehicles
- 📍 **GPS Tracking** - Real-time vehicle location tracking
- ⛽ **Fuel Management** - Track fuel consumption and costs
- 🔧 **Maintenance Scheduling** - Schedule and track vehicle maintenance
- 📊 **Analytics & Reports** - Generate insights and performance reports
- 🔐 **User Authentication** - Secure login and role-based access

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Real-time**: Socket.io

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/masibo254/masibo254.git
cd masibo254

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

```bash
# Start MongoDB
mongod

# Terminal 1: Start backend server
cd backend
npm start

# Terminal 2: Start frontend dev server
cd frontend
npm start
```

Access the application at `http://localhost:3000`

## Project Structure

```
fleet-management-system/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## API Endpoints

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Create new vehicle
- `GET /api/vehicles/:id` - Get vehicle details
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Drivers
- `GET /api/drivers` - Get all drivers
- `POST /api/drivers` - Add new driver
- `PUT /api/drivers/:id` - Update driver
- `DELETE /api/drivers/:id` - Remove driver

### Maintenance
- `GET /api/maintenance` - Get maintenance records
- `POST /api/maintenance` - Schedule maintenance
- `PUT /api/maintenance/:id` - Update maintenance record

## License

MIT
