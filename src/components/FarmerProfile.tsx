import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Leaf, 
  Save,
  Camera,
  Edit,
  Calendar,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FarmerProfileProps {
  language: "en" | "ml";
}

interface FarmerData {
  name: string;
  phone: string;
  email: string;
  location: string;
  district: string;
  farmSize: string;
  farmType: string;
  primaryCrops: string[];
  experience: string;
  avatar?: string;
}

const FarmerProfile = ({ language }: FarmerProfileProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<FarmerData>({
    name: "",
    phone: "",
    email: "",
    location: "",
    district: "",
    farmSize: "",
    farmType: "",
    primaryCrops: [],
    experience: "",
  });

  const texts = {
    en: {
      title: "Farmer Profile",
      subtitle: "Manage your personal information and farming preferences",
      personalInfo: "Personal Information",
      farmDetails: "Farm Details",
      fullName: "Full Name",
      phoneNumber: "Phone Number",
      emailAddress: "Email Address",
      location: "Village/Location",
      district: "District",
      farmSize: "Farm Size (acres)",
      farmType: "Farm Type",
      primaryCrops: "Primary Crops",
      experience: "Years of Experience",
      save: "Save Profile",
      edit: "Edit Profile",
      cancel: "Cancel",
      saved: "Profile saved successfully!",
      avatar: "Profile Picture",
      stats: "Farm Statistics",
      totalHarvests: "Total Harvests",
      avgYield: "Average Yield",
      bestPrice: "Best Price Achieved",
      recentActivity: "Recent Activity"
    },
    ml: {
      title: "കർഷക പ്രൊഫൈൽ",
      subtitle: "നിങ്ങളുടെ വ്യക്തിഗത വിവരങ്ങളും കൃഷി മുൻഗണനകളും നിയന്ത്രിക്കുക",
      personalInfo: "വ്യക്തിഗത വിവരങ്ങൾ",
      farmDetails: "കൃഷി വിവരങ്ങൾ",
      fullName: "പൂർണ്ണ നാമം",
      phoneNumber: "ഫോൺ നമ്പർ",
      emailAddress: "ഇമെയിൽ വിലാസം",
      location: "ഗ്രാമം/സ്ഥലം",
      district: "ജില്ല",
      farmSize: "കൃഷിഭൂമിയുടെ വലുപ്പം (ഏക്കർ)",
      farmType: "കൃഷിയുടെ തരം",
      primaryCrops: "പ്രധാന വിളകൾ",
      experience: "അനുഭവ വർഷങ്ങൾ",
      save: "പ്രൊഫൈൽ സേവ് ചെയ്യുക",
      edit: "പ്രൊഫൈൽ തിരുത്തുക",
      cancel: "റദ്ദാക്കുക",
      saved: "പ്രൊഫൈൽ വിജയകരമായി സേവ് ചെയ്തു!",
      avatar: "പ്രൊഫൈൽ ചിത്രം",
      stats: "കൃഷി സ്ഥിതിവിവരങ്ങൾ",
      totalHarvests: "മൊത്തം വിളവെടുപ്പ്",
      avgYield: "ശരാശരി വിളവ്",
      bestPrice: "ലഭിച്ച ഏറ്റവും നല്ല വില",
      recentActivity: "സമീപകാല പ്രവർത്തനം"
    }
  };

  const districts = [
    "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", 
    "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", 
    "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
  ];

  const farmTypes = {
    en: ["Organic", "Traditional", "Mixed", "Commercial", "Subsistence"],
    ml: ["ഓർഗാനിക്", "പരമ്പരാഗത", "മിശ്രിത", "വാണിജ്യിക", "ഉപജീവന"]
  };

  const crops = {
    en: ["Rice", "Coconut", "Pepper", "Cardamom", "Rubber", "Tea", "Coffee", "Banana", "Ginger", "Turmeric"],
    ml: ["അരി", "തെങ്ങ്", "കുരുമുളക്", "ഏലക്ക", "റബ്ബർ", "ചായ", "കാപ്പി", "വാഴ", "ഇഞ്ചി", "മഞ്ഞൾ"]
  };

  const t = texts[language];

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('farmer_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('farmer_profile', JSON.stringify(profile));
    setIsEditing(false);
    toast({
      title: t.saved,
      description: language === "en" ? "Your profile has been updated." : "നിങ്ങളുടെ പ്രൊഫൈൽ അപ്ഡേറ്റ് ചെയ്തു.",
    });
  };

  const handleCropToggle = (crop: string) => {
    const updatedCrops = profile.primaryCrops.includes(crop)
      ? profile.primaryCrops.filter(c => c !== crop)
      : [...profile.primaryCrops, crop];
    
    setProfile({ ...profile, primaryCrops: updatedCrops });
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="shadow-farm border-l-4 border-l-primary">
          <CardHeader className="text-center">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-lg">
                  {profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : <User className="h-8 w-8" />}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CardTitle>{profile.name || "Farmer Name"}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-1">
              <MapPin className="h-4 w-4" />
              {profile.location || "Location"}, {profile.district || "District"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
                className="w-full"
              >
                {isEditing ? (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    {t.cancel}
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    {t.edit}
                  </>
                )}
              </Button>
            </div>

            {profile.primaryCrops.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 text-sm">{t.primaryCrops}</h4>
                <div className="flex flex-wrap gap-1">
                  {profile.primaryCrops.map((crop, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="shadow-farm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {t.personalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.fullName}</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phoneNumber}</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.emailAddress}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                    placeholder="farmer@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">{t.district}</Label>
                  <Select
                    value={profile.district}
                    onValueChange={(value) => setProfile({ ...profile, district: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="location">{t.location}</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Village or area name"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Farm Details */}
          <Card className="shadow-farm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-success" />
                {t.farmDetails}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmSize">{t.farmSize}</Label>
                  <Input
                    id="farmSize"
                    value={profile.farmSize}
                    onChange={(e) => setProfile({ ...profile, farmSize: e.target.value })}
                    disabled={!isEditing}
                    placeholder="e.g., 2.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmType">{t.farmType}</Label>
                  <Select
                    value={profile.farmType}
                    onValueChange={(value) => setProfile({ ...profile, farmType: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select farm type" />
                    </SelectTrigger>
                    <SelectContent>
                      {farmTypes[language].map((type, idx) => (
                        <SelectItem key={idx} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">{t.experience}</Label>
                  <Input
                    id="experience"
                    value={profile.experience}
                    onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                    disabled={!isEditing}
                    placeholder="e.g., 10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t.primaryCrops}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {crops[language].map((crop, index) => (
                    <Button
                      key={index}
                      variant={profile.primaryCrops.includes(crop) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCropToggle(crop)}
                      disabled={!isEditing}
                      className="justify-start"
                    >
                      {crop}
                    </Button>
                  ))}
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    {t.save}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    {t.cancel}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;