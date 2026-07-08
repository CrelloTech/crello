"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowUpRight,
  Menu,
  X,
  Plus,
  MoveRight,
  Asterisk,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "NOVA",
    subtitle: "BRAND EXPERIENCE",
    category: "STRATEGY / DESIGN / DIGITAL",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "02",
    title: "MOTION",
    subtitle: "CULTURE IN MOVEMENT",
    category: "CAMPAIGN / CONTENT / EXPERIENCE",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "03",
    title: "KINETIC",
    subtitle: "BUILT TO MOVE",
    category: "IDENTITY / WEB / INTERACTION",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=90",
  },
];

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroLines = gsap.utils.toArray<HTMLElement>(".hero-line-inner");

      gsap.fromTo(
        heroLines,
        {
          yPercent: 120,
          rotate: 3,
        },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        ".hero-meta",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          delay: 1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        heroImageRef.current,
        {
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.12,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.6,
          delay: 0.7,
          ease: "power4.inOut",
        }
      );

      gsap.to(heroTitleRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-image-inner", {
        scale: 1.16,
        ease: "none",
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.fromTo(
        ".about-word",
        {
          opacity: 0.12,
        },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 70%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );

      const projectCards =
        gsap.utils.toArray<HTMLElement>(".project-card");

      projectCards.forEach((card) => {
        const image = card.querySelector(".project-image");
        const info = card.querySelector(".project-info");

        gsap.fromTo(
          card,
          {
            clipPath: "inset(12% 0% 12% 0%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          image,
          {
            scale: 1.18,
          },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.3,
            },
          }
        );

        gsap.fromTo(
          info,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 55%",
            },
          }
        );
      });

      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".marquee-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.fromTo(
        ".service-row",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-section",
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".cta-word",
        {
          yPercent: 120,
        },
        {
          yPercent: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 65%",
          },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const moveCursor = (event: MouseEvent) => {
      gsap.to(".custom-cursor", {
        x: event.clientX,
        y: event.clientY,
        duration: 0.18,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const aboutText =
    "WE CREATE BOLD DIGITAL EXPERIENCES FOR AMBITIOUS BRANDS THAT WANT TO MOVE CULTURE FORWARD.";

  return (
    <main
      ref={mainRef}
      className="min-h-screen overflow-hidden bg-[#f2f0ea] text-[#111111]"
    >
      {/* CUSTOM CURSOR */}
      <div
        className={`custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff4d00] text-[10px] font-bold uppercase text-white mix-blend-difference md:flex ${
          cursorVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        View
      </div>

 

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[120vh] bg-[#151515] text-white"
      >
        <div className="relative z-10 flex min-h-screen flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32">
          <div className="hero-meta flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-white/60 md:text-[11px]">
            <span>
              Independent creative
              <br />
              studio / 2026
            </span>

            <span className="hidden text-right md:block">
              Strategy / Design
              <br />
              Digital / Motion
            </span>
          </div>

          <div ref={heroTitleRef} className="relative">
            <h1 className="select-none text-[20vw] font-black uppercase leading-[0.72] tracking-[-0.095em] md:text-[16.5vw]">
              <div className="overflow-hidden pb-[0.08em]">
                <div className="hero-line-inner">We make</div>
              </div>

              <div className="overflow-hidden pb-[0.08em]">
                <div className="hero-line-inner flex items-center justify-between">
                  <span>brands</span>

                  <Asterisk
                    className="hidden h-[8vw] w-[8vw] animate-spin md:block"
                    style={{
                      animationDuration: "9s",
                    }}
                    strokeWidth={0.8}
                  />
                </div>
              </div>

              <div className="overflow-hidden pb-[0.08em]">
                <div className="hero-line-inner text-[#ff4d00]">
                  move.
                </div>
              </div>
            </h1>
          </div>

          <div className="hero-meta flex items-end justify-between">
            <p className="max-w-[250px] text-xs uppercase leading-relaxed tracking-[0.08em] text-white/60">
              A creative studio building identities, digital experiences and
              culture-shifting ideas.
            </p>

            <a
              href="#work"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 transition-all duration-300 hover:bg-white hover:text-black md:h-20 md:w-20"
            >
              <ArrowDown size={20} />
            </a>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div
          ref={heroImageRef}
          className="relative mx-5 h-[75vh] overflow-hidden md:mx-10 md:h-[95vh]"
        >
          <div
            className="hero-image-inner absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2200&q=90')",
            }}
          />

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white md:bottom-8 md:left-8 md:right-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">
                Featured project
              </div>

              <div className="mt-2 text-3xl font-black uppercase tracking-[-0.05em] md:text-6xl">
                Wild / 24
              </div>
            </div>

            <ArrowUpRight
              className="h-8 w-8 md:h-12 md:w-12"
              strokeWidth={1}
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        ref={aboutRef}
        className="relative px-5 py-28 md:px-10 md:py-52"
      >
        <div className="mb-16 flex items-center justify-between border-t border-black/30 pt-4 text-[10px] font-semibold uppercase tracking-[0.15em] md:mb-28">
          <span>( About us )</span>
          <span>Independent by choice</span>
        </div>

        <p className="max-w-[1500px] text-[9vw] font-black uppercase leading-[0.9] tracking-[-0.075em] md:text-[5.8vw]">
          {aboutText.split(" ").map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="about-word mr-[0.22em] inline-block"
            >
              {word}
            </span>
          ))}
        </p>

        <div className="mt-20 grid gap-10 md:mt-32 md:grid-cols-12">
          <div className="md:col-span-5 md:col-start-7">
            <p className="text-lg leading-relaxed md:text-2xl">
              We partner with ambitious people to create meaningful brands,
              useful digital products and unforgettable experiences.
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-11">
            <button className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em]">
              More about us

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black transition-all duration-300 group-hover:bg-black group-hover:text-white">
                <ArrowUpRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marquee-section overflow-hidden border-y border-black bg-[#ff4d00] py-5 md:py-8">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[...Array(2)].map((_, groupIndex) => (
            <div
              key={groupIndex}
              className="flex items-center"
            >
              {[
                "STRATEGY",
                "IDENTITY",
                "DIGITAL",
                "MOTION",
                "CULTURE",
                "EXPERIENCE",
              ].map((item) => (
                <div
                  key={`${groupIndex}-${item}`}
                  className="flex items-center"
                >
                  <span className="px-6 text-[8vw] font-black uppercase leading-none tracking-[-0.07em] md:px-10 md:text-[5vw]">
                    {item}
                  </span>

                  <Asterisk
                    className="h-8 w-8 md:h-12 md:w-12"
                    strokeWidth={1}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="work"
        ref={projectsRef}
        className="bg-[#111111] px-5 py-28 text-white md:px-10 md:py-48"
      >
        <div className="mb-20 flex items-end justify-between border-t border-white/30 pt-4 md:mb-32">
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/50">
              ( Selected work )
            </span>

            <h2 className="mt-8 text-[15vw] font-black uppercase leading-[0.8] tracking-[-0.09em] md:text-[9vw]">
              Work
            </h2>
          </div>

          <span className="hidden text-xs uppercase tracking-[0.15em] text-white/50 md:block">
            2023 — 2026
          </span>
        </div>

        <div className="space-y-24 md:space-y-40">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`project-card ${
                index === 1
                  ? "md:ml-[16%] md:w-[84%]"
                  : index === 2
                  ? "md:w-[78%]"
                  : "w-full"
              }`}
              onMouseEnter={() => setCursorVisible(true)}
              onMouseLeave={() => setCursorVisible(false)}
            >
              <div className="relative h-[65vh] overflow-hidden md:h-[95vh]">
                <div
                  className="project-image absolute inset-0 bg-cover bg-center transition-transform"
                  style={{
                    backgroundImage: `url('${project.image}')`,
                  }}
                />

                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xs font-bold text-black md:left-8 md:top-8 md:h-16 md:w-16">
                  {project.id}
                </div>

                <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff4d00] text-black md:h-20 md:w-20">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>

              <div className="project-info mt-5 flex flex-col gap-5 border-t border-white/30 pt-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-[12vw] font-black uppercase leading-[0.8] tracking-[-0.08em] md:text-[6vw]">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/50">
                    {project.subtitle}
                  </p>
                </div>

                <p className="max-w-xs text-[10px] uppercase leading-relaxed tracking-[0.14em] text-white/50">
                  {project.category}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="services-section px-5 py-28 md:px-10 md:py-48"
      >
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="sticky top-28">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                ( What we do )
              </span>

              <h2 className="mt-8 text-[15vw] font-black uppercase leading-[0.82] tracking-[-0.09em] md:text-[7vw]">
                Built
                <br />
                to move
              </h2>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            {[
              {
                number: "01",
                title: "Strategy",
                text: "Positioning, research, creative direction and ideas that give brands a reason to matter.",
              },
              {
                number: "02",
                title: "Identity",
                text: "Visual systems, verbal identities and expressive brand worlds built for modern culture.",
              },
              {
                number: "03",
                title: "Digital",
                text: "Websites, products and interactive experiences designed around movement and behavior.",
              },
              {
                number: "04",
                title: "Motion",
                text: "Animation, campaigns and moving systems that make brands feel alive.",
              },
            ].map((service) => (
              <div
                key={service.number}
                className="service-row group border-t border-black py-7 md:py-10"
              >
                <div className="grid grid-cols-12 gap-4">
                  <span className="col-span-2 text-xs">
                    {service.number}
                  </span>

                  <div className="col-span-8">
                    <h3 className="text-4xl font-black uppercase tracking-[-0.06em] md:text-7xl">
                      {service.title}
                    </h3>

                    <p className="mt-5 max-w-lg text-sm leading-relaxed text-black/60 md:text-base">
                      {service.text}
                    </p>
                  </div>

                  <div className="col-span-2 flex justify-end">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black transition-all duration-300 group-hover:rotate-45 group-hover:bg-black group-hover:text-white md:h-14 md:w-14">
                      <Plus size={18} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="bg-[#ff4d00] px-5 py-28 md:px-10 md:py-52">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
              ( Our belief )
            </span>
          </div>

          <div className="md:col-span-9">
            <h2 className="text-[11vw] font-black uppercase leading-[0.86] tracking-[-0.085em] md:text-[7.3vw]">
              Safe work
              <br />
              gets ignored.
              <br />
              <span className="text-black/30">Brave work</span>
              <br />
              gets remembered.
            </h2>

            <div className="mt-20 flex justify-end">
              <Asterisk
                className="h-20 w-20 animate-spin md:h-36 md:w-36"
                style={{
                  animationDuration: "12s",
                }}
                strokeWidth={0.7}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="cta-section relative flex min-h-screen flex-col justify-between bg-[#111111] px-5 py-10 text-white md:px-10 md:py-14"
      >
        <div className="flex justify-between border-t border-white/30 pt-4 text-[10px] uppercase tracking-[0.16em] text-white/50">
          <span>( Start something )</span>
          <span>Available worldwide</span>
        </div>

        <div>
          <div className="overflow-hidden">
            <div className="cta-word text-[18vw] font-black uppercase leading-[0.75] tracking-[-0.1em]">
              Have
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="cta-word flex items-center justify-between text-[18vw] font-black uppercase leading-[0.75] tracking-[-0.1em]">
              <span>an idea?</span>

              <MoveRight
                className="hidden h-[7vw] w-[7vw] md:block"
                strokeWidth={0.8}
              />
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="cta-word text-[18vw] font-black uppercase leading-[0.75] tracking-[-0.1em] text-[#ff4d00]">
              Let's talk.
            </div>
          </div>
        </div>

        <div className="grid gap-8 border-t border-white/30 pt-6 md:grid-cols-3">
          <div>
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/40">
              New business
            </div>

            <a
              href="mailto:hello@example.com"
              className="mt-2 inline-block text-sm underline underline-offset-4"
            >
              hello@example.com
            </a>
          </div>

          <div>
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/40">
              Social
            </div>

            <div className="mt-2 flex gap-5 text-sm">
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>

          <div className="md:text-right">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/40">
              Local time
            </div>

            <div className="mt-2 text-sm">
              09:42:18 / GMT
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111] px-5 pb-6 text-white md:px-10 md:pb-10">
        <div className="flex flex-col gap-5 border-t border-white/20 pt-5 text-[9px] uppercase tracking-[0.16em] text-white/40 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Brave Studio</span>

          <div className="flex gap-5">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>

          <span>Made to move</span>
        </div>
      </footer>
    </main>
  );
}