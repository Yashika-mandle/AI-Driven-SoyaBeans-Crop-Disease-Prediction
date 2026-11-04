import { CheckCircle2, TrendingUp, Shield, Clock } from "lucide-react";

const About = () => {
  const benefits = [
    {
      icon: CheckCircle2,
      title: "Early Detection",
      description: "Identify diseases before they spread across your entire crop",
    },
    {
      icon: TrendingUp,
      title: "Increased Yield",
      description: "Protect your harvest and maximize crop productivity",
    },
    {
      icon: Shield,
      title: "Reduced Costs",
      description: "Prevent expensive crop losses with timely intervention",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Get instant results instead of waiting for lab analysis",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About the Project
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our AI-driven system revolutionizes crop disease management by combining 
              cutting-edge deep learning with practical agricultural solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="text-3xl font-bold text-foreground">
                How It Works
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Simply upload an image of a soybean leaf through our intuitive interface. 
                Our advanced deep learning model, trained on thousands of images, instantly 
                analyzes the leaf for signs of disease.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The system identifies the specific disease type, provides a confidence score, 
                and suggests appropriate preventive measures or treatments. All of this happens 
                in seconds, giving farmers the power to act quickly and decisively.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-xl shadow-soft hover:shadow-medium transition-smooth"
                >
                  <benefit.icon className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Real-World Impact
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Precision agriculture meets artificial intelligence to create a sustainable future. 
              By detecting diseases early, farmers can:
            </p>
            <ul className="grid md:grid-cols-2 gap-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span>Reduce pesticide use through targeted treatment</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span>Minimize crop losses and protect their investment</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span>Make data-driven decisions based on accurate AI analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span>Contribute to more sustainable farming practices</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
