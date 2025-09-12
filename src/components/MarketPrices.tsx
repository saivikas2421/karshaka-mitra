import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  RefreshCw,
  MapPin,
  Calendar,
  AlertCircle,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketPricesProps {
  language: "en" | "ml";
}

const MarketPrices = ({ language }: MarketPricesProps) => {
  const texts = {
    en: {
      title: "Market Prices",
      subtitle: "Real-time commodity prices to maximize your profits",
      todaysPrices: "Today's Prices",
      priceAlerts: "Price Alerts",
      trends: "Market Trends",
      location: "Kochi Market",
      lastUpdated: "Last Updated: 2 hours ago",
      commodity: "Commodity",
      todayPrice: "Today (₹/kg)",
      yesterdayPrice: "Yesterday",
      change: "Change",
      trend: "Trend",
      setAlert: "Set Price Alert",
      viewDetails: "View Details",
      refreshPrices: "Refresh Prices",
      highDemand: "High Demand",
      goodTime: "Good Time to Sell",
      priceDown: "Price Declining",
      stable: "Price Stable",
    },
    ml: {
      title: "മാർക്കറ്റ് വിലകൾ",
      subtitle: "നിങ്ങളുടെ ലാഭം വർദ്ധിപ്പിക്കാൻ തത്സമയ ചരക്ക് വിലകൾ",
      todaysPrices: "ഇന്നത്തെ വിലകൾ",
      priceAlerts: "വില അലേർട്ടുകൾ",
      trends: "വിപണി ട്രെൻഡുകൾ",
      location: "കൊച്ചി മാർക്കറ്റ്",
      lastUpdated: "അവസാനമായി അപ്ഡേറ്റ് ചെയ്തത്: 2 മണിക്കൂർ മുമ്പ്",
      commodity: "ചരക്ക്",
      todayPrice: "ഇന്ന് (₹/കി.ഗ്രാം)",
      yesterdayPrice: "ഇന്നലെ",
      change: "മാറ്റം",
      trend: "ട്രെൻഡ്",
      setAlert: "വില അലേർട്ട് സെറ്റ് ചെയ്യുക",
      viewDetails: "വിശദാംശങ്ങൾ കാണുക",
      refreshPrices: "വിലകൾ റിഫ്രഷ് ചെയ്യുക",
      highDemand: "ഉയർന്ന ഡിമാൻഡ്",
      goodTime: "വിൽക്കാൻ നല്ല സമയം",
      priceDown: "വില കുറയുന്നു",
      stable: "വില സ്ഥിരം",
    }
  };

  const t = texts[language];

  const marketData = [
    {
      commodity: language === "en" ? "Rice (Ponni)" : "അരി (പൊന്നി)",
      todayPrice: 45,
      yesterdayPrice: 43,
      change: 2,
      changePercent: 4.65,
      trend: "up",
      demand: "high",
      quality: "Premium"
    },
    {
      commodity: language === "en" ? "Coconut" : "തെങ്ങ്",
      todayPrice: 25,
      yesterdayPrice: 28,
      change: -3,
      changePercent: -10.71,
      trend: "down",
      demand: "medium",
      quality: "Grade A"
    },
    {
      commodity: language === "en" ? "Black Pepper" : "കുരുമുളക്",
      todayPrice: 850,
      yesterdayPrice: 840,
      change: 10,
      changePercent: 1.19,
      trend: "up",
      demand: "high",
      quality: "Export Quality"
    },
    {
      commodity: language === "en" ? "Cardamom" : "ഏലക്ക",
      todayPrice: 1200,
      yesterdayPrice: 1200,
      change: 0,
      changePercent: 0,
      trend: "stable",
      demand: "medium",
      quality: "Large Bold"
    },
    {
      commodity: language === "en" ? "Rubber" : "റബ്ബർ",
      todayPrice: 165,
      yesterdayPrice: 170,
      change: -5,
      changePercent: -2.94,
      trend: "down",
      demand: "low",
      quality: "RSS-4"
    },
    {
      commodity: language === "en" ? "Ginger" : "ഇഞ്ചി",
      todayPrice: 120,
      yesterdayPrice: 115,
      change: 5,
      changePercent: 4.35,
      trend: "up",
      demand: "high",
      quality: "Dry"
    },
    {
      commodity: language === "en" ? "Turmeric" : "മഞ്ഞൾ",
      todayPrice: 95,
      yesterdayPrice: 92,
      change: 3,
      changePercent: 3.26,
      trend: "up",
      demand: "medium",
      quality: "Finger"
    },
    {
      commodity: language === "en" ? "Banana" : "വാഴ",
      todayPrice: 35,
      yesterdayPrice: 35,
      change: 0,
      changePercent: 0,
      trend: "stable",
      demand: "high",
      quality: "Robusta"
    }
  ];

  const priceAlerts = [
    {
      commodity: language === "en" ? "Black Pepper" : "കുരുമുളക്",
      message: language === "en" ? "Price increased by 15% in last week" : "കഴിഞ്ഞ ആഴ്ചയിൽ വില 15% വർധിച്ചു",
      type: "positive"
    },
    {
      commodity: language === "en" ? "Coconut" : "തെങ്ങ്",
      message: language === "en" ? "Price declining trend - consider holding" : "വിലകുറവ് ട്രെൻഡ് - പിടിച്ചുനിൽക്കുന്നത് പരിഗണിക്കുക",
      type: "warning"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getDemandBadge = (demand: string) => {
    const variants = {
      high: "bg-success/10 text-success border-success/30",
      medium: "bg-warning/10 text-warning border-warning/30",
      low: "bg-muted text-muted-foreground border-muted"
    };
    
    const labels = {
      high: language === "en" ? "High Demand" : "ഉയർന്ന ഡിമാൻഡ്",
      medium: language === "en" ? "Medium" : "ഇടത്തരം",
      low: language === "en" ? "Low" : "കുറഞ്ഞത്"
    };

    return (
      <Badge variant="outline" className={variants[demand as keyof typeof variants]}>
        {labels[demand as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
          {t.title}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{t.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{t.lastUpdated}</span>
          </div>
        </div>
        <Button variant="market" size="sm">
          <RefreshCw className="h-4 w-4" />
          {t.refreshPrices}
        </Button>
      </div>

      {/* Price Alerts */}
      <Card className="shadow-farm border-l-4 border-l-warning">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            {t.priceAlerts}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {priceAlerts.map((alert, index) => (
            <div 
              key={index} 
              className={cn(
                "p-3 rounded-lg border",
                alert.type === "positive" 
                  ? "bg-success/10 border-success/20" 
                  : "bg-warning/10 border-warning/20"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={cn(
                    "font-medium text-sm",
                    alert.type === "positive" ? "text-success" : "text-warning"
                  )}>
                    {alert.commodity}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                </div>
                <Button variant="outline" size="sm">
                  {t.setAlert}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Market Prices Table */}
      <Card className="shadow-farm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {t.todaysPrices}
          </CardTitle>
          <CardDescription>
            {language === "en" ? "All prices in ₹ per kg" : "എല്ലാ വിലകളും ₹ പ്രതി കിലോഗ്രാം"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.commodity}</TableHead>
                  <TableHead className="text-center">{t.todayPrice}</TableHead>
                  <TableHead className="text-center">{t.yesterdayPrice}</TableHead>
                  <TableHead className="text-center">{t.change}</TableHead>
                  <TableHead className="text-center">{t.trend}</TableHead>
                  <TableHead className="text-center">
                    {language === "en" ? "Demand" : "ഡിമാൻഡ്"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketData.map((item, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.commodity}</p>
                        <p className="text-xs text-muted-foreground">{item.quality}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-bold text-lg">₹{item.todayPrice}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-muted-foreground">₹{item.yesterdayPrice}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        {getTrendIcon(item.trend)}
                        <span className={cn("font-medium", getTrendColor(item.trend))}>
                          {item.change !== 0 && (item.change > 0 ? "+" : "")}
                          {item.change !== 0 ? `₹${item.change}` : "₹0"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={cn("text-sm", getTrendColor(item.trend))}>
                        {item.changePercent !== 0 && (item.changePercent > 0 ? "+" : "")}
                        {item.changePercent.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {getDemandBadge(item.demand)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="shadow-farm border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <h3 className="font-medium text-success">{t.goodTime}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === "en" 
                ? "Black Pepper, Rice, Ginger showing strong upward trends"
                : "കുരുമുളക്, അരി, ഇഞ്ചി ശക്തമായ ഉയർച്ച കാണിക്കുന്നു"}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-farm border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-warning" />
              <h3 className="font-medium text-warning">{t.highDemand}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === "en" 
                ? "Rice and Banana showing consistent high demand"
                : "അരിയും വാഴയും സ്ഥിരമായ ഉയർന്ന ഡിമാൻഡ് കാണിക്കുന്നു"}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-farm border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-5 w-5 text-destructive" />
              <h3 className="font-medium text-destructive">{t.priceDown}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === "en" 
                ? "Coconut and Rubber prices declining this week"
                : "തെങ്ങിന്റെയും റബ്ബറിന്റെയും വില ഈ ആഴ്ച കുറയുന്നു"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;