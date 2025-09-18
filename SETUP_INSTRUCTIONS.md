# Kerala Farm Assistant - Setup & Run Instructions

## Prerequisites
Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **bun** package manager (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

## API Keys Setup

### 1. OpenAI API Key (For AI Chatbot & Disease Detection)
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key (starts with `sk-proj-...`)

### 2. WeatherAPI.com Key (For Weather Data)
1. Visit [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Copy the key

### 3. Configure API Keys in Code
Edit the file `src/config/constants.ts` and replace the placeholder keys:

```typescript
export const API_KEYS = {
  // Replace with your actual OpenAI API key
  OPENAI_API_KEY: "sk-proj-your-actual-openai-key-here",
  
  // Replace with your actual WeatherAPI key
  WEATHER_API_KEY: "your-actual-weatherapi-key-here",
} as const;
```

Also update these files:
- `src/components/DiseaseDetection.tsx` (line 60): Replace `sk-proj-your-openai-api-key-here`
- `src/components/BilingualChatbot.tsx` (line 136): Replace `sk-proj-your-openai-api-key-here`
- `src/services/WeatherService.ts` (line 42): Replace `your-weatherapi-key-here`

## Installation & Setup

### Step 1: Clone or Download the Project
```bash
# If using git
git clone <your-repository-url>
cd kerala-farm-assistant

# If you downloaded a ZIP file, extract it and navigate to the folder
cd kerala-farm-assistant
```

### Step 2: Install Dependencies
```bash
# Using npm (recommended)
npm install

# OR using bun (faster alternative)
bun install
```

### Step 3: Start Development Server
```bash
# Using npm
npm run dev

# OR using bun
bun run dev
```

The application will start and be available at:
**http://localhost:8080**

## Production Build

### Build for Production
```bash
# Create optimized build
npm run build

# OR with bun
bun run build
```

### Preview Production Build
```bash
# Preview the built app
npm run preview

# OR with bun
bun run preview
```

## Mobile App Development (Optional)

### For Android Development
```bash
# Add Android platform
npx cap add android

# Sync code with native project
npx cap sync

# Open in Android Studio
npx cap open android

# Or build and run directly
npx cap run android
```

### For iOS Development (macOS only)
```bash
# Add iOS platform
npx cap add ios

# Sync code with native project
npx cap sync

# Open in Xcode
npx cap open ios

# Or build and run directly
npx cap run ios
```

## Features Available

✅ **AI-Powered Crop Disease Detection** - Upload crop photos for instant analysis
✅ **Real-time Weather Data** - Location-based weather with farming alerts  
✅ **Crop Recommendations** - Based on season, soil, and climate
✅ **Market Prices** - Current Kerala crop prices
✅ **Multilingual Support** - English and Malayalam
✅ **AI Farm Assistant Chatbot** - Ask questions in both languages
✅ **Farmer Profile Management** - Personal farming data storage
✅ **Push Notifications Setup** - Alerts for weather, prices, diseases
✅ **Dynamic Pest Alerts** - Real-time pest and disease warnings
✅ **Offline Data Caching** - Works without internet for basic features

## Troubleshooting

### Common Issues:

1. **Port already in use**
   ```bash
   # Kill process on port 8080
   lsof -ti:8080 | xargs kill -9
   
   # Or use different port
   npm run dev -- --port 3000
   ```

2. **API Keys not working**
   - Ensure you've replaced ALL placeholder keys in the code
   - Check if your API keys are valid and have sufficient credits
   - Verify you've saved the files after editing

3. **Dependencies installation fails**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

4. **Build fails**
   ```bash
   # Clear cache and build
   npm run clean
   npm run build
   ```

## File Structure
```
src/
├── components/          # React components
│   ├── ui/             # UI components (buttons, cards, etc.)
│   ├── Dashboard.tsx   # Main dashboard
│   ├── DiseaseDetection.tsx  # AI disease detection
│   ├── BilingualChatbot.tsx  # AI assistant
│   ├── EnhancedWeather.tsx   # Weather component
│   ├── MarketPrices.tsx      # Market data
│   ├── PestAlerts.tsx        # Dynamic pest alerts
│   └── ...
├── services/           # API services
├── pages/             # Main pages
├── config/            # Configuration files
└── assets/            # Images and static files
```

## Support & Updates

For issues or feature requests:
1. Check the console for error messages
2. Verify API keys are correctly set
3. Ensure internet connection for API calls
4. Check browser console for JavaScript errors

The application is designed to work offline for basic features when internet is unavailable.