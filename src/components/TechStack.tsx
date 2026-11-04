import { Code2, Brain, Camera, Server, Layers, Database } from "lucide-react";

const TechStack = () => {
  const technologies = [
    {
      icon: Code2,
      name: "Python",
      description: "Core programming language",
      color: "text-blue-500",
    },
    {
      icon: Brain,
      name: "TensorFlow & Keras",
      description: "Deep learning frameworks",
      color: "text-orange-500",
    },
    {
      icon: Camera,
      name: "OpenCV",
      description: "Image processing library",
      color: "text-green-500",
    },
    {
      icon: Server,
      name: "Flask/Django",
      description: "Web framework",
      color: "text-gray-700",
    },
    {
      icon: Layers,
      name: "CNN Architecture",
      description: "Neural network model",
      color: "text-purple-500",
    },
    {
      icon: Database,
      name: "Dataset Processing",
      description: "Data management",
      color: "text-cyan-500",
    },
  ];

  return (
    <section id="tech" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Technology Stack
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Built with industry-leading technologies and frameworks for maximum 
              accuracy and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group p-8 bg-card rounded-xl shadow-soft hover:shadow-large transition-smooth hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`p-4 bg-muted/50 rounded-2xl group-hover:scale-110 transition-bounce ${tech.color}`}>
                    <tech.icon className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
              Why These Technologies?
            </h3>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
              We've carefully selected each technology for its proven track record in production environments. 
              TensorFlow and Keras provide the deep learning capabilities needed for accurate disease detection, 
              while OpenCV handles complex image preprocessing. Flask/Django powers our robust API, ensuring 
              reliable performance and scalability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
