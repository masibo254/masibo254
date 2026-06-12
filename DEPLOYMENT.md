# Fleet Management System - Deployment Guide

## 🚀 Quick Deployment to Render.com

### Step 1: Create Accounts
1. **MongoDB Atlas** - [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create free M0 cluster
   - Get connection string

2. **Render** - [render.com](https://render.com)
   - Sign up with GitHub
   - Grant repo permissions

### Step 2: Deploy Backend
1. Go to Render Dashboard
2. Click **+ New** → **Web Service**
3. Select your GitHub repo
4. Configure:
   ```
   Name: fleet-management-backend
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```
5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fleet-management
   NODE_ENV=production
   JWT_SECRET=your_secret_key_here
   PORT=5000
   ```
6. Click Create

### Step 3: Deploy Frontend
1. Click **+ New** → **Static Site**
2. Select your GitHub repo
3. Configure:
   ```
   Name: fleet-management-frontend
   Build Command: cd frontend && npm install && npm run build
   Publish Directory: frontend/build
   ```
4. Click Create

### Step 4: Enable Auto-Deploy
- Every push to GitHub automatically triggers redeploy
- Monitor deployment status in Render dashboard

## 📝 Making Changes

```bash
# 1. Make changes locally
# 2. Commit and push
git add .
git commit -m "Your changes"
git push origin main

# 3. Render redeploys automatically (5-10 minutes)
```

## 🎯 Access Your Application

- **Frontend**: `https://fleet-management-frontend.onrender.com`
- **Backend API**: `https://fleet-management-backend.onrender.com/api`
- **Health Check**: `https://fleet-management-backend.onrender.com/api/health`

## 🔑 Key Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### NOC Operations
- `GET /api/noc/dashboard` - NOC dashboard overview
- `GET /api/noc/tracking/:vehicleId` - Real-time tracking
- `GET /api/noc/daily-report/:driverId` - Daily driver report
- `POST /api/noc/daily-report` - Create daily report
- `GET /api/noc/weekly-report/:driverId/:weekStartDate` - Weekly report
- `POST /api/noc/weekly-report` - Create weekly report
- `GET /api/noc/drivers` - Get all drivers

## 👥 User Roles

1. **Driver** - Can view own trip data and reports
2. **Fleet NOC** - Monitor vehicles via tracker, analyze dashcam, create daily/weekly reports
3. **Fleet Manager** - Manage drivers, vehicles, NOC staff
4. **Admin** - Full system access

## 🎬 Getting Started with NOC

1. Register as Fleet NOC user
2. Go to NOC Dashboard
3. View real-time vehicle tracking
4. Select driver to view daily report
5. Create comprehensive daily/weekly reports
6. Monitor compliance and safety metrics

## 💡 Features Included

✅ Real-time vehicle GPS tracking
✅ Tracker data analysis (speed, fuel, acceleration)
✅ Dashcam incident detection
✅ Daily driver behavior reports
✅ Weekly compliance reports
✅ Safety scoring system
✅ Multi-user role-based access
✅ Fleet management
✅ Vehicle maintenance tracking
✅ Trip analytics

## 🆘 Troubleshooting

### Backend won't start
- Check MongoDB URI is correct
- Verify all dependencies installed
- Check Render logs

### Frontend shows blank page
- Check `REACT_APP_API_URL` environment variable
- Clear browser cache
- Check browser console for errors

### CORS errors
Add to `backend/server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.onrender.com']
}));
```

## 🎉 You're Live!

Your Fleet Management System is now deployed and ready for continuous modifications. Every push to GitHub automatically redeploys! 🚀
