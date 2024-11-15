import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".scroll-section").forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full glass z-50">
        <nav className="container mx-auto px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center"
          >
            <span className="text-xl font-semibold">Brand</span>
            <div className="space-x-8">
              {["Features", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-primary hover:text-accent transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        </nav>
      </header>

      <main className="pt-24">
        <section className="container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="px-4 py-1 rounded-full bg-secondary text-sm font-medium inline-block mb-6">
              Welcome
            </span>
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Design that inspires.
              <br />
              Technology that delivers.
            </h1>
            <p className="text-xl text-accent mb-8">
              Experience the perfect blend of form and function.
            </p>
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300">
              Get Started
            </button>
          </motion.div>
        </section>

        <section id="features" className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="scroll-section">
              <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  "Intuitive Design",
                  "Powerful Performance",
                  "Seamless Integration",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="glass p-8 rounded-2xl hover:translate-y-[-4px] transition-transform duration-300"
                  >
                    <h3 className="text-xl font-semibold mb-4">{feature}</h3>
                    <p className="text-accent">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-24">
          <div className="container mx-auto px-6">
            <div className="scroll-section max-w-3xl mx-auto text-center">
              <span className="px-4 py-1 rounded-full bg-secondary text-sm font-medium inline-block mb-6">
                About Us
              </span>
              <h2 className="text-4xl font-bold mb-8">Our Story</h2>
              <p className="text-lg text-accent mb-8">
                We believe in creating products that combine beautiful design with
                exceptional functionality. Every detail matters, and every
                interaction counts.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="scroll-section max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
              <p className="text-lg text-accent mb-8">
                Ready to experience the future of design? Let's connect.
              </p>
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <span className="text-xl font-semibold mb-4 md:mb-0">Brand</span>
            <div className="space-x-8">
              {["Privacy", "Terms", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-primary-foreground hover:text-accent transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;