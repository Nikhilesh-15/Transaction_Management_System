# Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)

## Step-by-Step Setup

1. **Install all dependencies**:
   ```bash
   npm run install-all
   ```

2. **Create `.env` file in root directory**:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/transaction-app
   JWT_SECRET=your-secret-key-change-this-in-production
   ```

3. **Start MongoDB** (if running locally):
   - On Windows: Usually MongoDB runs as a service automatically
   - On Linux/Mac: `sudo systemctl start mongod` or `brew services start mongodb-community`

4. **Run the application**:
   ```bash
   npm run dev
   ```
   This will start both the backend (port 5000) and frontend (port 3000)

5. **Access the application**:
   - Open your browser and go to: `http://localhost:3000`

## Troubleshooting

- **MongoDB connection error**: Make sure MongoDB is running or update the MONGO_URI in `.env`
- **Port already in use**: Change the PORT in `.env` or kill the process using that port
- **CORS errors**: The backend is configured to accept requests from localhost:3000

