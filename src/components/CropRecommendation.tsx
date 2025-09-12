import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Leaf, MapPin, Thermometer, Droplets, Zap, Clock, TrendingUp } from "lucide-react";

interface CropRecommendationProps {
  language: "en" | "ml";
}

const CropRecommendation = ({ language }: CropRecommendationProps) => {
  const [soilType, setSoilType] = useState("");
  const [season, setSeason] = useState("");
  const [region, setRegion] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRecommendations = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockRecommendations = [
        {
          id: 1,
          name: language === "en" ? "Rice (Ponni)" : "നെല്ല് (പൊന്നി)",
          suitability: 95,
          season: language === "en" ? "Kharif" : "ഖരീഫ്",
          duration: language === "en" ? "120-130 days" : "120-130 ദിവസം",
          yield: language === "en" ? "6-7 tons/hectare" : "6-7 ടൺ/ഹെക്ടർ",
          profit: language === "en" ? "₹45,000-60,000" : "₹45,000-60,000",
          advantages: language === "en" 
            ? ["High yield", "Disease resistant", "Good market price"]
            : ["ഉയർന്ന വിളവ്", "രോഗ പ്രതിരോധം", "നല്ല വിപണി വില"],
          tips: language === "en"
            ? "Maintain water level at 2-5cm depth. Apply organic manure before planting."
            : "2-5 സെ.മീ ആഴത്തിൽ വെള്ളം നിലനിർത്തുക. നടുന്നതിന് മുമ്പ് ജൈവവളം പ്രയോഗിക്കുക."
        },
        {
          id: 2,
          name: language === "en" ? "Black Pepper" : "കുരുമുളക്",
          suitability: 88,
          season: language === "en" ? "Pre-monsoon" : "മുൻ മൺസൂൺ",
          duration: language === "en" ? "3-4 years to mature" : "പാകമാകാൻ 3-4 വർഷം",
          yield: language === "en" ? "2-3 kg/vine" : "2-3 കിലോ/വള്ളി",
          profit: language === "en" ? "₹80,000-1,20,000" : "₹80,000-1,20,000",
          advantages: language === "en" 
            ? ["High value crop", "Long term income", "Suitable for Kerala climate"]
            : ["ഉയർന്ന മൂല്യമുള്ള വിള", "ദീർഘകാല വരുമാനം", "കേരള കാലാവസ്ഥയ്ക്ക് അനുയോജ്യം"],
          tips: language === "en"
            ? "Plant during June-July. Use support trees like mango or silver oak."
            : "ജൂൺ-ജൂലൈയിൽ നടുക. മാവ് അല്ലെങ്കിൽ സിൽവർ ഓക്ക് പോലുള്ള സപ്പോർട്ട് മരങ്ങൾ ഉപയോഗിക്കുക."
        },
        {
          id: 3,
          name: language === "en" ? "Coconut (Dwarf)" : "തെങ്ങ് (കുള്ളൻ)",
          suitability: 92,
          season: language === "en" ? "Year-round" : "വർഷം മുഴുവൻ",
          duration: language === "en" ? "5-6 years to fruit" : "ഫലം കായ്ക്കാൻ 5-6 വർഷം",
          yield: language === "en" ? "80-120 nuts/palm/year" : "80-120 നാളികേരം/ഈന്തപ്പന/വർഷം",
          profit: language === "en" ? "₹25,000-35,000" : "₹25,000-35,000",
          advantages: language === "en" 
            ? ["Steady income", "Multiple products", "Low maintenance"]
            : ["സ്ഥിരമായ വരുമാനം", "ഒന്നിലധികം ഉൽപ്പന്നങ്ങൾ", "കുറഞ്ഞ പരിപാലനം"],
          tips: language === "en"
            ? "Intercropping with pepper, cocoa or banana increases profitability."
            : "കുരുമുളക്, കൊക്കോ അല്ലെങ്കിൽ വാഴ എന്നിവയുമായി ഇടവിള ചെയ്യുന്നത് ലാഭക്ഷമത വർദ്ധിപ്പിക്കുന്നു."
        }
      ];
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 2000);
  };

  const texts = {
    en: {
      title: "Crop Recommendations",
      subtitle: "AI-powered suggestions based on your conditions",
      soilLabel: "Soil Type",
      seasonLabel: "Season",
      regionLabel: "Region",
      getRecsText: "Get Recommendations",
      loadingText: "Analyzing conditions...",
      suitabilityLabel: "Suitability",
      durationLabel: "Duration",
      yieldLabel: "Expected Yield",
      profitLabel: "Profit Potential",
      advantagesLabel: "Advantages",
      tipsLabel: "Expert Tips",
      noResults: "Select soil type, season, and region to get personalized recommendations",
    },
    ml: {
      title: "വിള ശുപാർശകൾ",
      subtitle: "നിങ്ങളുടെ അവസ്ഥകളെ അടിസ്ഥാനമാക്കിയുള്ള AI പവർഡ് നിർദ്ദേശങ്ങൾ",
      soilLabel: "മണ്ണിന്റെ തരം",
      seasonLabel: "സീസൺ",
      regionLabel: "പ്രദേശം",
      getRecsText: "ശുപാർശകൾ നേടുക",
      loadingText: "അവസ്ഥകൾ വിശകലനം ചെയ്യുന്നു...",
      suitabilityLabel: "അനുയോജ്യത",
      durationLabel: "കാലാവധി",
      yieldLabel: "പ്രതീക്ഷിക്കുന്ന വിളവ്",
      profitLabel: "ലാഭ സാധ്യത",
      advantagesLabel: "ഗുണങ്ങൾ",
      tipsLabel: "വിദഗ്ധ നിർദ്ദേശങ്ങൾ",
      noResults: "വ്യക്തിഗത ശുപാർശകൾ നേടുന്നതിന് മണ്ണിന്റെ തരം, സീസൺ, പ്രദേശം എന്നിവ തിരഞ്ഞെടുക്കുക",
    }
  };

  const t = texts[language];

  const soilTypes = [
    { value: "red", label: language === "en" ? "Red Soil" : "ചുവന്ന മണ്ണ്" },
    { value: "laterite", label: language === "en" ? "Laterite Soil" : "ലാറ്ററൈറ്റ് മണ്ണ്" },
    { value: "alluvial", label: language === "en" ? "Alluvial Soil" : "എക്കൽ മണ്ണ്" },
    { value: "black", label: language === "en" ? "Black Soil" : "കറുത്ത മണ്ണ്" },
  ];

  const seasons = [
    { value: "kharif", label: language === "en" ? "Kharif (Jun-Oct)" : "ഖരീഫ് (ജൂൺ-ഒക്ടോ)" },
    { value: "rabi", label: language === "en" ? "Rabi (Nov-Mar)" : "റബി (നവം-മാർച്ച്)" },
    { value: "summer", label: language === "en" ? "Summer (Apr-May)" : "വേനൽ (ഏപ്രിൽ-മെയ്)" },
  ];

  const regions = [
    { value: "highrange", label: language === "en" ? "High Range" : "ഉയർന്ന പ്രദേശം" },
    { value: "midland", label: language === "en" ? "Midland" : "മധ്യഭാഗം" },
    { value: "coastal", label: language === "en" ? "Coastal" : "തീരപ്രദേശം" },
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
      </div>

      {/* Selection Filters */}
      <Card className="shadow-farm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {language === "en" ? "Farm Conditions" : "കൃഷി അവസ്ഥകൾ"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.soilLabel}</label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger>
                  <SelectValue placeholder={language === "en" ? "Select soil type" : "മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കുക"} />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil.value} value={soil.value}>
                      {soil.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t.seasonLabel}</label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger>
                  <SelectValue placeholder={language === "en" ? "Select season" : "സീസൺ തിരഞ്ഞെടുക്കുക"} />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t.regionLabel}</label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue placeholder={language === "en" ? "Select region" : "പ്രദേശം തിരഞ്ഞെടുക്കുക"} />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            variant="hero"
            className="w-full"
            onClick={getRecommendations}
            disabled={!soilType || !season || !region || isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                {t.loadingText}
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                {t.getRecsText}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="space-y-4">
        {recommendations.length === 0 ? (
          <Card className="shadow-farm">
            <CardContent className="flex items-center justify-center h-32 text-muted-foreground">
              <div className="text-center">
                <Leaf className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{t.noResults}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          recommendations.map((crop) => (
            <Card key={crop.id} className="shadow-farm hover:shadow-glow transition-smooth">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-success" />
                    {crop.name}
                  </CardTitle>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                    {t.suitabilityLabel}: {crop.suitability}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t.durationLabel}</p>
                      <p className="text-sm font-medium">{crop.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t.yieldLabel}</p>
                      <p className="text-sm font-medium">{crop.yield}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t.profitLabel}</p>
                      <p className="text-sm font-medium text-success">{crop.profit}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t.advantagesLabel}</p>
                    <div className="flex flex-wrap gap-1">
                      {crop.advantages.slice(0, 2).map((advantage: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {advantage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-3 rounded-lg border-l-4 border-primary">
                  <h4 className="font-medium text-sm mb-1 text-primary">{t.tipsLabel}</h4>
                  <p className="text-sm text-muted-foreground">{crop.tips}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;