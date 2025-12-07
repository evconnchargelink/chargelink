# ⚡ EV Charging Station Platform

A comprehensive EV charging station booking platform with web and mobile applications. Find, book, and pay for charging stations in real-time.

## 📁 Project Structure

```
├── web/          # React web application
├── app/          # React Native mobile app (Expo)
├── server/       # Express backend server
└── README.md
```

## 🛠️ Tech Stack

### Web (`/web`)
- React + TypeScript
- Redux
- Tailwind CSS
- Material UI
- Google Maps SDK

### Mobile App (`/app`)
- React Native + TypeScript
- Expo Go
- NativeWind
- Google Maps React Native SDK

### Server (`/server`)
- Express + TypeScript
- MongoDB / PostgreSQL
- JWT Authentication
- Payment Gateway Integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB or PostgreSQL
- Expo CLI (for mobile development)

### Environment Variables

Create `.env` files in each directory:

#### `/server/.env`
```env
PORT=8000
NODE_ENV=development
MONGO_URI=your_mongo_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

GOOGLE_MAPS_API_KEY=your_google_maps_api_key
PAYMENT_GATEWAY_KEY=your_payment_gateway_key
PAYMENT_GATEWAY_SECRET=your_payment_gateway_secret

ELEVEN_LABS_API_KEY=your_elevenlabs_key
GCP_PROJECT_ID=your_gcp_project_id
```

#### `/web/.env`
```env
VITE_BACKEND_BASE_URL=http://localhost:8000/api/v1
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_PAYMENT_GATEWAY_KEY=your_payment_gateway_key
```

#### `/app/.env`
```env
EXPO_PUBLIC_API_URL=http://localhost:8000/api/v1
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
EXPO_PUBLIC_PAYMENT_GATEWAY_KEY=your_payment_gateway_key
```

## 📦 Installation

### Install all dependencies

```bash
# Install server dependencies
cd server
npm install

# Install web dependencies
cd ../web
npm install

# Install mobile app dependencies
cd ../app
npm install
```

## 🏃‍♂️ Running the Application

### Start Backend Server

```bash
cd server
npm run dev
```

Server will run on `http://localhost:5000`

### Start Web Application

```bash
cd web
npm start
```

Web app will run on `http://localhost:3000`

### Start Mobile Application

```bash
cd app
npx expo start
```

Scan QR code with Expo Go app on your phone or press:
- `a` - Open on Android emulator
- `i` - Open on iOS simulator
- `w` - Open in web browser

## 📝 Available Scripts

### Server (`/server`)

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm run test         # Run tests
npm run lint         # Run ESLint
```

### Web (`/web`)

```bash
npm start            # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Run ESLint
```

### App (`/app`)

```bash
npx expo start       # Start Expo development server
npm run android      # Start on Android
npm run ios          # Start on iOS
npm run web          # Start on web
npm run test         # Run tests
```


## 🚀 Deployment

### Backend (Server)

```bash
cd server
npm run build
npm start
```

Deploy to: GCP, AWS, Heroku, Railway, etc.

### Web Application

```bash
cd web
npm run build
```

Deploy `build/` folder to: Vercel, Netlify, AWS S3, etc.

### Mobile Application

```bash
cd app
eas build --platform android
eas build --platform ios
```

### Frontend deployment commits for vercel
- readme updated & deploy server
- readme updated for client deploy
