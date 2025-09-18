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

    try {
      // Use hardcoded API key
      const apiKey = "sk-proj-your-openai-api-key-here";

      const systemPrompt = language === "en" 
        ? `You are an expert agricultural assistant specializing in Kerala, India farming. Provide practical, accurate advice about crops, diseases, weather, market prices, and farming techniques suitable for Kerala's tropical climate. Keep responses concise but informative. Focus on sustainable and traditional farming practices common in Kerala.`
        : `നിങ്ങൾ കേരളത്തിലെ കൃഷിയിൽ വിദഗ്ധനായ ഒരു കാർഷിക സഹായിയാണ്. വിളകൾ, രോഗങ്ങൾ, കാലാവസ്ഥ, വിപണി വിലകൾ, കൃഷി സാങ്കേതിക വിദ്യകൾ എന്നിവയെക്കുറിച്ച് കേരളത്തിന്റെ ഉഷ്ണമേഖലാ കാലാവസ്ഥയ്ക്ക് അനുയോജ്യമായ പ്രായോഗിക, കൃത്യമായ ഉപദേശം നൽകുക. പ്രതികരണങ്ങൾ സംക്ഷിപ്തമായി എന്നാൽ വിവരപ്രദമായി നിലനിർത്തുക. കേരളത്തിലെ സുസ്ഥിര പരമ്പരാഗത കൃഷി രീതികളിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുക. മലയാളത്തിൽ മാത്രം മറുപടി നൽകുക.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: text
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || (
        language === "en" 
          ? "I apologize, but I couldn't generate a response. Please try again."
          : "ക്ഷമിക്കണം, എനിക്ക് ഒരു പ്രതികരണം സൃഷ്ടിക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക."
      );

      const botMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: language === "en" 
          ? "Sorry, I'm having trouble connecting to the AI service. Please check your internet connection and API key, then try again."
          : "ക്ഷമിക്കണം, AI സേവനവുമായി കണക്റ്റുചെയ്യുന്നതിൽ പ്രശ്നമുണ്ട്. ദയവായി നിങ്ങളുടെ ഇന്റർനെറ്റ് കണക്ഷനും API കീയും പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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