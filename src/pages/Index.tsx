import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Dashboard from "@/components/Dashboard";
import TabNavigation, { TabType } from "@/components/TabNavigation";
import DiseaseDetection from "@/components/DiseaseDetection";
import CropRecommendation from "@/components/CropRecommendation";
import EnhancedWeather from "@/components/EnhancedWeather";
import MarketPrices from "@/components/MarketPrices";
import BilingualChatbot from "@/components/BilingualChatbot";
import FarmerProfile from "@/components/FarmerProfile";
import PushNotificationSetup from "@/components/PushNotificationSetup";
import Footer from "@/components/Footer";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "ml">("en");
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [offlineData, setOfflineData] = useState<any>(null);

  // Language toggle
  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "ml" : "en");
  };

  // Offline data caching
  useEffect(() => {
    // Cache essential data for offline use
    const cacheData = {
      weather: { temperature: 32, condition: "Partly Cloudy", humidity: 85 },
      prices: { rice: 45, pepper: 850, coconut: 25 },
      timestamp: Date.now()
    };
    localStorage.setItem("farmAssistantCache", JSON.stringify(cacheData));
    setOfflineData(cacheData);
  }, []);

  // Check for offline mode
  useEffect(() => {
    const handleOnline = () => {
      console.log("Online mode");
    };
    
    const handleOffline = () => {
      console.log("Offline mode - using cached data");
      const cached = localStorage.getItem("farmAssistantCache");
      if (cached) {
        setOfflineData(JSON.parse(cached));
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "crops":
        return <CropRecommendation language={language} />;
      case "disease":
        return <DiseaseDetection language={language} />;
      case "weather":
        return <EnhancedWeather language={language} />;
      case "market":
        return <MarketPrices language={language} />;
      case "profile":
        return <FarmerProfile language={language} />;
      case "notifications":
        return <PushNotificationSetup language={language} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header language={language} onLanguageToggle={toggleLanguage} />
      
      {activeTab === "dashboard" && <HeroSection />}
      
      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        language={language}
      />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {renderTabContent()}
          
          {/* Chatbot - Always available */}
          {activeTab !== "dashboard" && (
            <div className="mt-12">
              <BilingualChatbot language={language} />
            </div>
          )}
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
};

export default Index;