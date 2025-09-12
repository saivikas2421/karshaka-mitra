import { Button } from "@/components/ui/enhanced-button";
import { ArrowRight, Bot, Leaf, CloudRain } from "lucide-react";
import heroImage from "@/assets/kerala-farming-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-glow">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Farming Assistant</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-card">Smart Farming for</span>
            <br />
            <span className="bg-gradient-to-r from-success via-primary-glow to-monsoon bg-clip-text text-transparent">
              Kerala's Future
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-card/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Empowering Kerala farmers with AI-driven insights for crop management, 
            weather monitoring, pest control, and market intelligence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="hero" size="xl" className="group">
              Start Your Farm Journey
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="earth" size="xl">
              <Leaf className="h-5 w-5" />
              Explore Features
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 shadow-farm border border-border/50">
              <CloudRain className="h-12 w-12 text-monsoon mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Weather Intelligence</h3>
              <p className="text-muted-foreground text-sm">Real-time weather updates and monsoon predictions for Kerala's climate</p>
            </div>
            
            <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 shadow-farm border border-border/50">
              <Leaf className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Crop Guidance</h3>
              <p className="text-muted-foreground text-sm">AI recommendations for rice, spices, coconut, and traditional Kerala crops</p>
            </div>
            
            <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 shadow-farm border border-border/50">
              <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Smart Assistant</h3>
              <p className="text-muted-foreground text-sm">24/7 AI support for farming decisions and expert advice</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;