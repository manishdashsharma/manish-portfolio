
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '../lib/utils';

const About: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    "Gen AI", "Node.js", "Python/Django", "FastAPI", "React", "Next.js", "Docker",
    "Kubernetes", "Kafka", "WebSockets", "MongoDB", "Postgres",
    "Prisma ORM", "TypeScript", "JavaScript", "AWS", "firebase", "Redis","Git/Github"
  ];

  const experiences = [
    {
      role: "Senior Software Engineer",
      company: "Rightsteps,UK (Remote)",
      period: "July 2025 – Present",
      description: "Building scalable web applications, designing RESTful APIs that drive real-time interactions between users and our platform, and integrating AI-powered features into the product using GenAI models."
    },
    {
      role: "Technical Project Manager",
      company: "DoWell UX Living Lab",
      period: "Jan 2024 – July 2025",
      description: "Overseeing product and technology development, managing cross-functional teams, and driving strategic innovation."
    },
    {
      role: "Senior Software Manager",
      company: "DoWell Research Singapore",
      period: "May 2022 – Jan 2024",
      description: "Led technical projects, coordinated with international teams, and implemented best engineering practices."
    },
    {
      role: "Software Engineer",
      company: "DoWell Research Singapore",
      period: "Jan 2021 – May 2022",
      description: "Developed and maintained software applications, collaborated on architecture decisions, and implemented CI/CD pipelines."
    }
  ];

  return (
    <section id="about" className="section-padding border-t-2 border-ink bg-secondary/60">
      <div className="container mx-auto container-padding max-w-6xl">
        <div className="mb-20">
          <p className="text-xs font-mono font-bold text-coral tracking-widest uppercase mb-3">
            /03 — About
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-6">
            Background &amp; Expertise
          </h2>
          <p className="max-w-2xl text-ink/70 leading-relaxed text-lg">
            Technical skills, professional journey, and the approach that drives
            innovation in software engineering.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-widest mb-6 text-ink/60">
              Technical Skills
            </h3>

            <div className="flex flex-wrap gap-2.5 mb-10">
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className={cn(
                    "opacity-0 transform translate-y-4 transition-all duration-500",
                    inView && "opacity-100 translate-y-0"
                  )}
                  style={{ transitionDelay: `${index * 0.03}s` }}
                >
                  <span className="brutal-chip">
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            <div
              className={cn(
                "brutal-card p-8 opacity-0 transform translate-y-4",
                inView && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: "0.6s" }}
            >
              <h4 className="font-display text-2xl mb-4 tracking-tight">
                Philosophy
              </h4>
              <p className="text-ink/70 mb-4 leading-relaxed">
                Clean code, thoughtful architecture, continuous learning — earned by shipping real
                systems and fixing real edge cases, not patching around them.
              </p>
              <p className="text-ink/70 leading-relaxed">
                Focused on solving real problems, not hypothetical ones — increasingly with GenAI
                and LLMs, built in ways that are genuinely useful, not just bolted on.
              </p>
            </div>

            <div
              className={cn(
                "brutal-card p-8 mt-10 opacity-0 transform translate-y-4",
                inView && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: "0.8s" }}
            >
              <h4 className="font-display text-2xl mb-4 tracking-tight">
                Cloud &amp; Infrastructure
              </h4>
              <p className="text-ink/70 leading-relaxed">
                Specialized in designing and implementing cloud infrastructure on AWS, with expertise
                in containerization using Docker and Kubernetes, robust CI/CD pipelines for seamless
                deployment, and GPU-backed infrastructure for running AI/ML workloads in production.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-widest mb-6 text-ink/60">
              Professional Experience
            </h3>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={exp.company + exp.period}
                  className={cn(
                    "relative flex gap-4 opacity-0 transform translate-y-4 transition-all duration-500",
                    inView && "opacity-100 translate-y-0"
                  )}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  <div className="shrink-0 w-11 h-11 border-2 border-ink bg-ink text-lime font-mono text-sm font-bold flex items-center justify-center">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="border-b-2 border-ink/15 pb-6 flex-1">
                    <div className="mb-1 text-xs text-coral font-mono font-bold uppercase tracking-wide">{exp.period}</div>
                    <h4 className="font-display text-lg tracking-tight">{exp.role}</h4>
                    <div className="text-sm text-ink/70 mb-2 font-semibold">{exp.company}</div>
                    <p className="text-sm text-ink/60 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
