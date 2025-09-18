# Kerala Farm Assistant - Smart Farming Application

A comprehensive farming assistant app for Kerala farmers with AI-powered features.

## 🚀 Quick Setup & Run Commands

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure API Keys
Edit these files and replace the placeholder API keys with your real keys:

1. **src/components/DiseaseDetection.tsx** (line 60)
2. **src/components/BilingualChatbot.tsx** (line 136) 
3. **src/services/WeatherService.ts** (line 42)

Replace `"your-api-key-here"` with your actual OpenAI and WeatherAPI keys.

### Step 3: Run the Application
```bash
npm run dev
```

Application will open at: **http://localhost:8080**

## 📋 Get API Keys

**OpenAI API Key:** https://platform.openai.com/api-keys
**WeatherAPI Key:** https://www.weatherapi.com/signup.aspx

## 🎯 Features

✅ **AI Crop Disease Detection** - Upload crop photos for instant AI analysis
✅ **Real-time Weather** - Live weather data with farming alerts
✅ **Crop Recommendations** - Smart crop suggestions
✅ **Market Prices** - Kerala crop price updates
✅ **AI Chatbot** - Bilingual farming assistant (English/Malayalam)
✅ **Pest Alerts** - Dynamic pest and disease warnings
✅ **Farmer Profile** - Personal farming data management
✅ **Offline Support** - Works without internet for cached data

## 🔧 Additional Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# For mobile development
npx cap add android
npx cap sync
npx cap run android
```

## 📱 Mobile App Support
The app supports Android deployment via Capacitor for real smartphone usage.

For detailed setup instructions, see `SETUP_INSTRUCTIONS.md`

## Technologies Used

- React + TypeScript
- Vite
- Tailwind CSS + shadcn-ui
- OpenAI API (GPT-4 Vision)
- WeatherAPI.com
- Capacitor (Mobile)
