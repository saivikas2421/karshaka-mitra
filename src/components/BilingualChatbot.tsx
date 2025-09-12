import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Leaf,
  Bug,
  Cloud,
  TrendingUp,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  category?: string;
}

interface BilingualChatbotProps {
  language: "en" | "ml";
}

const BilingualChatbot = ({ language }: BilingualChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const texts = {
    en: {
      title: "AI Farm Assistant",
      subtitle: "Ask questions about farming, weather, diseases, and market prices",
      placeholder: "Ask me about crops, weather, diseases, or market prices...",
      send: "Send",
      listening: "Listening...",
      speaking: "Speaking...",
      typing: "AI is typing...",
      suggestions: "Quick Questions",
    },
    ml: {
      title: "AI കൃഷി സഹായി",
      subtitle: "കൃഷി, കാലാവസ്ഥ, രോഗങ്ങൾ, വിപണി വിലകൾ എന്നിവയെക്കുറിച്ച് ചോദ്യങ്ങൾ ചോദിക്കുക",
      placeholder: "വിളകൾ, കാലാവസ്ഥ, രോഗങ്ങൾ, അല്ലെങ്കിൽ വിപണി വിലകൾ എന്നിവയെക്കുറിച്ച് എന്നോട് ചോദിക്കുക...",
      send: "അയയ്ക്കുക",
      listening: "കേൾക്കുന്നു...",
      speaking: "സംസാരിക്കുന്നു...",
      typing: "AI ടൈപ്പ് ചെയ്യുന്നു...",
      suggestions: "പെട്ടെന്നുള്ള ചോദ്യങ്ങൾ",
    }
  };

  const t = texts[language];

  const quickQuestions = language === "en" ? [
    { text: "What crops are best for this season?", category: "crops", icon: Leaf },
    { text: "How to treat brown leaf spot?", category: "disease", icon: Bug },
    { text: "Today's weather forecast", category: "weather", icon: Cloud },
    { text: "Current pepper prices", category: "market", icon: TrendingUp },
    { text: "When to harvest rice?", category: "schedule", icon: Calendar },
  ] : [
    { text: "ഈ സീസണിൽ ഏതു വിളകളാണ് മികച്ചത്?", category: "crops", icon: Leaf },
    { text: "തവിട്ട് ഇല പുള്ളി എങ്ങനെ ചികിത്സിക്കണം?", category: "disease", icon: Bug },
    { text: "ഇന്നത്തെ കാലാവസ്ഥാ പ്രവചനം", category: "weather", icon: Cloud },
    { text: "നിലവിലെ കുരുമുളക് വില", category: "market", icon: TrendingUp },
    { text: "അരി എപ്പോൾ വിളവെടുക്കണം?", category: "schedule", icon: Calendar },
  ];

  const initialMessage: Message = {
    id: 0,
    text: language === "en" 
      ? "Hello! I'm your AI farming assistant. I can help you with crop recommendations, disease diagnosis, weather updates, and market prices. How can I assist you today?"
      : "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI കൃഷി സഹായിയാണ്. വിള ശുപാർശകൾ, രോഗനിർണയം, കാലാവസ്ഥാ അപ്ഡേറ്റുകൾ, വിപണി വിലകൾ എന്നിവയിൽ ഞാൻ സഹായിക്കാം. ഇന്ന് എങ്ങനെ സഹായിക്കാം?",
    sender: "bot",
    timestamp: new Date(),
    category: "greeting"
  };

  useEffect(() => {
    setMessages([initialMessage]);
  }, [language]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = language === "en" ? {
        crops: "Based on current weather conditions in Kerala, I recommend planting rice during the Kharif season (June-October). For spices, black pepper and cardamom are excellent choices for the Western Ghats region. The current soil moisture and temperature are ideal for these crops.",
        disease: "Brown leaf spot is a common rice disease. Treatment: 1) Apply Mancozeb 75% WP at 2g/liter, 2) Improve field drainage, 3) Avoid overhead irrigation, 4) Remove infected plant debris. Prevention includes using resistant varieties and maintaining proper plant spacing.",
        weather: "Today's weather in Kochi: Partly cloudy, 32°C, 85% humidity. Tomorrow expects light rain (80% chance). Perfect conditions for rice cultivation. Avoid pesticide spraying for the next 2 days due to expected rainfall.",
        market: "Current black pepper price: ₹850/kg (↑1.19% from yesterday). High demand from export markets. Good time to sell if you have stock. Rice price stable at ₹45/kg. Coconut price declining to ₹25/kg.",
        schedule: "Rice harvesting schedule depends on variety: Short duration (90-100 days), Medium (100-120 days), Long (120-150 days). Check grain moisture - harvest when it's 20-25%. Current weather is favorable for harvesting.",
        default: "I understand you're asking about farming. Could you be more specific? I can help with crop recommendations, disease treatment, weather forecasting, market prices, or farming schedules. What would you like to know?"
      } : {
        crops: "കേരളത്തിലെ നിലവിലെ കാലാവസ്ഥാ സാഹചര്യങ്ങളെ അടിസ്ഥാനമാക്കി, ഖരീഫ് സീസണിൽ (ജൂൺ-ഒക്ടോബർ) നെല്ല് നടുന്നത് ഞാൻ ശുപാർശ ചെയ്യുന്നു. സുഗന്ധവ്യഞ്ജനങ്ങൾക്കായി, കുരുമുളകും ഏലക്കയും പശ്ചിമഘട്ട പ്രദേശത്തിന് മികച്ച തിരഞ്ഞെടുപ്പാണ്.",
        disease: "തവിട്ട് ഇല പുള്ളി ഒരു സാധാരണ നെല്ല് രോഗമാണ്. ചികിത്സ: 1) മാൻകോസെബ് 75% WP 2g/ലിറ്റർ പ്രയോഗിക്കുക, 2) വയൽ ഡ്രെയിനേജ് മെച്ചപ്പെടുത്തുക, 3) മുകളിൽ നിന്നുള്ള ജലസേചനം ഒഴിവാക്കുക, 4) രോഗബാധിതമായ ചെടി അവശിഷ്ടങ്ങൾ നീക്കം ചെയ്യുക.",
        weather: "കൊച്ചിയിലെ ഇന്നത്തെ കാലാവസ്ഥ: ഭാഗികമായി മേഘാവൃതം, 32°C, 85% ആർദ്രത. നാളെ നേരിയ മഴ പ്രതീക്ഷിക്കുന്നു (80% സാധ്യത). നെല്ല് കൃഷിക്ക് അനുയോജ്യമായ സാഹചര്യങ്ങൾ.",
        market: "നിലവിലെ കുരുമുളക് വില: ₹850/കിലോ (ഇന്നലെയെ അപേക്ഷിച്ച് ↑1.19%). കയറ്റുമതി വിപണികളിൽ നിന്ന് ഉയർന്ന ആവശ്യം. സ്റ്റോക്ക് ഉണ്ടെങ്കിൽ വിൽക്കാൻ നല്ല സമയം.",
        schedule: "നെല്ല് വിളവെടുപ്പ് സമയക്രമം ഇനത്തെ ആശ്രയിച്ചിരിക്കുന്നു: ഹ്രസ്വകാലം (90-100 ദിവസം), ഇടത്തരം (100-120 ദിവസം), ദീർഘകാലം (120-150 ദിവസം). ധാന്യ ഈർപ്പം പരിശോധിക്കുക - 20-25% ആയിരിക്കുമ്പോൾ വിളവെടുക്കുക.",
        default: "നിങ്ങൾ കൃഷിയെക്കുറിച്ച് ചോദിക്കുന്നുണ്ടെന്ന് ഞാൻ മനസ്സിലാക്കുന്നു. കൂടുതൽ വ്യക്തമാക്കാമോ? വിള ശുപാർശകൾ, രോഗ ചികിത്സ, കാലാവസ്ഥാ പ്രവചനം, വിപണി വിലകൾ, അല്ലെങ്കിൽ കൃഷി സമയക്രമങ്ങൾ എന്നിവയിൽ എനിക്ക് സഹായിക്കാം."
      };

      let response = responses.default;
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('crop') || lowerText.includes('plant') || lowerText.includes('വിള') || lowerText.includes('നട')) {
        response = responses.crops;
      } else if (lowerText.includes('disease') || lowerText.includes('spot') || lowerText.includes('രോഗ') || lowerText.includes('പുള്ളി')) {
        response = responses.disease;
      } else if (lowerText.includes('weather') || lowerText.includes('rain') || lowerText.includes('കാലാവസ്ഥ') || lowerText.includes('മഴ')) {
        response = responses.weather;
      } else if (lowerText.includes('price') || lowerText.includes('market') || lowerText.includes('വില') || lowerText.includes('മാർക്കറ്റ്')) {
        response = responses.market;
      } else if (lowerText.includes('harvest') || lowerText.includes('schedule') || lowerText.includes('വിളവ') || lowerText.includes('സമയ')) {
        response = responses.schedule;
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
    // Text-to-speech would be implemented here
  };

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

      {/* Quick Questions */}
      <Card className="shadow-farm">
        <CardHeader>
          <CardTitle className="text-lg">{t.suggestions}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => {
              const Icon = question.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question.text)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="truncate max-w-[200px]">{question.text}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="shadow-farm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            {language === "en" ? "Chat" : "ചാറ്റ്"}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleListening}
              className={cn(isListening && "bg-primary text-primary-foreground")}
            >
              {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleSpeech}
              className={cn(isSpeaking && "bg-primary text-primary-foreground")}
            >
              {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === "bot" && (
                    <div className="p-2 bg-primary rounded-full">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={cn(
                      "text-xs mt-1",
                      message.sender === "user" 
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <div className="p-2 bg-primary rounded-full">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="p-2 bg-primary rounded-full">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.placeholder}
                  disabled={isTyping}
                />
              </div>
              <Button 
                type="submit" 
                variant="hero" 
                size="icon"
                disabled={!input.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            {isListening && (
              <p className="text-sm text-primary mt-2 flex items-center gap-2">
                <Mic className="h-4 w-4 animate-pulse" />
                {t.listening}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BilingualChatbot;