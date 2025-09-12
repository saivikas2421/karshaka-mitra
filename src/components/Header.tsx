import { Button } from "@/components/ui/enhanced-button";
import { Leaf, Menu, Sun, Cloud, TrendingUp } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 transition-smooth">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-hero rounded-lg shadow-glow">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Kerala Farm AI
              </h1>
              <p className="text-xs text-muted-foreground">Your Smart Farming Assistant</p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="weather" size="sm">
              <Cloud className="h-4 w-4" />
              Weather
            </Button>
            <Button variant="market" size="sm">
              <TrendingUp className="h-4 w-4" />
              Prices
            </Button>
            <Button variant="farm" size="sm">
              <Sun className="h-4 w-4" />
              Crops
            </Button>
          </div>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;