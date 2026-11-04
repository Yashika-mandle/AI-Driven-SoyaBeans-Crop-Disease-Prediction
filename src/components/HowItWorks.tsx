import { Upload, Cpu, AlertCircle, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Image",
      description: "Take or upload a clear photo of the soybean leaf",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Cpu,
      title: "AI Analysis",
      description: "Our deep learning model processes the image instantly",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: AlertCircle,
      title: "Disease Detection",
      description: "System identifies the disease type with confidence score",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: CheckCircle,
      title: "Get Solutions",
      description: "Receive preventive measures and treatment recommendations",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Simple, fast, and accurate disease detection in just four steps
            </p>
          </div>

          <div className="relative">
            {/* Connection Lines - Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent -translate-y-1/2 opacity-20"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-full blur-xl opacity-30 animate-pulse-glow`}></div>
                    <div className={`relative w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-large`}>
                      <step.icon className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-background border-4 border-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="inline-block p-8 bg-card rounded-2xl shadow-medium">
              <p className="text-lg font-medium text-foreground mb-2">
                ⚡ Lightning Fast Results
              </p>
              <p className="text-muted-foreground">
                Get accurate predictions in under 3 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
