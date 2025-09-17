import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind,
  Eye,
  Gauge,
  Calendar,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import WeatherService, { WeatherData } from "@/services/WeatherService";
import WeatherAPIKeySetup from "@/components/WeatherAPIKeySetup";

interface EnhancedWeatherProps {
  language: "en" | "ml";
}

const EnhancedWeather = ({ language }: EnhancedWeatherProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApiKey, setHasApiKey] = useState(false);

  const texts = {
    en: {
      title: "Weather Forecast",
      subtitle: "Detailed weather insights for farming decisions",
      current: "Current Weather",
      feels: "Feels like",
      humidity: "Humidity",
      wind: "Wind",
      visibility: "Visibility",
      pressure: "Pressure",
      uvIndex: "UV Index",
      forecast7: "7-Day Forecast",
      farmingAlerts: "Farming Alerts",
      recommendation: "Today's Recommendation",
      irrigationTip: "Irrigation Tip",
      sprayTip: "Spray Schedule",
      harvestTip: "Harvest Advisory",
      refreshWeather: "Refresh Weather",
      setupRequired: "Weather API Setup Required",
    },
    ml: {
      title: "കാലാവസ്ഥ പ്രവചനം",
      subtitle: "കൃഷി തീരുമാനങ്ങൾക്കായി വിശദമായ കാലാവസ്ഥ വിവരങ്ങൾ",
      current: "നിലവിലെ കാലാവസ്ഥ",
      feels: "അനുഭവപ്പെടുന്നത്",
      humidity: "ആർദ്രത",
      wind: "കാറ്റ്",
      visibility: "ദൃശ്യപരത",
      pressure: "മർദ്ദം",
      uvIndex: "UV സൂചിക",
      forecast7: "7 ദിവസത്തെ പ്രവചനം",
      farmingAlerts: "കൃഷി അലേർട്ടുകൾ",
      recommendation: "ഇന്നത്തെ ശുപാർശ",
      irrigationTip: "ജലസേചന നുറുങ്ങ്",
      sprayTip: "സ്പ്രേ ഷെഡ്യൂൾ",
      harvestTip: "വിളവെടുപ്പ് ഉപദേശം",
      refreshWeather: "കാലാവസ്ഥ പുതുക്കുക",
      setupRequired: "കാലാവസ്ഥ API സജ്ജീകരണം ആവശ്യമാണ്",
    }
  };

  const t = texts[language];

  useEffect(() => {
    const apiKey = WeatherService.getApiKey();
    setHasApiKey(!!apiKey);
    if (apiKey) {
      loadWeatherData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadWeatherData = async () => {
    setIsLoading(true);
    try {
      const data = await WeatherService.getWeatherData();
      setWeatherData(data);
    } catch (error) {
      console.error('Error loading weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySet = (apiKey: string) => {
    setHasApiKey(true);
    loadWeatherData();
  };

  const refreshWeather = () => {
    // Clear cache and reload
    localStorage.removeItem('weather_cache');
    loadWeatherData();
  };

  if (!hasApiKey) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            {t.setupRequired}
          </h2>
        </div>
        <WeatherAPIKeySetup onApiKeySet={handleApiKeySet} language={language} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-muted-foreground">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-muted-foreground">Unable to load weather data</p>
          <Button onClick={refreshWeather} className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const { current, location, forecast: weatherForecast } = weatherData;

  const currentWeather = {
    location: `${location.name}, ${location.region}`,
    temperature: Math.round(current.temp_c),
    feelsLike: Math.round(current.feelslike_c),
    condition: current.condition.text,
    humidity: current.humidity,
    windSpeed: Math.round(current.wind_kph),
    windDirection: current.wind_dir,
    visibility: Math.round(current.vis_km),
    pressure: Math.round(current.pressure_mb),
    uvIndex: current.uv,
    icon: current.condition.text.toLowerCase().includes('cloud') ? Cloud : 
          current.condition.text.toLowerCase().includes('rain') ? CloudRain : Sun
  };

  const forecastData = weatherForecast?.forecastday?.slice(0, 7) || [];

  const alerts = [
    {
      type: "warning",
      title: language === "en" ? "Heavy Rain Alert" : "കനത്ത മഴ അലേർട്ട്",
      message: language === "en" ? "Heavy rainfall expected Mon-Tue. Avoid pesticide application." : "തിങ്കൾ-ചൊവ്വ കനത്ത മഴ പ്രതീക്ഷിക്കുന്നു. കീടനാശിനി പ്രയോഗം ഒഴിവാക്കുക.",
      icon: AlertTriangle
    }
  ];

  const recommendations = [
    {
      category: t.irrigationTip,
      advice: language === "en" 
        ? "Reduce irrigation by 50% due to expected rainfall tomorrow"
        : "നാളത്തെ പ്രതീക്ഷിക്കുന്ന മഴ കാരണം ജലസേചനം 50% കുറയ്ക്കുക",
      icon: Droplets
    },
    {
      category: t.sprayTip,
      advice: language === "en" 
        ? "Good conditions for spraying today. Avoid Friday due to rain"
        : "ഇന്ന് സ്പ്രേയിംഗിന് നല്ല അവസ്ഥ. മഴ കാരണം വെള്ളിയാഴ്ച ഒഴിവാക്കുക",
      icon: Wind
    },
    {
      category: t.harvestTip,
      advice: language === "en" 
        ? "Perfect conditions for harvesting today. Complete before weekend rain"
        : "ഇന്ന് വിളവെടുപ്പിന് അനുയോജ്യമായ അവസ്ഥ. വാരാന്ത്യ മഴയ്ക്ക് മുമ്പ് പൂർത്തിയാക്കുക",
      icon: Calendar
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
          {t.title}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t.subtitle}
        </p>
        <Button variant="outline" onClick={refreshWeather} className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          {t.refreshWeather}
        </Button>
      </div>

      {/* Current Weather */}
      <Card className="shadow-farm border-l-4 border-l-monsoon">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <currentWeather.icon className="h-6 w-6 text-monsoon" />
            {t.current}
          </CardTitle>
          <CardDescription>{currentWeather.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold">{currentWeather.temperature}°C</span>
                <span className="text-muted-foreground">{t.feels} {currentWeather.feelsLike}°C</span>
              </div>
              <p className="text-lg text-muted-foreground">{currentWeather.condition}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-monsoon" />
                <div>
                  <p className="text-xs text-muted-foreground">{t.humidity}</p>
                  <p className="font-medium">{currentWeather.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{t.wind}</p>
                  <p className="font-medium">{currentWeather.windSpeed} km/h {currentWeather.windDirection}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{t.visibility}</p>
                  <p className="font-medium">{currentWeather.visibility} km</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{t.pressure}</p>
                  <p className="font-medium">{currentWeather.pressure} hPa</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            <Sun className="h-4 w-4 text-warning" />
            <span className="text-sm">{t.uvIndex}: </span>
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
              {currentWeather.uvIndex} - {language === "en" ? "Very High" : "വളരെ ഉയർന്നത്"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Forecast */}
      <Card className="shadow-farm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {t.forecast7}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {forecastData.map((day, index) => {
              const condition = day.day.condition.text.toLowerCase();
              const Icon = condition.includes('rain') ? CloudRain :
                          condition.includes('cloud') ? Cloud : Sun;
              
              return (
                <div key={index} className="text-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth">
                  <p className="font-medium text-sm mb-1">
                    {index === 0 ? (language === "en" ? "Today" : "ഇന്ന്") : 
                     new Date(day.date).toLocaleDateString(language === "en" ? "en-US" : "ml-IN", { weekday: 'short' })}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">{day.date.split('-').slice(1).join('/')}</p>
                  <Icon className="h-6 w-6 mx-auto mb-2 text-monsoon" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-bold">{Math.round(day.day.maxtemp_c)}°</span>
                      <span className="text-muted-foreground text-sm">{Math.round(day.day.mintemp_c)}°</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Droplets className="h-3 w-3 text-monsoon" />
                      <span className="text-xs">{day.day.daily_chance_of_rain}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farming Alerts */}
        <Card className="shadow-farm border-l-4 border-l-warning">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              {t.farmingAlerts}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <div key={index} className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <div className="flex items-start gap-2">
                    <Icon className="h-4 w-4 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-medium text-warning text-sm">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Today's Recommendations */}
        <Card className="shadow-farm border-l-4 border-l-success">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              {t.recommendation}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <div key={index} className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-start gap-2">
                    <Icon className="h-4 w-4 text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-success text-sm">{rec.category}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{rec.advice}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedWeather;