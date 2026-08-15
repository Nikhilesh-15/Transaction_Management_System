<<<<<<< HEAD
# Transaction_Management_System
=======
# Transaction Management Web App

A full-stack web application for managing transactions between users. Built with React, Express, and MongoDB.

## Features

- **User Authentication**: Register and login functionality
- **Initial Balance**: New users receive ₹1000 as dummy amount
- **Money Transfer**: Transfer money to other users
- **Balance View**: View current balance on dashboard and profile
- **Profile Management**: Edit user profile (name, phone, address)
- **Transaction History**: View recent transactions
- **Insufficient Balance Protection**: Prevents transfers when balance is insufficient

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs for password hashing

## Installation

1. **Install server dependencies**:
```bash
npm run install-server
```

2. **Install client dependencies**:
```bash
npm run install-client
```

Or install all at once:
```bash
npm run install-all
```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory
   - Add the following:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/transaction-app
   JWT_SECRET=your-secret-key-change-in-production
   ```

4. **Start MongoDB**:
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017`

## Running the Application

### Run both server and client together:
```bash
npm run dev
```

### Or run separately:

**Server only:**
```bash
npm run server
```

**Client only:**
```bash
npm run client
```

- Backend server runs on: `http://localhost:5000`
- Frontend React app runs on: `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Transactions
- `GET /api/transactions/balance` - Get user balance
- `POST /api/transactions/transfer` - Transfer money
- `GET /api/transactions/history` - Get transaction history
- `GET /api/transactions/users` - Get all users for transfer

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

## Usage

1. **Register**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Dashboard**: View your balance and recent transactions
4. **Transfer**: Select a recipient and transfer money
5. **Profile**: Edit your profile information

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Protected routes requiring authentication
- Balance validation before transfers
- Input validation on all endpoints

>>>>>>> origin/master
