import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, Upload, History, Settings, LogOut, BarChart3, Loader2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AnalysisData {
  plant_detected?: boolean;
  is_soybean?: boolean;
  crop_name?: string;
  disease?: string;
  confidence_percentage?: number;
  confidence_level?: string;
  severity?: string;
  affected_area_percentage?: number;
  treatment_steps?: string[];
  prevention_steps?: string[];
  detected_symptoms?: string[];
  image_filename?: string;
  saved_at?: string;
}

interface AnalysisHistoryRecord {
  id: string;
  user_id: string;
  analysis_data: AnalysisData;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [lastAnalysis, setLastAnalysis] = useState<AnalysisHistoryRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentAnalyses] = useState([
    { id: 1, disease: "Bacterial Blight", confidence: 93.5, date: "2025-01-10", severity: "Moderate" },
    { id: 2, disease: "Healthy", confidence: 98.2, date: "2025-01-09", severity: "None" },
    { id: 3, disease: "Septoria Leaf Spot", confidence: 87.3, date: "2025-01-08", severity: "Low" },
  ]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchLastAnalysis(session.user.id);
      } else {
        setIsLoading(false);
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchLastAnalysis(session.user.id);
      } else {
        setIsLoading(false);
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchLastAnalysis = async (userId: string) => {
    console.log('Fetching last analysis for user:', userId);
    try {
      const { data, error } = await supabase
        .from('analysis_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      console.log('Fetch result:', { data, error });
      
      if (error) throw error;
      setLastAnalysis(data as AnalysisHistoryRecord | null);
    } catch (error: any) {
      console.error('Error fetching analysis:', error);
      toast({
        title: "Error",
        description: "Failed to load your last analysis",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
              <Sprout className="h-6 w-6" />
              <span>AI CropHealth</span>
            </Link>

            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome Back! 👋
            </h1>
            <p className="text-muted-foreground">
              Monitor your crop health and analyze new images
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Analyses</span>
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">124</div>
            </div>

            <div className="p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Diseases Detected</span>
                <BarChart3 className="h-5 w-5 text-destructive" />
              </div>
              <div className="text-3xl font-bold text-foreground">38</div>
            </div>

            <div className="p-6 bg-card rounded-xl shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Accuracy Rate</span>
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">97.5%</div>
            </div>
          </div>

          {/* My Last Analysis Section */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <div className="p-6 bg-card rounded-2xl shadow-medium">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">My Last Analysis</h2>
              </div>

              {lastAnalysis ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Crop</p>
                      <p className="font-semibold text-foreground">{lastAnalysis.analysis_data.crop_name || 'Soybean'}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Disease Status</p>
                      <p className={`font-semibold ${
                        lastAnalysis.analysis_data.disease === 'Healthy' || lastAnalysis.analysis_data.disease === 'Healthy leaf'
                          ? 'text-green-600' : 'text-destructive'
                      }`}>
                        {lastAnalysis.analysis_data.disease || 'Unknown'}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                      <p className="font-semibold text-primary">
                        {lastAnalysis.analysis_data.confidence_percentage?.toFixed(1) || 0}%
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Saved On</p>
                      <p className="font-semibold text-foreground">
                        {new Date(lastAnalysis.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {lastAnalysis.analysis_data.severity && lastAnalysis.analysis_data.severity !== 'none' && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Severity:</span>
                      <span className={`text-sm font-medium px-2 py-1 rounded capitalize ${
                        lastAnalysis.analysis_data.severity === 'mild' ? 'bg-yellow-500/20 text-yellow-600' :
                        lastAnalysis.analysis_data.severity === 'moderate' ? 'bg-orange-500/20 text-orange-600' :
                        lastAnalysis.analysis_data.severity === 'severe' ? 'bg-red-500/20 text-red-600' :
                        'bg-green-500/20 text-green-600'
                      }`}>
                        {lastAnalysis.analysis_data.severity}
                      </span>
                    </div>
                  )}

                  {lastAnalysis.analysis_data.detected_symptoms && lastAnalysis.analysis_data.detected_symptoms.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Detected Symptoms:</p>
                      <div className="flex flex-wrap gap-2">
                        {lastAnalysis.analysis_data.detected_symptoms.map((symptom, i) => (
                          <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {lastAnalysis.analysis_data.treatment_steps && lastAnalysis.analysis_data.treatment_steps.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Treatment Recommendations:</p>
                      <ul className="space-y-1">
                        {lastAnalysis.analysis_data.treatment_steps.slice(0, 3).map((step, i) => (
                          <li key={i} className="text-sm text-foreground flex items-start gap-2">
                            <span className="text-primary font-bold">{i + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-4">No analysis saved yet.</p>
                  <Link to="/#demo">
                    <Button variant="outline">Analyze Your First Image</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="p-8 bg-card rounded-2xl shadow-medium h-full">
                <h2 className="text-2xl font-bold text-foreground mb-4">New Analysis</h2>
                <p className="text-muted-foreground mb-6">
                  Upload a new soybean leaf image for disease prediction
                </p>

                <Link to="/#demo">
                  <Button className="w-full gradient-hero text-white shadow-soft hover:shadow-medium transition-smooth" size="lg">
                    <Upload className="mr-2 h-5 w-5" />
                    Go to Analyzer
                  </Button>
                </Link>
              </div>
            </div>

            {/* Recent Analyses */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="p-8 bg-card rounded-2xl shadow-medium h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Recent Analyses</h2>
                  <History className="h-6 w-6 text-muted-foreground" />
                </div>

                <div className="space-y-4">
                  {recentAnalyses.map((analysis) => (
                    <div
                      key={analysis.id}
                      className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{analysis.disease}</span>
                        <span className="text-sm text-muted-foreground">{analysis.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Confidence: <span className="text-primary font-medium">{analysis.confidence}%</span>
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          analysis.severity === "None" 
                            ? "bg-primary/10 text-primary" 
                            : analysis.severity === "Low"
                            ? "bg-accent/10 text-accent"
                            : "bg-destructive/10 text-destructive"
                        }`}>
                          {analysis.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6">
                  View All Analyses
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;