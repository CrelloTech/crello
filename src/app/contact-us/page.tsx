"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Menu, X, Mail } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* =========================================
   DATA
   ========================================= */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
];

const STATS = [
  { value: "10+", label: "Digital Capabilities" },
  { value: "100%", label: "Custom Solutions" },
  { value: "24/7", label: "Technology Mindset" },
  { value: "∞", label: "Room to Scale" },
];

const SERVICES = [
  {
    n: "01",
    title: "Custom Software Development",
    desc: "Secure, scalable, and business-focused software engineered around unique operational requirements.",
  },
  {
    n: "02",
    title: "Web Development",
    desc: "High-performance websites and web applications built for speed, usability, scalability, and measurable growth.",
  },
  {
    n: "03",
    title: "Mobile App Development",
    desc: "Modern mobile experiences designed around real user behavior and seamless performance.",
  },
  {
    n: "04",
    title: "AI-Powered Solutions",
    desc: "Intelligent AI integrations, assistants, automation systems, and workflow optimization built for practical business impact.",
  },
  {
    n: "05",
    title: "SEO & Digital Growth",
    desc: "Technical SEO and visibility strategies designed to improve discoverability, authority, and sustainable organic growth.",
  },
  {
    n: "06",
    title: "Business Automation",
    desc: "Automated workflows that reduce repetitive work, improve efficiency, and connect disconnected business processes.",
  },
  {
    n: "07",
    title: "Digital Transformation",
    desc: "End-to-end modernization of legacy processes, digital operations, customer experiences, and technology systems.",
  },
];

const BENEFITS = [
  {
    n: "01",
    title: "Business-First Thinking",
    desc: "We begin with the challenge, not the technology.",
  },
  {
    n: "02",
    title: "Built to Scale",
    desc: "Architecture designed for future growth.",
  },
  {
    n: "03",
    title: "End-to-End Execution",
    desc: "Strategy, design, engineering, launch, and optimization.",
  },
  {
    n: "04",
    title: "Intelligent Automation",
    desc: "AI and automation integrated where they create measurable value.",
  },
  {
    n: "05",
    title: "Performance Obsessed",
    desc: "Speed, security, accessibility, and usability treated as fundamentals.",
  },
  {
    n: "06",
    title: "Long-Term Partnership",
    desc: "We build relationships beyond a single launch.",
  },
];

const STACK_ROWS = [
  { label: "FRONTEND", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"], dir: 1 },
  { label: "BACKEND", items: ["Node.js", "Express", "REST APIs"], dir: -1 },
  { label: "DATA", items: ["MongoDB", "MySQL", "Redis"], dir: 1 },
  { label: "AI", items: ["OpenAI", "Gemini", "Groq", "Intelligent Automation"], dir: -1 },
  { label: "CLOUD & DEVOPS", items: ["AWS", "Docker", "Jenkins", "Nginx", "CI/CD"], dir: 1 },
];
MarqueeRow
const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "Understand the business, users, challenges, goals, and opportunities.",
  },
  {
    n: "02",
    title: "Define",
    desc: "Create a focused strategy, technical direction, and execution roadmap.",
  },
  {
    n: "03",
    title: "Design",
    desc: "Build intuitive experiences and clear digital interactions.",
  },
  {
    n: "04",
    title: "Develop",
    desc: "Engineer secure, scalable, and maintainable solutions.",
  },
  {
    n: "05",
    title: "Launch",
    desc: "Deploy, test, optimize, and prepare for real-world usage.",
  },
  {
    n: "06",
    title: "Evolve",
    desc: "Measure, improve, automate, and scale continuously.",
  },
];

const PROJECTS = [
  {
    n: "01",
    title: "AI-Powered Expense Intelligence Platform",
    tags: "AI / FINTECH / AUTOMATION",
  },
  {
    n: "02",
    title: "Enterprise Expense Management System",
    tags: "SAAS / WORKFLOW / ANALYTICS",
  },
  {
    n: "03",
    title: "AI Bulk Communication Platform",
    tags: "AI / PRODUCTIVITY / AUTOMATION",
  },
  {
    n: "04",
    title: "Digital Consultation & Booking Experience",
    tags: "HEALTHTECH / PLATFORM / EXPERIENCE",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Crello transformed a complex idea into a clear, scalable digital product. Their technical thinking and attention to business outcomes made the entire process exceptional.",
    name: "Sample Client",
    role: "Founder, Technology Startup",
  },
  {
    quote:
      "The team moved fast without cutting corners. Every decision was tied back to what would actually move our numbers, not just what looked good in a deck.",
    name: "Sample Client",
    role: "COO, Growth-Stage SaaS",
  },
  {
    quote:
      "What stood out was the follow-through after launch. Crello kept optimizing, automating, and improving long after the first release shipped.",
    name: "Sample Client",
    role: "VP Operations, Enterprise Retailer",
  },
];

/* =========================================
   HOOK: prefers-reduced-motion
   ========================================= */

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

/* =========================================
   HOOK: viewport width (for disabling desktop-only fx)
   ========================================= */

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isDesktop;
}

/* =========================================
   COMPONENT: Animated Counter (scroll triggered)
   ========================================= */

function StatBlock({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-white/10 pt-6"
    >
      <div className="font-sans text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-tight text-[#F5F5F0]">
        {value}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.15em] text-[#A3A3A3]">
        {label}
      </div>
    </motion.div>
  );
}

/* =========================================
   MAIN PAGE COMPONENT
   ========================================= */

export default function Home() {
  const reducedMotion = usereducedMotion();
  const isDesktop = useIsDesktop();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [time, setTime] = useState("");

  const rootRef = useRef<HTMLDivElement>(null);
  const processSectionRef = useRef<HTMLElement>(null);
  const processStepsRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springCfg = { damping: 30, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springCfg);
  const cursorYSpring = useSpring(cursorY, springCfg);
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover">("default");

  /* ---------- Scroll state for navbar ---------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- Local time display ---------- */
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  /* ---------- Custom cursor tracking ---------- */
  useEffect(() => {
    if (!isDesktop) return;
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isDesktop, cursorX, cursorY]);

  const onHoverStart = useCallback(() => setCursorVariant("hover"), []);
  const onHoverEnd = useCallback(() => setCursorVariant("default"), []);

  /* ---------- Smooth anchor scroll ---------- */
  const scrollToId = useCallback((id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* ---------- GSAP: scroll reveals + pinned process ---------- */
  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Generic heading reveal for elements marked with data-reveal
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Parallax elements
      const parallax = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      parallax.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.2");
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Pinned process section (desktop only)
      if (isDesktop && processSectionRef.current && processStepsRef.current) {
        const steps = gsap.utils.toArray<HTMLElement>(
          "[data-process-step]",
          processStepsRef.current
        );

        steps.forEach((step, i) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: () => setActiveProcessIndex(i),
            onEnterBack: () => setActiveProcessIndex(i),
          });
        });

        if (progressLineRef.current) {
          gsap.fromTo(
            progressLineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top",
              scrollTrigger: {
                trigger: processStepsRef.current,
                start: "top 60%",
                end: "bottom 60%",
                scrub: true,
              },
            }
          );
        }
      }

      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, isDesktop]);

  const [activeProcessIndex, setActiveProcessIndex] = useState(0);

  /* ---------- Testimonial autoplay ---------- */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  /* ---------- Close mobile menu on link click ---------- */
  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    scrollToId(href);
  };

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] font-sans text-[#F5F5F0] selection:bg-[#F5F5F0] selection:text-[#050505]"
      onMouseEnter={() => {}}
    >
      {/* =========================================
          GRAIN OVERLAY
          ========================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* =========================================
          CUSTOM CURSOR (desktop only)
          ========================================= */}
      {isDesktop && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-[#F5F5F0] mix-blend-difference"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            width: cursorVariant === "hover" ? 56 : 24,
            height: cursorVariant === "hover" ? 56 : 24,
            marginLeft: cursorVariant === "hover" ? -16 : 0,
            marginTop: cursorVariant === "hover" ? -16 : 0,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        />
      )}

      {/* =========================================
          SCROLL PROGRESS BAR
          ========================================= */}
      <ScrollProgressBar />

      {/* =========================================
          NAVBAR
          ========================================= */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-[#050505]/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
          >
            Crello
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  onMouseEnter={onHoverStart}
                  onMouseLeave={onHoverEnd}
                  className="group relative text-xs uppercase tracking-[0.15em] text-[#A3A3A3] transition-colors hover:text-[#F5F5F0]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#F5F5F0] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            className="hidden items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-colors hover:border-white/60 md:inline-flex"
          >
            Start a Project
            <ArrowUpRight size={14} />
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* =========================================
          MOBILE MENU OVERLAY
          ========================================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#050505] px-8 md:hidden"
          >
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-[clamp(2rem,10vw,3rem)] font-medium uppercase tracking-tight"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.06, duration: 0.5 }}
                className="pt-6"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm uppercase tracking-[0.15em]"
                >
                  Start a Project
                  <ArrowUpRight size={16} />
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section
        id="home"
        className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-6 pt-32 md:px-10"
      >
        {/* Abstract monochrome technical composition */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          data-parallax="0.15"
        >
          <div className="absolute right-[-10%] top-[10%] h-[600px] w-[600px] rounded-full border border-white/10 md:right-[0%]" />
          <div className="absolute right-[-4%] top-[18%] h-[440px] w-[440px] rounded-full border border-white/[0.08] md:right-[6%]" />
          <div className="absolute right-[8%] top-[26%] h-[280px] w-[280px] animate-[spin_28s_linear_infinite] rounded-full border border-dashed border-white/15 md:right-[14%]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(circle at 75% 30%, black 0%, transparent 60%)",
              WebkitMaskImage:
                "radial-gradient(circle at 75% 30%, black 0%, transparent 60%)",
            }}
          />
          <span className="absolute right-[10%] top-[12%] font-mono text-[10px] tracking-widest text-[#A3A3A3] md:right-[18%]">
            34.0522° N / 118.2437° W
          </span>
          <span className="absolute right-[6%] top-[46%] flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#A3A3A3] md:right-[10%]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F5F5F0]" />
            SYSTEM ONLINE
          </span>
        </div>

        <div className="relative z-10 max-w-[1600px]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-xs uppercase tracking-[0.25em] text-[#A3A3A3]"
          >
            Independent Technology &amp; Digital Solutions Agency
          </motion.p>

          <h1 className="overflow-hidden">
            {["WE BUILD", "DIGITAL SYSTEMS", "THAT MOVE", "BUSINESS FORWARD."].map(
              (line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.25 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`block text-[clamp(2.75rem,10vw,10rem)] font-semibold uppercase leading-[0.95] tracking-tight ${
                      i === 2 ? "italic text-[#F5F5F0]/90" : ""
                    }`}
                  >
                    {i === 2 ? (
                      <>
                        THAT{" "}
                        <span className="text-transparent [-webkit-text-stroke:1.5px_#F5F5F0]">
                          MOVE
                        </span>
                      </>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              )
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-8 max-w-xl text-balance text-base leading-relaxed text-[#A3A3A3] md:text-lg"
          >
            We design and engineer scalable software, intelligent AI solutions,
            high-performance digital products, and growth-focused experiences
            for ambitious businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              onClick={() => scrollToId("#contact")}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#F5F5F0] px-7 py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-[#050505]"
            >
              Start a Project
              <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToId("#work")}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-[#F5F5F0]"
            >
              Explore Our Work
              <ArrowUpRight size={16} />
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-10 left-6 flex items-center gap-3 md:left-10"
        >
          <span className="h-10 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A3A3A3]">
            Scroll to Explore
          </span>
        </motion.div>
      </section>

      {/* =========================================
          ABOUT SECTION
          ========================================= */}
      <section id="about" className="relative px-6 py-28 md:px-10 md:py-40">
        <p
          data-reveal
          className="mb-8 text-xs uppercase tracking-[0.25em] text-[#A3A3A3]"
        >
          01 / Who We Are
        </p>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <h2
            data-reveal
            className="lg:col-span-7 text-[clamp(2.25rem,6vw,4.5rem)] font-semibold uppercase leading-[1.02] tracking-tight"
          >
            We turn complex business challenges into simple, powerful digital
            experiences.
          </h2>

          <div data-reveal className="lg:col-span-5 lg:pt-4">
            <p className="text-base leading-relaxed text-[#A3A3A3] md:text-lg">
              Crello is a technology-driven software development and digital
              solutions agency helping startups, growing businesses, and
              enterprises build, scale, and transform their digital presence.
            </p>
            <p className="mt-5 text-base leading-relaxed text-[#A3A3A3] md:text-lg">
              We work closely with businesses to understand their challenges
              and create secure, scalable, and user-focused solutions that
              deliver measurable value &mdash; from modern websites and
              high-performance applications to AI-driven workflows and
              stronger online visibility.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          {STATS.map((s, i) => (
            <StatBlock key={s.label} value={s.value} label={s.label} index={i} />
          ))}
        </div>
      </section>

      {/* =========================================
          SERVICES SECTION
          ========================================= */}
      <section id="services" className="relative px-6 py-28 md:px-10 md:py-40">
        <p
          data-reveal
          className="mb-8 text-xs uppercase tracking-[0.25em] text-[#A3A3A3]"
        >
          02 / What We Do
        </p>
        <h2
          data-reveal
          className="mb-16 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] font-semibold uppercase leading-[1.02] tracking-tight"
        >
          Capabilities built for the next move.
        </h2>

        <div className="border-t border-white/10">
          {SERVICES.map((service, i) => {
            const isActive = activeService === i;
            return (
              <div
                key={service.n}
                data-reveal
                onMouseEnter={() => {
                  setActiveService(i);
                  onHoverStart();
                }}
                onMouseLeave={() => {
                  setActiveService(null);
                  onHoverEnd();
                }}
                onClick={() => setActiveService(isActive ? null : i)}
                className={`group relative cursor-pointer overflow-hidden border-b border-white/10 px-2 py-8 transition-colors duration-500 md:px-4 ${
                  isActive ? "bg-[#F5F5F0] text-[#090909]" : "text-[#F5F5F0]"
                }`}
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6 md:gap-10">
                    <span
                      className={`font-mono text-sm ${
                        isActive ? "text-[#090909]/50" : "text-[#A3A3A3]"
                      }`}
                    >
                      {service.n}
                    </span>
                    <motion.h3
                      animate={{ x: isActive ? 12 : 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="text-xl font-medium uppercase tracking-tight md:text-3xl"
                    >
                      {service.title}
                    </motion.h3>
                  </div>
                  <motion.span
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="shrink-0"
                  >
                    <ArrowUpRight size={isActive ? 32 : 22} />
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pl-[3.25rem] pt-5 text-sm leading-relaxed text-[#090909]/70 md:pl-[5.5rem] md:text-base">
                        {service.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================
          WHY CHOOSE US / BENEFITS
          ========================================= */}
      <section className="relative px-6 py-28 md:px-10 md:py-40">
        <p
          data-reveal
          className="mb-8 text-xs uppercase tracking-[0.25em] text-[#A3A3A3]"
        >
          03 / Why Crello
        </p>
        <h2
          data-reveal
          className="mb-16 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] font-semibold uppercase leading-[1.02] tracking-tight"
        >
          Not just development. Forward momentum.
        </h2>

        <div className="grid grid-cols-1 border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <motion.div
              key={b.n}
              data-reveal
              whileHover={{ backgroundColor: "rgba(245,245,240,0.04)" }}
              transition={{ duration: 0.3 }}
              className="border-b border-r border-white/10 p-8 md:p-10"
            >
              <span className="font-mono text-sm text-[#A3A3A3]">{b.n}</span>
              <h3 className="mt-6 text-lg font-medium uppercase tracking-tight md:text-xl">
                {b.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A3A3A3]">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================
          TECHNOLOGY / EXPERTISE (MARQUEE)
          ========================================= */}
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
          {STACK_ROWS.map((row) => (
            <MarqueeRow key={row.label} row={row} reducedMotion={reducedMotion} />
          ))}
        </div>
      </section>

      {/* =========================================
          PROCESS / WORKING APPROACH
          ========================================= */}
      <section
        id="process"
        ref={processSectionRef}
        className="relative px-6 py-28 md:px-10 md:py-40"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:h-fit">
            <p className="mb-8 text-xs uppercase tracking-[0.25em] text-[#A3A3A3]">
              05 / How We Work
            </p>
            <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold uppercase leading-[1.02] tracking-tight">
              From first conversation to lasting impact.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#A3A3A3] md:text-base">
              A consistent method, applied to every engagement &mdash; from a
              first call to a system running in production and beyond.
            </p>
          </div>

          <div className="relative lg:col-span-7">
            <div className="absolute left-[15px] top-0 hidden h-full w-px bg-white/10 lg:block">
              <div
                ref={progressLineRef}
                className="h-full w-full origin-top bg-[#F5F5F0]"
                style={{ transform: "scaleY(0)" }}
              />
            </div>

            <div ref={processStepsRef} className="flex flex-col">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.n}
                  data-process-step
                  data-reveal
                  className="relative border-b border-white/10 py-10 pl-0 lg:pl-12"
                >
                  <span
                    className={`absolute left-[9px] top-11 hidden h-3.5 w-3.5 rounded-full border transition-colors duration-500 lg:block ${
                      activeProcessIndex >= i
                        ? "border-[#F5F5F0] bg-[#F5F5F0]"
                        : "border-white/30 bg-[#050505]"
                    }`}
                  />
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-sm text-[#A3A3A3]">
                      {step.n}
                    </span>
                    <h3 className="text-2xl font-medium uppercase tracking-tight md:text-3xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-md pl-[3.25rem] text-sm leading-relaxed text-[#A3A3A3] md:text-base">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          PORTFOLIO / PROJECTS
          ========================================= */}
      <section id="work" className="relative px-6 py-28 md:px-10 md:py-40">
        <p
          data-reveal
          className="mb-8 text-xs uppercase tracking-[0.25em] text-[#A3A3A3]"
        >
          06 / Selected Work
        </p>
        <h2
          data-reveal
          className="mb-16 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] font-semibold uppercase leading-[1.02] tracking-tight"
        >
          Built to perform. Designed to matter.
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.n}
              project={project}
              index={i}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
            />
          ))}
        </div>
      </section>

      {/* =========================================
          TESTIMONIALS / CLIENT TRUST
          ========================================= */}
      <section className="relative px-6 py-28 md:px-10 md:py-40">
        <p
          data-reveal
          className="mb-8 text-xs uppercase tracking-[0.25em] text-[#A3A3A3]"
        >
          07 / Trust
        </p>
        <h2
          data-reveal
          className="mb-16 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] font-semibold uppercase leading-[1.02] tracking-tight"
        >
          Partnerships built beyond delivery.
        </h2>

        <div className="relative mx-auto max-w-3xl">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 left-0 select-none font-serif text-[8rem] leading-none text-white/10"
          >
            &ldquo;
          </span>

          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeTestimonial}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <p className="text-balance text-xl font-medium leading-relaxed tracking-tight md:text-2xl">
                  &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                </p>
                <footer className="mt-8 text-sm uppercase tracking-[0.15em] text-[#A3A3A3]">
                  {TESTIMONIALS[activeTestimonial].name} &mdash;{" "}
                  {TESTIMONIALS[activeTestimonial].role}
                </footer>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3]/60">
                  Sample content for illustration
                </p>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center gap-3">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setActiveTestimonial(i)}
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeTestimonial === i
                    ? "w-8 bg-[#F5F5F0]"
                    : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/10 pt-10 text-xs uppercase tracking-[0.25em] text-[#A3A3A3]">
          {["Strategy", "Design", "Engineering", "AI", "Automation", "Growth"].map(
            (item) => (
              <span key={item}>{item}</span>
            )
          )}
        </div>
      </section>

      {/* =========================================
          CONTACT / CTA SECTION
          ========================================= */}
      <section
        id="contact"
        className="relative overflow-hidden bg-[#F2F2ED] px-6 py-28 text-[#090909] md:px-10 md:py-44"
      >
        <p
          data-reveal
          className="mb-8 text-xs uppercase tracking-[0.25em] text-[#090909]/60"
        >
          08 / Start Something
        </p>

        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
          <h2
            data-reveal
            className="lg:col-span-8 text-[clamp(2.5rem,8vw,7rem)] font-semibold uppercase leading-[0.95] tracking-tight"
          >
            Have an idea?
            <br />
            Let&rsquo;s build
            <br />
            what&rsquo;s next.
          </h2>

          <div data-reveal className="lg:col-span-4">
            <p className="max-w-sm text-sm leading-relaxed text-[#090909]/70 md:text-base">
              Whether you are launching a new digital product, modernizing an
              existing system, integrating AI, or scaling your online
              presence, Crello can help turn the next move into measurable
              impact.
            </p>
          </div>
        </div>

        <div className="mt-16 flex justify-center md:mt-24">
          <MagneticButton
            onClick={() =>
              typeof window !== "undefined" &&
              (window.location.href = "mailto:hello@crello.studio")
            }
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            className="group flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-full border border-[#090909]/20 text-[#090909] transition-colors duration-500 hover:border-[#090909] md:h-52 md:w-52"
          >
            <ArrowUpRight
              size={36}
              className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
            <span className="text-xs uppercase tracking-[0.15em]">
              Start a Conversation
            </span>
          </MagneticButton>
        </div>
      </section>

      {/* =========================================
          FOOTER
          ========================================= */}
      <footer className="relative border-t border-white/10 px-6 pb-10 pt-20 md:px-10">
        <h2 className="text-[clamp(3rem,14vw,11rem)] font-semibold uppercase leading-[0.85] tracking-tight">
          Crello<sup className="text-[0.3em] align-super">®</sup>
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-10 border-t border-white/10 pt-12 md:grid-cols-4">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#A3A3A3]">
              Company
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { label: "About", href: "#about" },
                { label: "Work", href: "#work" },
                { label: "Process", href: "#process" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(l.href);
                    }}
                    className="text-[#F5F5F0] transition-colors hover:text-[#A3A3A3]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#A3A3A3]">
              Services
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                "Software Development",
                "Web Development",
                "Mobile Apps",
                "AI Solutions",
                "SEO",
                "Automation",
              ].map((s) => (
                <li key={s} className="text-[#A3A3A3]">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#A3A3A3]">
              Connect
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="inline-flex items-center gap-2 text-[#F5F5F0] transition-colors hover:text-[#A3A3A3]"
                >
                  <ArrowUpRight size={16} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="inline-flex items-center gap-2 text-[#F5F5F0] transition-colors hover:text-[#A3A3A3]"
                >
                  <ArrowUpRight size={16} /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="GitHub"
                  className="inline-flex items-center gap-2 text-[#F5F5F0] transition-colors hover:text-[#A3A3A3]"
                >
                  <ArrowUpRight size={16} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@crello.studio"
                  aria-label="Email"
                  className="inline-flex items-center gap-2 text-[#F5F5F0] transition-colors hover:text-[#A3A3A3]"
                >
                  <Mail size={16} /> Email
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#A3A3A3]">
              Status
            </p>
            <div className="flex items-center gap-2 text-sm text-[#F5F5F0]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#F5F5F0]" />
              Available for selected projects
            </div>
            <p className="mt-4 font-mono text-sm text-[#A3A3A3]">
              Local time &mdash; {time || "--:--"}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.15em] text-[#A3A3A3] md:flex-row md:items-center md:justify-between">
          <span>&copy; 2026 Crello</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#F5F5F0]">
              Privacy
            </a>
            <a href="#" className="hover:text-[#F5F5F0]">
              Terms
            </a>
          </div>
          <span>Built for what&rsquo;s next.</span>
        </div>
      </footer>
    </div>
  );
}

/* =========================================
   SUB-COMPONENT: Scroll progress bar
   ========================================= */

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[55] h-[2px] w-full bg-transparent"
    >
      <div
        className="h-full bg-[#F5F5F0] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* =========================================
   SUB-COMPONENT: Magnetic button
   ========================================= */

function MagneticButton({
  children,
  className,
  onClick,
  onHoverStart,
  onHoverEnd,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHoverEnd?.();
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* =========================================
   SUB-COMPONENT: Marquee row
   ========================================= */

function MarqueeRow({
  row,
  reducedMotion,
}: {
  row: { label: string; items: string[]; dir: number };
  reducedMotion: boolean;
}) {
  const content = [...row.items, ...row.items, ...row.items];

  return (
    <div className="group relative overflow-hidden border-y border-white/10 py-6">
      <div className="mb-3 px-1 text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3]">
        {row.label}
      </div>
      <div className="flex overflow-hidden">
        <motion.div
          className="flex shrink-0 items-center gap-10 pr-10"
          animate={
            reducedMotion
              ? undefined
              : { x: row.dir > 0 ? ["0%", "-33.333%"] : ["-33.333%", "0%"] }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {content.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="whitespace-nowrap text-[clamp(1.5rem,4vw,2.75rem)] font-medium uppercase tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(245,245,240,0.4)] transition-all duration-300 hover:text-[#F5F5F0] hover:[-webkit-text-stroke:0px]"
            >
              {item}
              <span className="mx-6 inline-block text-[#A3A3A3]">/</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
/* =========================================
   SUB-COMPONENT: Project card
   ========================================= */

function ProjectCard({
  project,
  index,
  onHoverStart,
  onHoverEnd,
}: {
  project: { n: string; title: string; tags: string };
  index: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={cardRef}
      data-reveal
      onMouseMove={handleMove}
      onMouseEnter={() => {
        setHovered(true);
        onHoverStart?.();
      }}
      onMouseLeave={() => {
        setHovered(false);
        onHoverEnd?.();
      }}
      className="group relative overflow-hidden border border-white/10 p-8 md:p-10"
    >
      {/* abstract visual */}
      <div className="relative mb-10 h-56 w-full overflow-hidden border border-white/10 md:h-64">
        <motion.div
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              index % 2 === 0
                ? "repeating-linear-gradient(135deg, rgba(245,245,240,0.08) 0px, rgba(245,245,240,0.08) 1px, transparent 1px, transparent 18px)"
                : "repeating-linear-gradient(45deg, rgba(245,245,240,0.08) 0px, rgba(245,245,240,0.08) 1px, transparent 1px, transparent 18px)",
            backgroundColor: "#0d0d0d",
          }}
        >
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, rgba(245,245,240,0.12), transparent 60%)",
            }}
          />
          <div className="absolute inset-6 border border-white/10" />
          <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-widest text-[#A3A3A3]">
            {project.n}
          </div>
        </motion.div>
      </div>

      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3]">
            {project.tags}
          </p>
          <h3 className="max-w-xs text-xl font-medium uppercase leading-tight tracking-tight md:text-2xl">
            {project.title}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: hovered ? 45 : 0 }}
          transition={{ duration: 0.4 }}
          className="shrink-0 rounded-full border border-white/20 p-3"
        >
          <ArrowUpRight size={18} />
        </motion.span>
      </div>
    </motion.div>
  );
}