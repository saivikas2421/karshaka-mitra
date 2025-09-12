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
  MessageCircle
} from "lucide-react";

const Dashboard = () => {
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-warning" />
                  <span className="text-2xl font-bold">32°C</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Feels like 35°C</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Droplets className="h-4 w-4 text-monsoon" />
                  <span className="text-sm">85%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sun className="h-4 w-4 text-warning" />
                  <span className="text-sm">UV: 8</span>
                </div>
              </div>
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
              <div className="flex items-center justify-between">
                <span className="text-sm">Rice</span>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">₹45</span>
                  <TrendingUp className="h-3 w-3 text-success" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Coconut</span>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">₹25</span>
                  <TrendingDown className="h-3 w-3 text-destructive" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pepper</span>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">₹850</span>
                  <TrendingUp className="h-3 w-3 text-success" />
                </div>
              </div>
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
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  "Based on current weather, consider applying fertilizer to your rice field tomorrow morning."
                </p>
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
              <div className="bg-destructive/10 rounded-lg p-3 border border-destructive/20">
                <p className="text-sm font-medium text-destructive">Brown Plant Hopper Alert</p>
                <p className="text-xs text-muted-foreground mt-1">
                  High risk in rice fields due to humidity levels
                </p>
              </div>
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