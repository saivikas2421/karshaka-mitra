import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Upload, Camera, FileImage, AlertCircle, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiseaseDetectionProps {
  language: "en" | "ml";
}

const DiseaseDetection = ({ language }: DiseaseDetectionProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageSelect(file);
    }
  }, []);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setAnalysisResult(null);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        disease: language === "en" ? "Brown Leaf Spot" : "തവിട്ട് ഇല പുള്ളി",
        confidence: 87,
        severity: language === "en" ? "Moderate" : "ഇടത്തരം",
        treatment: language === "en" 
          ? "Apply fungicide spray (Mancozeb 75% WP) at 2g/liter water. Improve field drainage and avoid overhead irrigation." 
          : "ഫംഗിസൈഡ് സ്പ്രേ (മാൻകോസെബ് 75% WP) 2g/ലിറ്റർ വെള്ളത്തിൽ കലർത്തി തളിക്കുക. വയൽ ഡ്രെയിനേജ് മെച്ചപ്പെടുത്തുകയും മുകളിൽ നിന്നുള്ള നനവ് ഒഴിവാക്കുകയും ചെയ്യുക.",
        prevention: language === "en" 
          ? "Use disease-resistant varieties, maintain proper spacing, and ensure good air circulation."
          : "രോഗ പ്രതിരോധ ഇനങ്ങൾ ഉപയോഗിക്കുക, ശരിയായ അകലം പാലിക്കുക, നല്ല വായു സഞ്ചാരം ഉറപ്പാക്കുക."
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  const texts = {
    en: {
      title: "AI Disease Detection",
      subtitle: "Upload crop images for instant diagnosis",
      dragText: "Drag & drop crop images here",
      orText: "or",
      browseText: "Browse Files",
      cameraText: "Take Photo",
      analyzeText: "Analyze Disease",
      analyzingText: "Analyzing...",
      resetText: "Upload New Image",
      resultsTitle: "Analysis Results",
      diseaseLabel: "Disease Detected:",
      confidenceLabel: "Confidence:",
      severityLabel: "Severity:",
      treatmentLabel: "Treatment:",
      preventionLabel: "Prevention:",
    },
    ml: {
      title: "AI രോഗ നിർണയം",
      subtitle: "തൽക്ഷണ രോഗനിർണയത്തിനായി വിള ചിത്രങ്ങൾ അപ്ലോഡ് ചെയ്യുക",
      dragText: "വിള ചിത്രങ്ങൾ ഇവിടെ വലിച്ചിട്ടുക",
      orText: "അല്ലെങ്കിൽ",
      browseText: "ഫയലുകൾ ബ്രൗസ് ചെയ്യുക",
      cameraText: "ഫോട്ടോ എടുക്കുക",
      analyzeText: "രോഗം വിശകലനം ചെയ്യുക",
      analyzingText: "വിശകലനം ചെയ്യുന്നു...",
      resetText: "പുതിയ ചിത്രം അപ്ലോഡ് ചെയ്യുക",
      resultsTitle: "വിശകലന ഫലങ്ങൾ",
      diseaseLabel: "കണ്ടെത്തിയ രോഗം:",
      confidenceLabel: "ആത്മവിശ്വാസം:",
      severityLabel: "തീവ്രത:",
      treatmentLabel: "ചികിത്സ:",
      preventionLabel: "പ്രതിരോധം:",
    }
  };

  const t = texts[language];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-hero bg-clip-text text-transparent">
          {t.title}
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="shadow-farm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileImage className="h-5 w-5 text-primary" />
              {language === "en" ? "Image Upload" : "ചിത്ര അപ്ലോഡ്"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!imagePreview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-smooth cursor-pointer",
                  isDragging 
                    ? "border-primary bg-primary/5" 
                    : "border-muted-foreground/30 hover:border-primary/50 hover:bg-accent/30"
                )}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">{t.dragText}</p>
                <p className="text-sm text-muted-foreground mb-4">{t.orText}</p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button variant="farm" size="sm" asChild>
                    <label className="cursor-pointer">
                      <FileImage className="h-4 w-4" />
                      {t.browseText}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageSelect(file);
                        }}
                      />
                    </label>
                  </Button>
                  <Button variant="weather" size="sm">
                    <Camera className="h-4 w-4" />
                    {t.cameraText}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Selected crop"
                    className="w-full h-64 object-cover rounded-lg shadow-earth"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={resetAnalysis}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                      {t.analyzingText}
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4" />
                      {t.analyzeText}
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="shadow-farm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              {t.resultsTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!analysisResult ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{language === "en" ? "Upload an image to see results" : "ഫലങ്ങൾ കാണാൻ ഒരു ചിത്രം അപ്ലോഡ് ചെയ്യുക"}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{t.diseaseLabel}</span>
                    <span className="text-success font-semibold">{analysisResult.confidence}%</span>
                  </div>
                  <p className="font-bold text-lg text-success">{analysisResult.disease}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.severityLabel} {analysisResult.severity}
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2 text-warning">{t.treatmentLabel}</h4>
                    <p className="text-sm bg-warning/10 p-3 rounded border-l-4 border-warning">
                      {analysisResult.treatment}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-primary">{t.preventionLabel}</h4>
                    <p className="text-sm bg-primary/10 p-3 rounded border-l-4 border-primary">
                      {analysisResult.prevention}
                    </p>
                  </div>
                </div>

                <Button variant="earth" className="w-full" onClick={resetAnalysis}>
                  <Upload className="h-4 w-4" />
                  {t.resetText}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetection;