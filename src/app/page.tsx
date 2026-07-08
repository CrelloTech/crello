"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import gsap from "gsap";
import ContactOverlay from "@/components/contact/ContactOverlay";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Code2,
  Smartphone,
  BrainCircuit,
  Search,
  Workflow,
  Layers3,
  Check,
  Sparkles,
  ShieldCheck,
  Gauge,
  Users,
  Quote,
  Mail,
  MapPin,
  Phone,
  Globe2,

  MoveRight,
  Circle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   TYPES
========================================================= */

type Service = {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/* =========================================================
   DATA
========================================================= */

const services: Service[] = [
  {
    number: "01",
    title: "Custom Software",
    description:
      "Secure, scalable software engineered around your business workflows, users, and long-term growth.",
    icon: Code2,
  },
  {
    number: "02",
    title: "Web Development",
    description:
      "High-performance websites and web applications built for speed, conversion, accessibility, and scale.",
    icon: Globe2,
  },
  {
    number: "03",
    title: "Mobile Apps",
    description:
      "User-focused mobile experiences designed to perform beautifully across modern devices and platforms.",
    icon: Smartphone,
  },
  {
    number: "04",
    title: "AI Solutions",
    description:
      "Practical AI systems that automate work, unlock insights, and improve how teams make decisions.",
    icon: BrainCircuit,
  },
  {
    number: "05",
    title: "SEO & Growth",
    description:
      "Technical and content-led SEO strategies that improve visibility, discoverability, and qualified traffic.",
    icon: Search,
  },
  {
    number: "06",
    title: "Business Automation",
    description:
      "Connected workflows and intelligent automation that reduce repetitive work and operational friction.",
    icon: Workflow,
  },
];

const projects: Project[] = [
  {
    number: "01",
    category: "AI / FINTECH",
    title: "NidhiBook",
    description:
      "An intelligent expense platform turning everyday financial activity into clear, actionable insight.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    tags: ["AI", "Product", "Cloud"],
  },
  {
    number: "02",
    category: "AUTOMATION / SAAS",
    title: "Mailer",
    description:
      "An AI-powered communication engine designed for smarter, faster and more personalized outreach.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=85",
    tags: ["Next.js", "AI", "Automation"],
  },
  {
    number: "03",
    category: "ENTERPRISE / FINTECH",
    title: "CorpSpend",
    description:
      "A role-driven expense ecosystem helping modern organizations manage approvals, bills and visibility.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85",
    tags: ["Enterprise", "OCR", "Analytics"],
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "Crello understood the business challenge before writing a line of code. The result felt considered, fast, and genuinely useful.",
    name: "Arjun Mehta",
    role: "Founder, Growth Studio",
  },
  {
    quote:
      "The team brought product thinking, engineering discipline and a level of communication that made the entire process easy.",
    name: "Riya Sharma",
    role: "Product Lead, Fintech",
  },
  {
    quote:
      "What stood out was their ability to turn a complex workflow into a simple digital experience our team could actually use.",
    name: "Karan Patel",
    role: "Operations Director",
  },
];
const STACK_ROWS = [
  {
    label: "FRONTEND",
    items: ["React.js","Next.js","TypeScript","JavaScript","Tailwind CSS","Redux","Framer Motion","GSAP",],
    dir: 1,
  },
  {
    label: "BACKEND",
    items: ["Node.js","Express.js","REST APIs","Socket.IO","API Integration","Data Pipeline","Web Scraping","Python",],
    dir: -1,
  },
  {
    label: "DATA",
    items: ["MongoDB","MySQL","Redis","Firestore","SQL"],
    dir: 1,
  },
  {
    label: "AI & AUTOMATION",
    items: ["OpenAI API","Gemini API","Groq API","LLM Integration","Prompt Engineering","Intelligent Automation",],
    dir: -1,
  },
  {
    label: "CLOUD & DEVOPS",
    items: ["AWS EC2","Docker","Docker Compose","Jenkins","CI/CD","Nginx","Linux","Ubuntu","Prometheus","Grafana","Firebase","SSL",],
    dir: 1,
  },
];

/* =========================================================
   SMALL REUSABLE UI
========================================================= */

function MagneticArrow() {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff5c35] text-white transition-transform duration-300 group-hover:rotate-45">
      <ArrowUpRight size={18} />
    </span>
  );
}

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em]">
      <span className="text-[#ff5c35]">{number}</span>
      <span className="h-px w-8 bg-current opacity-30" />
      <span>{children}</span>
    </div>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null); // ADD THIS

  const expertiseRef = useRef<HTMLElement>(null);

  const gatewayRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const reducedMotion = usereducedMotion();


  /* =======================================================
     GSAP ANIMATIONS
  ======================================================= */

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        y: 130,
        opacity: 0,
        rotate: 3,
        duration: 1.15,
        stagger: 0.09,
        ease: "power4.out",
      });

      gsap.from(".hero-meta", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        delay: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element) => {
        gsap.from(element, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
          },
        });
      });

      // SMOOTH CREAM -> BLACK BACKGROUND
      gsap.fromTo(
        pageRef.current,
        {
          backgroundColor: "#ffffff",
        },
        {
          backgroundColor: "#000000",
          ease: "none",
          scrollTrigger: {
            trigger: aboutRef.current,

            // starts near the lower part of About
            start: "bottom bottom",

            // completes while Services enters
            endTrigger: servicesRef.current,
            end: "top 35%",

            scrub: 1.5,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".project-image").forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });


      gsap.to(".floating-orb", {
        y: -100,
        x: 50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".expertise-track", {
        xPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: expertiseRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: "top center",
        once: true,
        onEnter: () => setContactOpen(true),
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);


  function usereducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduced(mq.matches);
      const handler = () => setReduced(mq.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }, []);
    return reduced;
  }

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-[#f4f1eb] text-[#161616]"
    >




      {/* =====================================================
          02. HERO SECTION
      ===================================================== */}

      <Hero />


      {/* =====================================================
          03. ABOUT / COMPANY INTRODUCTION
      ===================================================== */}

      <section
        id="about"
        ref={aboutRef}
        className="px-5 py-24 md:px-10 md:py-36 lg:px-14 lg:py-48"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="reveal-up lg:col-span-3">
              <SectionLabel number="01">Who we are</SectionLabel>
            </div>

            <div className="lg:col-span-9">
              <h2 className="reveal-up max-w-6xl text-[11vw] font-medium leading-[0.94] tracking-[-0.065em] md:text-[7vw] lg:text-[5.7vw]">
                Technology should do more than
                <span className="text-[#a9a59d]"> simply work.</span>
              </h2>

              <div className="mt-16 grid gap-10 md:grid-cols-2 lg:mt-24">
                <div />

                <div className="reveal-up">
                  <p className="text-lg leading-relaxed text-black/65 md:text-xl">
                    Crello is a technology-driven software development and
                    digital solutions agency helping startups, growing
                    businesses, and enterprises build, scale, and transform
                    their digital presence.
                  </p>

                  <p className="mt-6 text-lg leading-relaxed text-black/65 md:text-xl">
                    We combine product thinking, engineering, AI, automation,
                    and growth strategy to create secure, scalable, and
                    user-focused solutions.
                  </p>

                  <a
                    href="#services"
                    className="group mt-10 inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.14em]"
                  >
                    More about us
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={17} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="reveal-up mt-24 overflow-hidden rounded-[2rem] md:mt-36">
            <div className="relative h-[55vh] min-h-[450px] md:h-[75vh]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=85"
                alt="Crello team collaboration"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white md:bottom-10 md:left-10 md:right-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/65">
                    One team
                  </p>
                  <p className="mt-2 text-3xl font-medium tracking-[-0.04em] md:text-5xl">
                    Built around outcomes.
                  </p>
                </div>

                <div className="hidden h-20 w-20 items-center justify-center rounded-full bg-[#ff5c35] md:flex">
                  <Sparkles size={25} />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* =====================================================
          04. SERVICES SECTION
      ===================================================== */}

      <section
        id="services"
        ref={servicesRef}
        className="px-5 py-24 text-white md:px-10 md:py-36 lg:px-14 lg:py-44"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="reveal-up lg:col-span-3">
              <SectionLabel number="02">What we do</SectionLabel>
            </div>

            <div className="lg:col-span-9">
              <h2 className="reveal-up max-w-5xl text-[12vw] font-medium leading-[0.9] tracking-[-0.07em] md:text-[7vw] lg:text-[5.5vw]">
                Ideas into
                <br />
                <span className="text-white/30">digital impact.</span>
              </h2>
            </div>
          </div>

          <div className="mt-20 border-t border-white/15 md:mt-28">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.number}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="group relative grid cursor-pointer gap-5 overflow-hidden border-b border-white/15 py-7 md:grid-cols-12 md:items-center md:py-10"
                >
                  <motion.div
                    variants={{
                      rest: { x: "-105%" },
                      hover: { x: "0%" },
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className="absolute inset-0 bg-[#ff5c35]"
                  />

                  <div className="relative z-10 text-xs text-white/40 md:col-span-1">
                    {service.number}
                  </div>

                  <div className="relative z-10 md:col-span-6">
                    <h3 className="text-3xl font-medium tracking-[-0.045em] md:text-5xl">
                      {service.title}
                    </h3>
                  </div>

                  <div className="relative z-10 md:col-span-4">
                    <p className="max-w-md text-sm leading-relaxed text-white/55 transition-colors group-hover:text-white/85 md:text-base">
                      {service.description}
                    </p>
                  </div>

                  <div className="relative z-10 flex justify-end md:col-span-1">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25">
                      <Icon size={18} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          05. WHY CHOOSE US / BENEFITS
      ===================================================== */}

      <section className="px-5 py-24 md:px-10 md:py-36 lg:px-14 lg:py-44">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="reveal-up lg:col-span-3">
              <SectionLabel number="03">Why Crello</SectionLabel>
            </div>

            <div className="lg:col-span-9">
              <h2 className="reveal-up max-w-5xl text-[11vw] font-medium leading-[0.93] tracking-[-0.065em] md:text-[7vw] lg:text-[5.5vw]">
                Less noise.
                <br />
                <span className="text-[#aaa69e]">More progress.</span>
              </h2>

              <div className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-black/10 md:grid-cols-2">
                {[
                  {
                    icon: Gauge,
                    title: "Built to perform",
                    text: "Fast, responsive and engineered with real-world performance in mind.",
                  },
                  {
                    icon: Layers3,
                    title: "Ready to scale",
                    text: "Architecture designed to grow with your users, data and business.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Secure by thinking",
                    text: "Security considered throughout the product and development lifecycle.",
                  },
                  {
                    icon: Users,
                    title: "True collaboration",
                    text: "Clear communication, shared context and close partnership from start to finish.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="reveal-up bg-[#f4f1eb] p-8 md:p-12 lg:p-14"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff5c35] text-white">
                        <Icon size={22} />
                      </div>

                      <h3 className="mt-12 text-3xl font-medium tracking-[-0.04em]">
                        {item.title}
                      </h3>

                      <p className="mt-4 max-w-sm leading-relaxed text-black/55">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
    06. TECHNOLOGY / EXPERTISE AREA
===================================================== */}

      {/* =====================================================
    06. TECHNOLOGY / EXPERTISE AREA
===================================================== */}

      <section className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40">
        <p
          data-reveal
          className="mb-8 text-xs uppercase tracking-[0.25em] text-[#A3A3A3]"
        >
          04 / Our Stack
        </p>

        <h2
          data-reveal
          className="mb-16 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] font-semibold uppercase leading-[1.02] tracking-tight"
        >
          Technology is the tool. Impact is the outcome.
        </h2>

        <div className="flex flex-col gap-6">
          {STACK_ROWS.map((row, rowIndex) => {
            const items = [
              ...row.items,
              ...row.items,
              ...row.items,
              ...row.items,
            ];

            const moveRight = rowIndex % 2 === 0;

            return (
              <div
                key={row.label}
                className="relative overflow-hidden border-y border-white/10 py-6"
              >
                {/* Row Label */}
                <div className="mb-4 px-1 text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3]">
                  {row.label}
                </div>

                {/* Marquee Viewport */}
                <div className="w-full overflow-hidden">
                  <motion.div
                    className="flex w-max shrink-0 items-center"
                    initial={{
                      x: moveRight ? "-25%" : "0%",
                    }}
                    animate={{
                      x: moveRight ? "0%" : "-25%",
                    }}
                    transition={{
                      duration: 12 + rowIndex * 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear",
                    }}
                  >
                    {items.map((item, i) => (
                      <div
                        key={`${row.label}-${item}-${i}`}
                        className="flex shrink-0 items-center"
                      >
                        <span className="whitespace-nowrap text-[clamp(1.5rem,4vw,2.75rem)] font-medium uppercase tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(245,245,240,0.4)] transition-all duration-300 hover:text-[#F5F5F0] hover:[-webkit-text-stroke:0px]">
                          {item}
                        </span>

                        <span className="mx-8 shrink-0 text-[clamp(1.5rem,4vw,2.75rem)] text-[#A3A3A3]">
                          /
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          07. PROCESS / WORKING APPROACH
      ===================================================== */}

      <section
        id="process"
        className="px-5 py-24 md:px-10 md:py-36 lg:px-14 lg:py-44"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="reveal-up lg:col-span-3">
              <SectionLabel number="05">How we work</SectionLabel>
            </div>

            <div className="lg:col-span-9">
              <h2 className="reveal-up max-w-5xl text-[11vw] font-medium leading-[0.93] tracking-[-0.065em] md:text-[7vw] lg:text-[5.5vw]">
                Clear process.
                <br />
                <span className="text-[#aaa69e]">Better outcomes.</span>
              </h2>

              <div className="mt-20">
                {[
                  {
                    number: "01",
                    title: "Discover",
                    text: "We understand the business, users, constraints, opportunities and definition of success.",
                  },
                  {
                    number: "02",
                    title: "Define",
                    text: "We shape the product direction, architecture, priorities, roadmap and delivery plan.",
                  },
                  {
                    number: "03",
                    title: "Build",
                    text: "Design and engineering move together through focused, transparent development cycles.",
                  },
                  {
                    number: "04",
                    title: "Launch",
                    text: "We test, optimize, deploy and prepare the product for confident real-world use.",
                  },
                  {
                    number: "05",
                    title: "Scale",
                    text: "We improve, automate and evolve the solution as the business and user needs grow.",
                  },
                ].map((step) => (
                  <div
                    key={step.number}
                    className="reveal-up group grid gap-5 border-t border-black/15 py-8 md:grid-cols-12 md:items-start md:py-10"
                  >
                    <div className="text-xs text-[#ff5c35] md:col-span-1">
                      {step.number}
                    </div>

                    <h3 className="text-3xl font-medium tracking-[-0.045em] md:col-span-5 md:text-5xl">
                      {step.title}
                    </h3>

                    <p className="max-w-md leading-relaxed text-black/55 md:col-span-5">
                      {step.text}
                    </p>

                    <div className="flex justify-end md:col-span-1">
                      <ArrowUpRight
                        size={20}
                        className="transition-transform duration-300 group-hover:rotate-45"
                      />
                    </div>
                  </div>
                ))}

                <div className="border-t border-black/15" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          08. PORTFOLIO / PROJECTS SECTION
      ===================================================== */}

      <section
        id="work"
        className="bg-[#111111] px-5 py-24 text-white md:px-10 md:py-36 lg:px-14 lg:py-44"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="reveal-up lg:col-span-3">
              <SectionLabel number="06">Selected work</SectionLabel>
            </div>

            <div className="lg:col-span-9">
              <h2 className="reveal-up max-w-5xl text-[12vw] font-medium leading-[0.9] tracking-[-0.07em] md:text-[7vw] lg:text-[5.5vw]">
                Work with
                <br />
                <span className="text-white/30">a purpose.</span>
              </h2>
            </div>
          </div>

          <div className="mt-20 space-y-24 md:mt-32 md:space-y-36">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={`grid gap-8 lg:grid-cols-12 ${index % 2 !== 0 ? "lg:items-end" : ""
                  }`}
              >
                <div
                  className={`reveal-up ${index % 2 === 0
                    ? "lg:col-span-8"
                    : "lg:col-span-8 lg:col-start-5"
                    }`}
                >
                  <div className="relative h-[55vh] min-h-[420px] overflow-hidden rounded-[1.5rem] md:h-[72vh]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/15" />

                    <div className="absolute right-5 top-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-black md:h-20 md:w-20">
                      <ArrowUpRight size={22} />
                    </div>
                  </div>
                </div>

                <div
                  className={`reveal-up ${index % 2 === 0
                    ? "lg:col-span-4 lg:pl-8"
                    : "lg:col-span-4 lg:col-start-1 lg:row-start-1"
                    }`}
                >
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/45">
                    <span className="text-[#ff5c35]">{project.number}</span>
                    {project.category}
                  </div>

                  <h3 className="mt-6 text-5xl font-medium tracking-[-0.055em] md:text-7xl">
                    {project.title}
                  </h3>

                  <p className="mt-6 max-w-sm leading-relaxed text-white/55">
                    {project.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-white/65"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="reveal-up mt-28 flex justify-center">
            <button className="group flex h-40 w-40 flex-col items-center justify-center rounded-full bg-[#ff5c35] text-center text-xs font-bold uppercase tracking-[0.14em] transition-transform duration-500 hover:scale-110 md:h-48 md:w-48">
              View all work
              <ArrowUpRight
                size={20}
                className="mt-3 transition-transform group-hover:rotate-45"
              />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          09. TESTIMONIALS / CLIENT TRUST
      ===================================================== */}

      <section className="px-5 py-24 md:px-10 md:py-36 lg:px-14 lg:py-44">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="reveal-up lg:col-span-3">
              <SectionLabel number="07">Client trust</SectionLabel>
            </div>

            <div className="lg:col-span-9">
              <Quote
                size={48}
                strokeWidth={1.2}
                className="reveal-up text-[#ff5c35]"
              />

              <div className="mt-10 min-h-[350px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -35 }}
                    transition={{ duration: 0.5 }}
                  >
                    <blockquote className="max-w-5xl text-[8vw] font-medium leading-[1.02] tracking-[-0.06em] md:text-[5vw] lg:text-[3.8vw]">
                      “{testimonials[activeTestimonial].quote}”
                    </blockquote>

                    <div className="mt-10">
                      <p className="font-semibold">
                        {testimonials[activeTestimonial].name}
                      </p>
                      <p className="mt-1 text-sm text-black/45">
                        {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex items-center gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${activeTestimonial === index
                      ? "w-10 bg-[#ff5c35]"
                      : "w-2.5 bg-black/20"
                      }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="reveal-up mt-24 grid grid-cols-2 border-y border-black/15 md:grid-cols-4">
            {[
              ["25+", "Projects shipped"],
              ["10+", "Industries explored"],
              ["98%", "Client satisfaction"],
              ["24/7", "Systems thinking"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`py-10 ${index !== 0 ? "border-l border-black/15 pl-5 md:pl-8" : ""
                  }`}
              >
                <p className="text-4xl font-medium tracking-[-0.05em] md:text-6xl">
                  {value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-black/45">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          10. CONTACT / CTA SECTION
      ===================================================== */}

      <section id="contact">


        <ContactOverlay
        />

      </section>
    </main>
  );
}