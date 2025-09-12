import { Leaf, Heart } from "lucide-react";

interface FooterProps {
  language: "en" | "ml";
}

const Footer = ({ language }: FooterProps) => {
  const tagline = language === "en" 
    ? "AI for Smarter Kerala Farming" 
    : "മികച്ച കേരള കൃഷിക്കായി AI";

  return (
    <footer className="bg-card border-t border-border py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-gradient-hero rounded-lg shadow-glow">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">
              Kerala Farm AI
            </span>
          </div>
          
          <p className="text-muted-foreground mb-4 flex items-center justify-center gap-2">
            {tagline}
            <Heart className="h-4 w-4 text-destructive" />
          </p>
          
          <div className="text-sm text-muted-foreground">
            <p>
              {language === "en" 
                ? "Empowering farmers with AI technology • Built with love for Kerala's agricultural community"
                : "AI സാങ്കേതികവിദ്യയിലൂടെ കർഷകരെ ശാക്തീകരിക്കുന്നു • കേരളത്തിന്റെ കാർഷിക സമൂഹത്തിന് വേണ്ടി സ്നേഹത്തോടെ നിർമ്മിച്ചത്"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;