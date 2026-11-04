import { Users, Linkedin, Mail, Laptop, User, Sprout, Palette } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Yogesh Kumar",
      role: "Project Lead & AI Researcher",
      description: "Computer Science student passionate about AI applications in agriculture and crop disease detection.",
      icon: Laptop,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yogesh",
    },
    {
      name: "Yashika Mandle",
      role: "Machine Learning Engineer",
      description: "Engineering student specializing in machine learning and computer vision for agricultural solutions.",
      icon: User,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yashika&gender=female",
    },
    {
      name: "Disha Nayak",
      role: "Agricultural Expert",
      description: "Agriculture student with interest in sustainable farming and plant pathology research.",
      icon: Sprout,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Disha&gender=female",
    },
    {
      name: "Harshita Rathod",
      role: "UI/UX Designer",
      description: "Design student focused on intuitive interfaces for agri-tech products.",
      icon: Palette,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harshita&gender=female",
    },
  ];

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <Users className="h-4 w-4" />
              <span>Meet Our Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Expert Contributors
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A multidisciplinary team combining expertise in AI, agriculture, and software engineering
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => {
              const IconComponent = member.icon;
              return (
                <div
                  key={index}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-large transition-smooth transform hover:-translate-y-2 duration-300">
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 p-8 relative">
                      <div className="absolute top-4 right-4 w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                      <p className="text-sm font-medium text-primary mb-2">{member.role}</p>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{member.description}</p>
                      
                      <div className="flex gap-3">
                        <button className="p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-smooth">
                          <Linkedin className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-smooth">
                          <Mail className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="inline-block p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl">
              <p className="text-lg font-medium text-foreground mb-2">
                Want to collaborate with us?
              </p>
              <p className="text-muted-foreground mb-4">
                We're always looking for passionate individuals to join our mission
              </p>
              <a href="#contact">
                <button className="px-6 py-2 gradient-hero text-white rounded-lg shadow-soft hover:shadow-medium transition-smooth">
                  Get in Touch
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
