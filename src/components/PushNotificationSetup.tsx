import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  BellRing, 
  CheckCircle, 
  AlertTriangle, 
  Cloud, 
  TrendingUp, 
  Bug 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PushNotificationSetupProps {
  language: "en" | "ml";
}

interface NotificationSettings {
  weatherAlerts: boolean;
  priceAlerts: boolean;
  pestAlerts: boolean;
  generalFarmTips: boolean;
}

const PushNotificationSetup = ({ language }: PushNotificationSetupProps) => {
  const { toast } = useToast();
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>({
    weatherAlerts: true,
    priceAlerts: true,
    pestAlerts: true,
    generalFarmTips: false,
  });

  const texts = {
    en: {
      title: "Push Notifications",
      subtitle: "Stay updated with important farming alerts and tips",
      enable: "Enable Notifications",
      disable: "Disable Notifications",
      enabled: "Notifications Enabled",
      disabled: "Notifications Disabled",
      notSupported: "Push notifications are not supported in this browser",
      permissionDenied: "Notification permission was denied. Please enable in browser settings.",
      weatherAlerts: "Weather Alerts",
      weatherDesc: "Heavy rain warnings, temperature alerts",
      priceAlerts: "Market Price Alerts",
      priceDesc: "Price changes, good selling opportunities",
      pestAlerts: "Pest & Disease Alerts",
      pestDesc: "Disease outbreaks, treatment reminders",
      generalTips: "General Farm Tips",
      generalDesc: "Daily farming advice and seasonal tips",
      testNotification: "Send Test Notification",
      testSent: "Test notification sent!",
      settingsSaved: "Notification settings saved!"
    },
    ml: {
      title: "പുഷ് അറിയിപ്പുകൾ",
      subtitle: "പ്രധാനപ്പെട്ട കൃഷി അലേട്ടുകളും നുറുങ്ങുകളും അറിയാൻ",
      enable: "അറിയിപ്പുകൾ പ്രാപ്തമാക്കുക",
      disable: "അറിയിപ്പുകൾ നിർജ്ജീവമാക്കുക",
      enabled: "അറിയിപ്പുകൾ പ്രാപ്തമാക്കി",
      disabled: "അറിയിപ്പുകൾ നിർജ്ജീവമാക്കി",
      notSupported: "ഈ ബ്രൗസറിൽ പുഷ് അറിയിപ്പുകൾ പിന്തുണയ്ക്കുന്നില്ല",
      permissionDenied: "അറിയിപ്പ് അനുമതി നിരസിക്കപ്പെട്ടു. ദയവായി ബ്രൗസർ ക്രമീകരണങ്ങളിൽ പ്രാപ്തമാക്കുക.",
      weatherAlerts: "കാലാവസ്ഥ അലേർട്ടുകൾ",
      weatherDesc: "കനത്ത മഴ മുന്നറിയിപ്പുകൾ, താപനില അലേർട്ടുകൾ",
      priceAlerts: "വിപണി വില അലേർട്ടുകൾ",
      priceDesc: "വില മാറ്റങ്ങൾ, നല്ല വിൽപ്പന അവസരങ്ങൾ",
      pestAlerts: "കീടരോഗ അലേർട്ടുകൾ",
      pestDesc: "രോഗ പൊട്ടിത്തെറികൾ, ചികിത്സ ഓർമ്മപ്പെടുത്തലുകൾ",
      generalTips: "പൊതു കൃഷി നുറുങ്ങുകൾ",
      generalDesc: "ദൈനംദിന കൃഷി ഉപദേശങ്ങളും സീസണൽ നുറുങ്ങുകളും",
      testNotification: "ടെസ്റ്റ് അറിയിപ്പ് അയയ്ക്കുക",
      testSent: "ടെസ്റ്റ് അറിയിപ്പ് അയച്ചു!",
      settingsSaved: "അറിയിപ്പ് ക്രമീകരണങ്ങൾ സേവ് ചെയ്തു!"
    }
  };

  const t = texts[language];

  useEffect(() => {
    // Check if push notifications are supported
    setIsSupported('Notification' in window && 'serviceWorker' in navigator);
    setPermission(Notification.permission);
    
    // Load saved settings
    const savedSettings = localStorage.getItem('notification_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Check if already subscribed
    const subscribed = localStorage.getItem('notifications_subscribed') === 'true';
    setIsSubscribed(subscribed);
  }, []);

  const requestPermission = async () => {
    if (!isSupported) return;

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);
      
      if (permission === 'granted') {
        setIsSubscribed(true);
        localStorage.setItem('notifications_subscribed', 'true');
        toast({
          title: t.enabled,
          description: language === "en" ? "You'll now receive farming alerts" : "നിങ്ങൾക്ക് ഇനി കൃഷി അലേർട്ടുകൾ ലഭിക്കും",
        });
        
        // Send a welcome notification
        new Notification(
          language === "en" ? "Kerala Farm AI" : "കേരള ഫാം AI",
          {
            body: language === "en" 
              ? "Notifications enabled! You'll receive important farming alerts."
              : "അറിയിപ്പുകൾ പ്രാപ്തമാക്കി! പ്രധാനപ്പെട്ട കൃഷി അലേർട്ടുകൾ നിങ്ങൾക്ക് ലഭിക്കും.",
            icon: "/favicon.ico",
            tag: "welcome"
          }
        );
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const disableNotifications = () => {
    setIsSubscribed(false);
    localStorage.setItem('notifications_subscribed', 'false');
    toast({
      title: t.disabled,
      description: language === "en" ? "You won't receive notifications" : "നിങ്ങൾക്ക് അറിയിപ്പുകൾ ലഭിക്കില്ല",
    });
  };

  const updateSettings = (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('notification_settings', JSON.stringify(newSettings));
    
    toast({
      title: t.settingsSaved,
      description: language === "en" ? "Your preferences have been updated" : "നിങ്ങളുടെ മുൻഗണനകൾ അപ്ഡേറ്റ് ചെയ്തു",
    });
  };

  const sendTestNotification = () => {
    if (permission === 'granted') {
      new Notification(
        language === "en" ? "Test Notification" : "ടെസ്റ്റ് അറിയിപ്പ്",
        {
          body: language === "en" 
            ? "This is a test notification from Kerala Farm AI"
            : "ഇത് കേരള ഫാം AI യിൽ നിന്നുള്ള ഒരു ടെസ്റ്റ് അറിയിപ്പാണ്",
          icon: "/favicon.ico",
          tag: "test"
        }
      );
      
      toast({
        title: t.testSent,
        description: language === "en" ? "Check your notifications" : "നിങ്ങളുടെ അറിയിപ്പുകൾ പരിശോധിക്കുക",
      });
    }
  };

  if (!isSupported) {
    return (
      <Card className="shadow-farm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              {t.notSupported}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
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
      </div>

      {/* Main Notification Control */}
      <Card className="shadow-farm border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isSubscribed ? (
              <BellRing className="h-5 w-5 text-primary" />
            ) : (
              <Bell className="h-5 w-5 text-muted-foreground" />
            )}
            {isSubscribed ? t.enabled : t.disabled}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {permission === 'denied' && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {t.permissionDenied}
              </AlertDescription>
            </Alert>
          )}

          {permission === 'granted' && isSubscribed && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {t.enabled}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            {!isSubscribed ? (
              <Button 
                onClick={requestPermission}
                className="flex-1"
                disabled={permission === 'denied'}
              >
                <Bell className="h-4 w-4 mr-2" />
                {t.enable}
              </Button>
            ) : (
              <Button 
                variant="outline"
                onClick={disableNotifications}
                className="flex-1"
              >
                {t.disable}
              </Button>
            )}
            
            {isSubscribed && (
              <Button 
                variant="outline"
                onClick={sendTestNotification}
              >
                {t.testNotification}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      {isSubscribed && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="shadow-farm border-l-4 border-l-monsoon">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-monsoon" />
                  <h3 className="font-medium">{t.weatherAlerts}</h3>
                </div>
                <Switch
                  checked={settings.weatherAlerts}
                  onCheckedChange={(checked) => updateSettings('weatherAlerts', checked)}
                />
              </div>
              <p className="text-sm text-muted-foreground">{t.weatherDesc}</p>
            </CardContent>
          </Card>

          <Card className="shadow-farm border-l-4 border-l-warning">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-warning" />
                  <h3 className="font-medium">{t.priceAlerts}</h3>
                </div>
                <Switch
                  checked={settings.priceAlerts}
                  onCheckedChange={(checked) => updateSettings('priceAlerts', checked)}
                />
              </div>
              <p className="text-sm text-muted-foreground">{t.priceDesc}</p>
            </CardContent>
          </Card>

          <Card className="shadow-farm border-l-4 border-l-destructive">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bug className="h-5 w-5 text-destructive" />
                  <h3 className="font-medium">{t.pestAlerts}</h3>
                </div>
                <Switch
                  checked={settings.pestAlerts}
                  onCheckedChange={(checked) => updateSettings('pestAlerts', checked)}
                />
              </div>
              <p className="text-sm text-muted-foreground">{t.pestDesc}</p>
            </CardContent>
          </Card>

          <Card className="shadow-farm border-l-4 border-l-success">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <h3 className="font-medium">{t.generalTips}</h3>
                </div>
                <Switch
                  checked={settings.generalFarmTips}
                  onCheckedChange={(checked) => updateSettings('generalFarmTips', checked)}
                />
              </div>
              <p className="text-sm text-muted-foreground">{t.generalDesc}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PushNotificationSetup;