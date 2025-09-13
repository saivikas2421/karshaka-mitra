import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7fa80b094f314ff48276312b5fd5a96f',
  appName: 'karshaka-mitra',
  webDir: 'dist',
  server: {
    url: 'https://7fa80b09-4f31-4ff4-8276-312b5fd5a96f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: true,
      spinnerColor: "#22c55e"
    }
  }
};

export default config;