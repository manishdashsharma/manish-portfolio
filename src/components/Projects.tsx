import React, { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProjectCard from "./ProjectCard";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectData {
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  clientMessage?: string;
  longDescription?: string;
  rating?: number;
}

const Projects: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projectsData: ProjectData[] = [
    {
      title: "Tradescribe.in",
      description:
        "A stock data management and analysis platform designed to help users track, manage, and analyze market data efficiently.",
      techStack: [
        "Node.js",
        "React",
        "MongoDB",
        "TypeScript",
        "Docker",
        "WebSockets",
      ],
      liveLink: "https://tradescribe.in",
      clientMessage:
        "The platform has significantly improved our data analysis process, saving us hours of manual work each week.",
      longDescription:
        "Tradescribe.in is a comprehensive stock data management and analysis platform that helps financial analysts and traders track market trends, manage portfolios, and make data-driven decisions. The platform features real-time data visualization, custom alerts, and automated reporting to streamline the investment process.",
      rating: 4,
    },
    {
      title: "Room Spa",
      description:
        "A comprehensive spa management system that streamlines appointment booking, service management, and client tracking.",
      techStack: ["Python-Django", "React", "Flutter", "Socket.io", "Docker"],
      longDescription:
        "RoomSpa is an end-to-end spa management solution that helps spa owners and managers streamline their operations. The system handles appointment scheduling, employee management, inventory tracking, and customer relationship management in one integrated platform.",
      rating: 5,
    },
    {
      title: "Nessa",
      description:
        "A platform delivering sustainable and high-performance lighting solutions across 20+ countries.",
      techStack: ["Node.js", "React", "MongoDB", "Docker"],
      longDescription:
        "Nessa is an e-commerce platform specializing in sustainable lighting solutions. The platform includes product customization tools, energy savings calculators, and international shipping logistics to serve customers across more than 20 countries.",
      rating: 4,
    },
    {
      title: "Promptly",
      description:
        "A versatile Discord bot for automating event reminders and announcements.",
      techStack: ["Node.js", "Docker", "Discord API"],
      liveLink: "https://github.com/manishdashsharma/Promptly",
      longDescription:
        "Promptly is a Discord bot that helps server administrators automate reminders and announcements. It features customizable scheduling, role-based notifications, and integration with external calendars.",
      rating: 4,
    },
    {
      title: "WoodLog",
      description:
        "An image-processing solution designed to assist post officers in efficiently counting logs.",
      techStack: ["Python", "Pandas", "YOLO", "Docker"],
      liveLink: "https://github.com/manishdashsharma/woodlog",
      longDescription:
        "WoodLog uses computer vision technology to automatically count and measure logs from images, saving postal officers significant time in inventory management. The solution processes images in real-time and generates detailed reports.",
      rating: 4,
    },
    
    {
      title: "Scoopie",
      description:
        "A social media app connecting people through interactive content.",
      techStack: [
        "Node.js",
        "MongoDB",
        "Flutter",
        "Prisma",
        "TypeScript",
        "Tailwind",
      ],
      longDescription:
        "Scoopie is a social media platform focused on interactive content sharing. The app features story-based content, interactive polls, and community-driven challenges to foster engagement among users.",
      rating: 5,
    },
    {
      title: "TaskForge",
      description:
        "An open-source project management and issue-tracking tool designed to enhance team collaboration and productivity.",
      techStack: ["Node.js", "React", "TypeScript", "GitHub API"],
      liveLink: "https://github.com/manishdashsharma/TaskForge",
      longDescription:
        "TaskForge is an open-source project management tool that helps development teams track issues, manage projects, and collaborate efficiently. The tool integrates with GitHub to provide seamless code and issue management.",
      rating: 4,
    },
    {
      title: "Secure Repository",
      description:
        "A secure backup system utilizing GitHub Actions for automated backups post-merge, ensuring data integrity and safety.",
      techStack: ["Python-Django", "React", "MongoDB", "GitHub Actions"],
      longDescription:
        "Secure Repository provides organizations with a reliable backup solution that automatically creates secure backups after code merges. The system ensures data integrity and provides easy recovery options in case of data loss.",
      rating: 3,
    },
    {
      title: "Samanta Business Analyzer",
      description:
        "A business analysis tool performing SWOT analysis and integrating with Google Maps API and Gemini AI.",
      techStack: ["Django", "React", "Google Maps API", "Gemini AI"],
      liveLink: "https://samantaanalysis.uxlivinglab.online/",
      longDescription:
        "Samanta Business Analyzer helps businesses conduct comprehensive SWOT analyses and market research. The tool leverages Google Maps API for location-based insights and Gemini AI for predictive analytics and recommendation generation.",
      rating: 4,
    },
    {
      title: "Scale Feedback System",
      description:
        "A customizable feedback collection platform enabling users to select scales and generate reports.",
      techStack: ["Node.js", "Django", "React", "Docker"],
      liveLink: "https://www.scales.uxlivinglab.online/voc/",
      clientMessage:
        "This system has transformed our feedback collection process and provided valuable insights for our business.",
      longDescription:
        "Scale Feedback System is a versatile platform that allows organizations to create customized feedback forms with various scaling options. The system generates comprehensive reports and analytics to help businesses understand and act on customer feedback.",
      rating: 5,
    },
    {
      title: "Q App",
      description:
        "A restaurant solution enabling customers to book orders, call waiters, and pay online via QR code.",
      techStack: ["Django", "React", "Docker", "Socket.io", "WebRTC"],
      longDescription:
        "Q App revolutionizes restaurant service by allowing customers to scan a QR code at their table to browse the menu, place orders, call waiters, and complete payments online. It improves efficiency and enhances the dining experience.",
      rating: 4,
    },
    {
      title: "Dowell Credit System",
      description:
        "A credit handling system for DoWell UX Living Lab's product APIs.",
      techStack: ["Django", "React", "Razorpay", "Stripe"],
      longDescription:
        "Dowell Credit System manages credits for all product API modules in DoWell UX Living Lab. Users can buy credits, activate product APIs before use, and track their transactions efficiently.",
      rating: 4,
    },
    {
      title: "My Fridge",
      description:
        "A smart storage solution that tracks fridge contents and expiry dates using QR codes.",
      techStack: ["Node.js", "BullMQ", "Flutter Flow", "MongoDB"],
      longDescription:
        "My Fridge helps users manage stored food by assigning master QR codes to containers. The app tracks expiry dates, sends notifications, and helps reduce food waste.",
      rating: 5,
    },
    
    
    {
      title: "EasyTechDBManager",
      description:
        "A comprehensive service to streamline MongoDB database and collection operations.",
      techStack: ["Node.js", "MongoDB"],
      liveLink: "https://github.com/manishdashsharma/EasyTechDBManager",
      longDescription:
        "EasyTechDBManager is a robust database management service tailored to simplify MongoDB database and collection operations. Designed for both small-scale projects and large-scale applications, it enables users to effortlessly create, manage, and maintain databases and collections. The platform provides an intuitive interface for CRUD operations, performance monitoring, backup management, and access control, making database administration more accessible and efficient.",
      rating: 4,
    },
    {
      title: "College Finder Bot",
      description:
        "A Python bot that helps users find nearby colleges based on location and course interests.",
      techStack: ["Python", "NLP", "Geopy", "Flask"],
      liveLink: "https://github.com/manishdashsharma/college-finder-bot",
      longDescription:
        "College Finder Bot is a Python script designed to help users discover nearby colleges based on their location and course preferences. The bot leverages natural language processing (NLP) to interpret user queries and utilizes geospatial calculations to determine proximity to relevant institutions, providing accurate and personalized results.",
      rating: 4,
    },
    {
      title: "Petsu",
      description: "Caring Vets, Healthy Pets - Trust Us",
      techStack: ["Node.js", "Next.js", "Docker", "MongoDB"],
      liveLink: "https://petsu.in/",
      longDescription:
        "Petsu is a comprehensive veterinary platform that connects pet owners with qualified veterinarians. The platform facilitates appointment scheduling, health record management, and provides trusted veterinary care services to ensure the health and wellbeing of pets.",
      rating: 5,
    },
    {
      title: "Spyke-AI",
      description:
        "The platform features a complete ecosystem where sellers upload premium prompts and automation tools, users discover and purchase digital solutions, and admins manage the thriving marketplace — all powered by cutting-edge technology for seamless transactions and instant downloads",
      techStack: [
        "Node.js",
        "Next.js",
        "Docker",
        "MongoDB",
        "Twilio",
        "Firebase",
      ],
      liveLink: "http://spykeai.com/",
      longDescription:
        "Spyke-AI is a comprehensive marketplace platform that enables sellers to upload and monetize premium prompts and automation tools. Users can discover and purchase digital solutions while admins oversee the marketplace operations. The platform features seamless transactions, instant downloads, and a robust ecosystem powered by cutting-edge technology to facilitate the exchange of AI-driven digital products.",
      rating: 5,
    },
    {
      title: "LeadEdge",
      description:
        "LeadEdge is a modern B2B CRM platform designed to give businesses a sharp edge in managing leads, campaigns, and sales teams. Admins can create and track campaigns, manage marketing personnel, assign leads, and monitor performance — all in one powerful, intuitive system built for growth.",
      techStack: ["Node.js", "Next.js", "Docker", "MongoDB"],
      liveLink: "https://leadedge.easytechinnovate.site/",
      longDescription:
        "LeadEdge is a cutting-edge B2B CRM platform engineered to provide businesses with a competitive advantage in lead management, campaign execution, and sales team coordination. The platform empowers administrators to create and monitor marketing campaigns, manage marketing personnel, distribute leads efficiently, and track performance metrics. Built with an intuitive interface and powerful analytics, LeadEdge streamlines the entire sales process from lead generation to conversion.",
      rating: 5,
    },
    {
      title: "QuickPoll Public",
      description: "Create polls in 30 seconds, get results in real-time.",
      techStack: ["Node.js", "Next.js", "Docker", "MongoDB", "NextAuth"],
      liveLink: "https://quickpoll.manishdashsharma.site/",
      longDescription:
        "QuickPoll Public is a fast and efficient polling platform that enables users to create comprehensive polls in just 30 seconds and receive real-time results. The platform features user authentication, instant poll creation, real-time data visualization, and seamless sharing capabilities, making it perfect for quick decision-making, surveys, and gathering public opinion.",
      rating: 4,
    },
    {
      title: "dev-stack-factory",
      description:
        "Welcome to the Dev Stack Factory— where we manufacture battle-tested, production-ready full-stack templates! Skip the tedious setup and start building your next big idea with enterprise-grade architecture, modern tooling, and best practices baked right in.",
      techStack: [
        "Node.js",
        "React",
        "Docker",
        "Next.js",
        "Prisma",
        "MongoDB",
        "PostgreSQL",
      ],
      liveLink: "https://github.com/manishdashsharma/dev-stack-factory.git",
      longDescription:
        "Dev Stack Factory is a comprehensive collection of battle-tested, production-ready full-stack templates designed to accelerate development workflows. The platform provides developers with enterprise-grade architecture, modern tooling, and industry best practices pre-configured and ready to deploy. It eliminates the tedious setup process and enables developers to focus on building innovative solutions with confidence.",
      rating: 4,
    },
    {
      title: "Rabt-Naturals",
      description:
        "Rabt | Natural making sure your skin gets Good Better and Best",
      techStack: ["Node.js", "Next.js", "Docker", "MongoDB"],
      liveLink: "https://rabtnaturals.com/",
      longDescription:
        "Rabt-Naturals is a premium skincare e-commerce platform dedicated to providing natural and organic skincare products. The platform ensures customers receive the highest quality natural products with a focus on skin health and wellness. Features include product catalogs, customer reviews, secure payment processing, and personalized skincare recommendations.",
      rating: 4,
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleViewMore = () => {
    // Show 4 more projects when the button is clicked
    setVisibleProjects((prev) => Math.min(prev + 6, projectsData.length));

    // Scroll to the newly visible projects
    if (visibleProjects < projectsData.length) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding"
    >
      <div className="container mx-auto container-padding max-w-6xl">
        <div className="text-center mb-20">
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
            Selected Work
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
            Featured Projects
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            A collection of projects showcasing expertise in full-stack development, 
            cloud infrastructure, and scalable application design.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsData.slice(0, visibleProjects).map((project, index) => (
            <div
              key={project.title}
              className={cn(
                "opacity-0 transform translate-y-4 transition-all duration-500",
                inView && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                index={index}
                liveLink={project.liveLink}
                clientMessage={project.clientMessage}
                longDescription={project.longDescription}
                rating={project.rating}
              />
            </div>
          ))}
        </div>

        {visibleProjects < projectsData.length && (
          <div className="mt-16 text-center">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary transition-all hover:bg-primary hover:text-primary-foreground"
              onClick={handleViewMore}
            >
              View More
              <ChevronDown size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
