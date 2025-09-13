import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react";

interface APIKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
  language: "en" | "ml";
}

const APIKeySetup = ({ onApiKeySet, language }: APIKeySetupProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<"success" | "error" | null>(null);

  const texts = {
    en: {
      title: "Setup AI Assistant",
      description: "Enter your OpenAI API key to enable intelligent farming assistance",
      label: "OpenAI API Key",
      placeholder: "sk-...",
      validate: "Validate & Save",
      validating: "Validating...",
      success: "API key validated successfully!",
      error: "Invalid API key. Please check and try again.",
      getKey: "Get your API key from",
      openaiLink: "OpenAI Platform",
      instructions: "Your API key will be stored locally in your browser and used only for AI responses."
    },
    ml: {
      title: "AI സഹായി സജ്ജീകരണം",
      description: "ബുദ്ധിമാനായ കൃഷി സഹായം പ്രാപ്തമാക്കുന്നതിന് നിങ്ങളുടെ OpenAI API കീ നൽകുക",
      label: "OpenAI API കീ",
      placeholder: "sk-...",
      validate: "സാധൂകരിക്കുകയും സേവ് ചെയ്യുകയും ചെയ്യുക",
      validating: "സാധൂകരിക്കുന്നു...",
      success: "API കീ വിജയകരമായി സാധൂകരിച്ചു!",
      error: "അസാധുവായ API കീ. ദയവായി പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.",
      getKey: "നിങ്ങളുടെ API കീ ഇവിടെ നിന്ന് നേടുക",
      openaiLink: "OpenAI പ്ലാറ്റ്ഫോം",
      instructions: "നിങ്ങളുടെ API കീ നിങ്ങളുടെ ബ്രൗസറിൽ പ്രാദേശികമായി സംഭരിച്ച് AI പ്രതികരണങ്ങൾക്ക് മാത്രം ഉപയോഗിക്കും."
    }
  };

  const t = texts[language];

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key');
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
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (response.ok) {
        localStorage.setItem('openai_api_key', apiKey);
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
        <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
          <Key className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">{t.label}</Label>
            <div className="relative">
              <Input
                id="apiKey"
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
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {t.openaiLink}
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIKeySetup;