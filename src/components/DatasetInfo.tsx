import { Database, BarChart3, Target, Award } from "lucide-react";

const DatasetInfo = () => {
  const metrics = [
    {
      icon: Database,
      label: "Dataset Size",
      value: "10,000+",
      description: "High-quality soybean leaf images",
    },
    {
      icon: Target,
      label: "Accuracy",
      value: "93%",
      description: "Disease detection accuracy",
    },
    {
      icon: BarChart3,
      label: "Disease Classes",
      value: "8",
      description: "Different disease types identified",
    },
    {
      icon: Award,
      label: "Validation",
      value: "Cross-validated",
      description: "Rigorously tested model",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Dataset & Accuracy
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Trained on comprehensive datasets with validated accuracy metrics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-xl shadow-soft hover:shadow-medium transition-smooth animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <metric.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                  <div className="text-sm font-medium text-foreground">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-4">About the Dataset</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our model is trained on a comprehensive dataset of over 10,000 high-resolution 
                images of soybean leaves, sourced from multiple agricultural regions and verified 
                by agricultural experts.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The dataset includes images captured under various lighting conditions, growth stages, 
                and disease severity levels to ensure the model performs accurately in real-world scenarios.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-4">Model Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Detection Accuracy</span>
                    <span className="text-sm font-bold text-primary">93%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[93%] gradient-hero rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Precision</span>
                    <span className="text-sm font-bold text-secondary">91%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[91%] gradient-tech rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Recall</span>
                    <span className="text-sm font-bold text-accent">89%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[89%] gradient-accent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DatasetInfo;
