import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { History as HistoryIcon, Calendar, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Prediction {
  id: string;
  predicted_disease: string;
  confidence_percentage: number;
  severity: string | null;
  created_at: string;
  image_url: string | null;
}

const History = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      setPredictions(data || []);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      toast({
        title: "Error",
        description: "Failed to load prediction history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="history" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading your history...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="history" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <HistoryIcon className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Your Analysis History</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Recent Predictions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Track your crop health analysis history and monitor trends over time
            </p>
          </div>

          {predictions.length === 0 ? (
            <div className="text-center p-12 bg-card rounded-2xl shadow-soft">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <HistoryIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No predictions yet</h3>
              <p className="text-muted-foreground">
                Start analyzing your crop images in the Demo section above
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {predictions.map((prediction, index) => (
                <Card
                  key={prediction.id}
                  className="p-6 hover:shadow-medium transition-smooth animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {prediction.predicted_disease}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(prediction.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      {prediction.severity && (
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            prediction.severity === "None"
                              ? "bg-primary/10 text-primary"
                              : prediction.severity === "Low"
                              ? "bg-accent/10 text-accent"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {prediction.severity}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Confidence</span>
                          <span className="text-sm font-semibold text-primary">
                            {prediction.confidence_percentage.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${prediction.confidence_percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default History;
