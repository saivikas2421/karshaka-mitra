import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Sun,
  TrendingUp,
  TrendingDown,
  Leaf,
  Bug,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Camera,
  MessageCircle,
  Activity,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import WeatherService, { WeatherData } from "@/services/WeatherService";
import MarketService, { MarketPrice } from "@/services/MarketService";
import SmartFarmingService, { PestAlert } from "@/services/SmartFarmingService";

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [pestAlerts, setPestAlerts] = useState<PestAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [weather, market, pests] = await Promise.all([
        WeatherService.getWeatherData('Kochi, Kerala'),
        MarketService.getMarketPrices('Kerala'),
        SmartFarmingService.getPestAlerts('Kerala')
      ]);

      if (weather) setWeatherData(weather);
      setMarketPrices(market.slice(0, 3)); // Top 3 prices for dashboard
      setPestAlerts(pests.slice(0, 1)); // Top pest alert
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAIRecommendation = () => {
    if (!weatherData) return "Loading AI recommendations...";
    
    const temp = weatherData.current.temp_c;
    const humidity = weatherData.current.humidity;
    
    if (temp > 30 && humidity > 80) {
      return "High temperature and humidity detected. Consider applying preventive fungicide to rice fields and ensure proper drainage.";
    } else if (temp < 25) {
      return "Cool weather is ideal for pest management. This is a good time for field inspection and organic treatments.";
    } else {
      return "Weather conditions are favorable. Consider fertilizer application for optimal crop growth.";
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Your Farm Dashboard
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Monitor your crops, track weather patterns, and get AI-powered recommendations for optimal farming decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Weather Card */}
          <Card className="shadow-farm hover:shadow-glow transition-smooth border-l-4 border-l-monsoon">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-monsoon" />
                Today's Weather
              </CardTitle>
              <CardDescription>Kochi, Kerala</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              ) : weatherData ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-warning" />
                      <span className="text-2xl font-bold">{weatherData.current.temp_c}°C</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Feels like {weatherData.current.feelslike_c}°C
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-monsoon" />
                      <span className="text-sm">{weatherData.current.humidity}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Sun className="h-4 w-4 text-warning" />
                      <span className="text-sm">UV: {weatherData.current.uv}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4 text-primary" />
                      <span className="text-sm">{weatherData.current.condition.text}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-muted-foreground">Weather data unavailable</div>
              )}
              <Button variant="weather" size="sm" className="w-full">
                7-Day Forecast
              </Button>
            </CardContent>
          </Card>

          {/* Market Prices */}
          <Card className="shadow-farm hover:shadow-glow transition-smooth border-l-4 border-l-warning">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-warning" />
                Market Prices
              </CardTitle>
              <CardDescription>Today's rates (₹/kg)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              ) : marketPrices.length > 0 ? (
                marketPrices.map((price, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{price.commodity.split(' ')[0]}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">₹{price.todayPrice}</span>
                      {price.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 text-success" />
                      ) : price.trend === 'down' ? (
                        <TrendingDown className="h-3 w-3 text-destructive" />
                      ) : (
                        <div className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground">Price data unavailable</div>
              )}
              <Button variant="market" size="sm" className="w-full">
                View All Prices
              </Button>
            </CardContent>
          </Card>

          {/* Crop Health */}
          <Card className="shadow-farm hover:shadow-glow transition-smooth border-l-4 border-l-success">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-success" />
                Crop Health
              </CardTitle>
              <CardDescription>Field monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Rice Field A</span>
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Coconut Grove</span>
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Spice Garden</span>
                <AlertTriangle className="h-4 w-4 text-warning" />
              </div>
              <Button variant="farm" size="sm" className="w-full">
                <Camera className="h-4 w-4" />
                Scan Crop
              </Button>
            </CardContent>
          </Card>

          {/* AI Assistant */}
          <Card className="shadow-farm hover:shadow-glow transition-smooth border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                AI Assistant
              </CardTitle>
              <CardDescription>Ask farming questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-3 border border-primary/20">
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-primary mt-0.5" />
                  <p className="text-sm text-foreground font-medium">
                    {isLoading ? "Generating AI recommendations..." : getAIRecommendation()}
                  </p>
                </div>
              </div>
              <Button variant="hero" size="sm" className="w-full">
                Chat with AI
              </Button>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card className="shadow-farm hover:shadow-glow transition-smooth border-l-4 border-l-accent">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent-foreground" />
                Farm Calendar
              </CardTitle>
              <CardDescription>Upcoming tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Rice Harvesting</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 6:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-warning mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Pest Inspection</p>
                  <p className="text-xs text-muted-foreground">Friday, 10:00 AM</p>
                </div>
              </div>
              <Button variant="earth" size="sm" className="w-full">
                View Full Calendar
              </Button>
            </CardContent>
          </Card>

          {/* Pest Alert */}
          <Card className="shadow-farm hover:shadow-glow transition-smooth border-l-4 border-l-destructive">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-destructive" />
                Pest Alerts
              </CardTitle>
              <CardDescription>Disease monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-16 bg-muted rounded-lg"></div>
                </div>
              ) : pestAlerts.length > 0 ? (
                <div className={`rounded-lg p-3 border ${
                  pestAlerts[0].severity === 'high' 
                    ? 'bg-destructive/10 border-destructive/20' 
                    : 'bg-warning/10 border-warning/20'
                }`}>
                  <p className={`text-sm font-medium ${
                    pestAlerts[0].severity === 'high' ? 'text-destructive' : 'text-warning'
                  }`}>
                    {pestAlerts[0].pest} Alert
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Confidence: {pestAlerts[0].confidence}% | Crops: {pestAlerts[0].affectedCrops.join(', ')}
                  </p>
                </div>
              ) : (
                <div className="bg-success/10 rounded-lg p-3 border border-success/20">
                  <p className="text-sm font-medium text-success">All Clear</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    No major pest threats detected in your area
                  </p>
                </div>
              )}
              <Button variant="destructive" size="sm" className="w-full">
                View Treatment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;