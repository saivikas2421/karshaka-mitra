import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { 
  Bug, 
  AlertTriangle, 
  Shield, 
  MapPin, 
  Calendar,
  RefreshCw,
  TrendingUp,
  Leaf
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PestAlert {
  id: string;
  pest: string;
  crop: string;
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  date: string;
  description: string;
  treatment: string;
  prevention: string;
}

interface PestAlertsProps {
  language: "en" | "ml";
}

const PestAlerts = ({ language }: PestAlertsProps) => {
  const [alerts, setAlerts] = useState<PestAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const texts = {
    en: {
      title: "Pest & Disease Alerts",
      subtitle: "Real-time alerts for crop pests and diseases in Kerala",
      lastUpdate: "Last updated",
      refresh: "Refresh Alerts",
      noAlerts: "No active alerts in your area",
      severity: "Severity",
      location: "Location",
      affectedCrop: "Affected Crop",
      treatment: "Treatment",
      prevention: "Prevention",
      reportedOn: "Reported on",
    },
    ml: {
      title: "കീട-രോഗ അലേർട്ടുകൾ",
      subtitle: "കേരളത്തിലെ വിള കീടങ്ങൾക്കും രോഗങ്ങൾക്കുമുള്ള തത്സമയ അലേർട്ടുകൾ",
      lastUpdate: "അവസാനം അപ്ഡേറ്റ് ചെയ്തത്",
      refresh: "അലേർട്ടുകൾ പുതുക്കുക",
      noAlerts: "നിങ്ങളുടെ പ്രദേശത്ത് സജീവ അലേർട്ടുകളില്ല",
      severity: "തീവ്രത",
      location: "സ്ഥലം",
      affectedCrop: "ബാധിച്ച വിള",
      treatment: "ചികിത്സ",
      prevention: "പ്രതിരോധം",
      reportedOn: "റിപ്പോർട്ട് ചെയ്ത തിയതി",
    }
  };

  const t = texts[language];

  useEffect(() => {
    loadPestAlerts();
  }, []);

  const loadPestAlerts = async () => {
    setIsLoading(true);
    try {
      // Simulate API call for dynamic pest alerts
      // In a real app, this would fetch from a government API or database
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const dynamicAlerts: PestAlert[] = generateDynamicAlerts(language);
      setAlerts(dynamicAlerts);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading pest alerts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateDynamicAlerts = (lang: "en" | "ml"): PestAlert[] => {
    const keralaCrops = ["Rice", "Coconut", "Pepper", "Banana", "Tea", "Coffee", "Rubber"];
    const keralaDistricts = ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Palakkad", "Kollam", "Kottayam"];
    
    if (lang === "en") {
      return [
        {
          id: "1",
          pest: "Brown Planthopper",
          crop: "Rice",
          severity: "high",
          location: "Palakkad, Thrissur",
          date: new Date().toISOString(),
          description: "Heavy infestation of brown planthopper reported in paddy fields. Plants showing yellowing and stunting.",
          treatment: "Apply Imidacloprid 17.8% SL @ 0.3ml/liter or Thiamethoxam 25% WG @ 0.2g/liter. Drain field water for 2-3 days.",
          prevention: "Use resistant varieties like Jaya, Mahsuri. Maintain 2-3cm water level. Avoid excess nitrogen application."
        },
        {
          id: "2",
          pest: "Coconut Rhinoceros Beetle",
          crop: "Coconut",
          severity: "medium",
          location: "Kochi, Kollam",
          date: new Date(Date.now() - 86400000).toISOString(),
          description: "Adult beetles damaging crown leaves and boring into trunk. Increased activity during monsoon.",
          treatment: "Apply Beauveria bassiana @ 5g/liter in crown. Use pheromone traps. Remove and destroy breeding sites.",
          prevention: "Clean decomposing organic matter. Install crown protection. Regular inspection during breeding season."
        },
        {
          id: "3",
          pest: "Pepper Anthracnose",
          crop: "Pepper",
          severity: "critical",
          location: "Wayanad, Idukki",
          date: new Date(Date.now() - 172800000).toISOString(),
          description: "Severe anthracnose infection in black pepper vines. Leaf spots and stem rot observed.",
          treatment: "Spray Copper oxychloride 50% WP @ 2g/liter + Mancozeb 75% WP @ 2g/liter. Repeat at 15-day intervals.",
          prevention: "Improve drainage. Prune affected parts. Apply Bordeaux mixture during onset of monsoon."
        }
      ];
    } else {
      return [
        {
          id: "1",
          pest: "ബ്രൗൺ പ്ലാന്റ്‌ഹോപ്പർ",
          crop: "നെല്ല്",
          severity: "high",
          location: "പാലക്കാട്, തൃശ്ശൂർ",
          date: new Date().toISOString(),
          description: "നെൽവയലുകളിൽ ബ്രൗൺ പ്ലാന്റ്‌ഹോപ്പറിന്റെ കനത്ത ആക്രമണം റിപ്പോർട്ട് ചെയ്യപ്പെട്ടു. ചെടികൾ മഞ്ഞളിക്കലും വളർച്ച മുരടിപ്പും കാണിക്കുന്നു.",
          treatment: "ഇമിഡാക്ലോപ്രിഡ് 17.8% SL @ 0.3ml/ലിറ്റർ അല്ലെങ്കിൽ തയാമെത്തോക്സാം 25% WG @ 0.2g/ലിറ്റർ പ്രയോഗിക്കുക. 2-3 ദിവസം വയലിലെ വെള്ളം കളയുക.",
          prevention: "ജയ, മഹ്‌സൂരി പോലുള്ള പ്രതിരോധ ഇനങ്ങൾ ഉപയോഗിക്കുക. 2-3 സെ.മി വെള്ളനിരപ്പ് നിലനിർത്തുക. അധിക നൈട്രജൻ പ്രയോഗം ഒഴിവാക്കുക."
        },
        {
          id: "2",
          pest: "തേങ്ങാ കാണ്ടാമൃഗ വണ്ട്",
          crop: "തേങ്ങ്",
          severity: "medium",
          location: "കൊച്ചി, കൊല്ലം",
          date: new Date(Date.now() - 86400000).toISOString(),
          description: "മുതിർന്ന വണ്ടുകൾ കിരീട ഇലകൾ നശിപ്പിക്കുകയും കാണ്ഡത്തിൽ തുരന്നുകയറുകയും ചെയ്യുന്നു. മൺസൂൺ കാലത്ത് വർധിച്ച പ്രവർത്തനം.",
          treatment: "കിരീടത്തിൽ ബ്യൂവേറിയ ബാസിയാന @ 5g/ലിറ്റർ പ്രയോഗിക്കുക. ഫെറോമോൺ കെണികൾ ഉപയോഗിക്കുക. പ്രജനന സ്ഥലങ്ങൾ നീക്കം ചെയ്യുക.",
          prevention: "ജീർണിക്കുന്ന ജൈവവസ്തുക്കൾ വൃത്തിയാക്കുക. കിരീട സംരക്ഷണം ഇൻസ്റ്റാൾ ചെയ്യുക. പ്രജനനകാലത്ത് പതിവ് പരിശോധന."
        }
      ];
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "warning";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return AlertTriangle;
      case "high": return Bug;
      case "medium": return Shield;
      case "low": return Leaf;
      default: return Bug;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-muted-foreground">Loading pest alerts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
          {t.title}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t.subtitle}
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Button variant="outline" onClick={loadPestAlerts}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {t.refresh}
          </Button>
          {lastUpdated && (
            <span className="text-sm text-muted-foreground">
              {t.lastUpdate}: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {alerts.length === 0 ? (
        <Card className="shadow-farm">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-success" />
            <p className="text-lg font-medium text-success">{t.noAlerts}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alerts.map((alert) => {
            const SeverityIcon = getSeverityIcon(alert.severity);
            return (
              <Card key={alert.id} className={cn(
                "shadow-farm border-l-4",
                alert.severity === "critical" && "border-l-destructive",
                alert.severity === "high" && "border-l-warning",
                alert.severity === "medium" && "border-l-secondary",
                alert.severity === "low" && "border-l-muted-foreground"
              )}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <SeverityIcon className={cn(
                        "h-5 w-5",
                        alert.severity === "critical" && "text-destructive",
                        alert.severity === "high" && "text-warning",
                        alert.severity === "medium" && "text-secondary",
                        alert.severity === "low" && "text-muted-foreground"
                      )} />
                      <CardTitle className="text-lg">{alert.pest}</CardTitle>
                    </div>
                    <Badge variant={getSeverityColor(alert.severity) as any}>
                      {language === "en" 
                        ? alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)
                        : alert.severity === "critical" ? "അതിഗുരുതരം" :
                          alert.severity === "high" ? "ഉയർന്നത്" :
                          alert.severity === "medium" ? "ഇടത്തരം" : "കുറവ്"
                      }
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Leaf className="h-4 w-4" />
                      <span>{alert.crop}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(alert.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                      <h4 className="font-medium text-warning text-sm mb-2">{t.treatment}</h4>
                      <p className="text-xs text-muted-foreground">{alert.treatment}</p>
                    </div>
                    
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <h4 className="font-medium text-primary text-sm mb-2">{t.prevention}</h4>
                      <p className="text-xs text-muted-foreground">{alert.prevention}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PestAlerts;