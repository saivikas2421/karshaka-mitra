import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CloudSun, Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react";

interface WeatherAPIKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
  language: "en" | "ml";
}

const WeatherAPIKeySetup = ({ onApiKeySet, language }: WeatherAPIKeySetupProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<"success" | "error" | null>(null);

  const texts = {
    en: {
      title: "Weather API Setup",
      description: "Enter your WeatherAPI.com key for real-time weather data",
      label: "WeatherAPI.com Key",
      placeholder: "Your API key...",
      validate: "Validate & Save",
      validating: "Validating...",
      success: "Weather API key validated successfully!",
      error: "Invalid API key. Please check and try again.",
      getKey: "Get your free API key from",
      weatherLink: "WeatherAPI.com",
      instructions: "Your API key will be stored locally and only used for weather data."
    },
    ml: {
      title: "കാലാവസ്ഥ API സജ്ജീകരണം",
      description: "തത്സമയ കാലാവസ്ഥ ഡാറ്റയ്ക്കായി നിങ്ങളുടെ WeatherAPI.com കീ നൽകുക",
      label: "WeatherAPI.com കീ",
      placeholder: "നിങ്ങളുടെ API കീ...",
      validate: "സാധൂകരിക്കുകയും സേവ് ചെയ്യുകയും ചെയ്യുക",
      validating: "സാധൂകരിക്കുന്നു...",
      success: "കാലാവസ്ഥ API കീ വിജയകരമായി സാധൂകരിച്ചു!",
      error: "അസാധുവായ API കീ. ദയവായി പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.",
      getKey: "നിങ്ങളുടെ സൗജന്യ API കീ ഇവിടെ നിന്ന് നേടുക",
      weatherLink: "WeatherAPI.com",
      instructions: "നിങ്ങളുടെ API കീ പ്രാദേശികമായി സംഭരിച്ച് കാലാവസ്ഥ ഡാറ്റയ്ക്ക് മാത്രം ഉപയോഗിക്കും."
    }
  };

  const t = texts[language];

  useEffect(() => {
    const savedKey = localStorage.getItem('weather_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      onApiKeySet(savedKey);
    }
  }, [onApiKeySet]);

  const validateApiKey = async () => {
    if (!apiKey.trim()) return;

    setIsValidating(true);
    setValidationResult(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Kochi&aqi=no`
      );

      if (response.ok) {
        localStorage.setItem('weather_api_key', apiKey);
        setValidationResult("success");
        onApiKeySet(apiKey);
      } else {
        setValidationResult("error");
      }
    } catch (error) {
      setValidationResult("error");
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateApiKey();
  };

  return (
    <Card className="shadow-farm max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto p-3 bg-monsoon/10 rounded-full w-fit mb-4">
          <CloudSun className="h-6 w-6 text-monsoon" />
        </div>
        <CardTitle className="text-xl">{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weatherApiKey">{t.label}</Label>
            <div className="relative">
              <Input
                id="weatherApiKey"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setValidationResult(null);
                }}
                placeholder={t.placeholder}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!apiKey.trim() || isValidating}
          >
            {isValidating ? t.validating : t.validate}
          </Button>
        </form>

        {validationResult === "success" && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {t.success}
            </AlertDescription>
          </Alert>
        )}

        {validationResult === "error" && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {t.error}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-muted-foreground space-y-2">
          <p>{t.instructions}</p>
          <p>
            {t.getKey}{" "}
            <a 
              href="https://www.weatherapi.com/signup.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {t.weatherLink}
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherAPIKeySetup;