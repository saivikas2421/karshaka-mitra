import { useState } from "react";
import { 
  Home, 
  Leaf, 
  Bug, 
  Cloud, 
  TrendingUp,
  Stethoscope 
} from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { cn } from "@/lib/utils";

export type TabType = "dashboard" | "crops" | "disease" | "weather" | "market";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  language: "en" | "ml";
}

const TabNavigation = ({ activeTab, onTabChange, language }: TabNavigationProps) => {
  const tabs = [
    {
      id: "dashboard" as TabType,
      label: language === "en" ? "Dashboard" : "ഡാഷ്‌ബോർഡ്",
      icon: Home,
    },
    {
      id: "crops" as TabType,
      label: language === "en" ? "Crops" : "വിളകൾ",
      icon: Leaf,
    },
    {
      id: "disease" as TabType,
      label: language === "en" ? "Disease" : "രോഗം",
      icon: Stethoscope,
    },
    {
      id: "weather" as TabType,
      label: language === "en" ? "Weather" : "കാലാവസ്ഥ",
      icon: Cloud,
    },
    {
      id: "market" as TabType,
      label: language === "en" ? "Market" : "മാർക്കറ്റ്",
      icon: TrendingUp,
    },
  ];

  return (
    <nav className="bg-card border-t border-border sticky bottom-0 z-40 md:relative md:border-t-0 md:border-b md:top-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-around md:justify-center md:space-x-8 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-lg transition-smooth min-w-0 flex-1 md:flex-initial md:min-w-[80px]",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-farm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <Icon 
                  className={cn(
                    "h-6 w-6 mb-1",
                    isActive ? "text-primary-foreground" : "text-current"
                  )} 
                />
                <span className="text-xs font-medium truncate">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default TabNavigation;