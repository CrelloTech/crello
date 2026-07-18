"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "We begin by understanding your business, users, goals, and constraints to define the right direction.",
  },
  {
    n: "02",
    title: "Strategy",
    desc: "We translate insights into a clear roadmap, technical architecture, priorities, and measurable outcomes.",
  },
  {
    n: "03",
    title: "Design",
    desc: "We shape intuitive experiences and scalable interfaces that align user needs with business goals.",
  },
  {
    n: "04",
    title: "Build",
    desc: "We engineer reliable, high-performance products using modern technologies and production-ready systems.",
  },
  {
    n: "05",
    title: "Launch",
    desc: "We test, optimize, deploy, and monitor the product to ensure a smooth production release.",
  },
  {
    n: "06",
    title: "Evolve",
    desc: "We continue improving the product through insights, iteration, optimization, and long-term support.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  /* =========================
     DESKTOP REFS
  ========================= */
  const desktopViewportRef = useRef<HTMLDivElement | null>(null);
  const desktopStepsRef = useRef<HTMLDivElement | null>(null);
  const desktopProgressRef = useRef<HTMLDivElement | null>(null);

  /* =========================
     MOBILE REFS
  ========================= */
  const mobileViewportRef = useRef<HTMLDivElement | null>(null);
  const mobileStepsRef = useRef<HTMLDivElement | null>(null);
  const mobileProgressRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;

    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* =====================================================
         DESKTOP
      ===================================================== */
      mm.add("(min-width: 1024px)", () => {
        const viewport = desktopViewportRef.current;
        const steps = desktopStepsRef.current;
        const progress = desktopProgressRef.current;

        if (!viewport || !steps || !progress) return;

        const getMoveDistance = () => {
          return Math.max(
            0,
            steps.scrollHeight - viewport.clientHeight
          );
        };

        gsap.set(steps, {
          y: 0,
        });

        gsap.set(progress, {
          scaleY: 0,
          transformOrigin: "top center",
        });

        const timeline = gsap.timeline({
          defaults: {
            ease: "none",
          },

          scrollTrigger: {
            trigger: section,

            // Pin when section reaches top
            start: "top top",

            // Scroll distance
            end: () => {
              const moveDistance = getMoveDistance();

              return `+=${Math.max(
                moveDistance * 1.25,
                1400
              )}`;
            },

            pin: pin,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
              const totalSteps = PROCESS_STEPS.length;

              const index = Math.min(
                totalSteps - 1,
                Math.floor(self.progress * totalSteps)
              );

              setActiveIndex(index);
            },
          },
        });

        /* RIGHT STEPS MOVE UP */
        timeline.to(
          steps,
          {
            y: () => -getMoveDistance(),
          },
          0
        );

        /* PROGRESS BAR FILLS */
        timeline.to(
          progress,
          {
            scaleY: 1,
          },
          0
        );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      /* =====================================================
         MOBILE + TABLET
      ===================================================== */
      mm.add("(max-width: 1023px)", () => {
        const viewport = mobileViewportRef.current;
        const steps = mobileStepsRef.current;
        const progress = mobileProgressRef.current;

        if (!viewport || !steps || !progress) return;

        const getMoveDistance = () => {
          return Math.max(
            0,
            steps.scrollHeight - viewport.clientHeight
          );
        };

        gsap.set(steps, {
          y: 0,
        });

        gsap.set(progress, {
          scaleY: 0,
          transformOrigin: "top center",
        });

        const timeline = gsap.timeline({
          defaults: {
            ease: "none",
          },

          scrollTrigger: {
            trigger: section,

            // Pin section at top
            start: "top top",

            // Mobile scroll duration
            end: () => {
              const moveDistance = getMoveDistance();

              return `+=${Math.max(
                moveDistance * 1.5,
                1600
              )}`;
            },

            pin: pin,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
              const totalSteps = PROCESS_STEPS.length;

              const index = Math.min(
                totalSteps - 1,
                Math.floor(self.progress * totalSteps)
              );

              setActiveIndex(index);
            },
          },
        });

        /* ONLY BOTTOM STEPS MOVE */
        timeline.to(
          steps,
          {
            y: () => -getMoveDistance(),
          },
          0
        );

        /* MOBILE PROGRESS FILLS */
        timeline.to(
          progress,
          {
            scaleY: 1,
          },
          0
        );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative  text-[#F5F5F0]"
    >
      {/* =====================================================
          PINNED SCREEN
      ===================================================== */}
      <div
        ref={pinRef}
        className="relative h-[100svh] overflow-hidden"
      >
        {/* =================================================
            MOBILE LAYOUT
        ================================================= */}
        <div className="flex h-full flex-col px-5 pb-5 pt-20 lg:hidden">
          {/* =============================================
              FIXED TOP CONTENT
          ============================================= */}
          <div className="relative z-30 shrink-0 bg-[#050505]">

            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em]">
              <span className="text-[#ff5c35]">05</span>
              <span className="h-px w-8 bg-current opacity-30" />
              <span>How We Work</span>
            </div>

            <h2 className="mt-10 max-w-[350px] text-[clamp(2rem,9vw,3rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em]">
              From first conversation to lasting impact.
            </h2>

            <p className="mt-6 max-w-[350px] text-[13px] leading-6 text-[#A3A3A3]">
              A consistent method, applied to every engagement
              &mdash; from a first call to a system running in
              production and beyond.
            </p>
          </div>

          {/* =============================================
              MOBILE MOVING AREA
          ============================================= */}
          <div
            ref={mobileViewportRef}
            className="relative mt-8 min-h-0 flex-1 overflow-hidden"
          >
            {/* =========================================
                SHORT MOBILE PROGRESS BAR
                Change h-[80%] to h-[70%] if needed
            ========================================= */}
            <div className="absolute left-[7px] top-1/2 z-20 h-[80%] w-px -translate-y-1/2 bg-white/10">
              <div
                ref={mobileProgressRef}
                className="h-full w-full origin-top bg-[#F5F5F0]"
              />
            </div>

            {/* =========================================
                MOBILE STEPS
            ========================================= */}
            <div
              ref={mobileStepsRef}
              className="relative flex flex-col pb-[25vh]"
            >
              {PROCESS_STEPS.map((step, index) => {
                const isActive = activeIndex === index;
                const isCompleted = activeIndex >= index;

                return (
                  <div
                    key={step.n}
                    className="relative min-h-[190px] border-b border-white/10 py-8 pl-8"
                  >
                    {/* DOT */}
                    <span
                      className={`
                        absolute
                        left-[1px]
                        top-[38px]
                        z-30
                        h-3.5
                        w-3.5
                        rounded-full
                        border
                        transition-all
                        duration-300
                        ${isCompleted
                          ? "border-[#F5F5F0] bg-[#F5F5F0]"
                          : "border-white/30 bg-[#050505]"
                        }
                      `}
                    />

                    {/* CONTENT */}
                    <div className="flex items-start gap-5">
                      {/* NUMBER */}
                      <span
                        className={`
                          pt-1
                          font-mono
                          text-[11px]
                          transition-colors
                          duration-300
                          ${isActive
                            ? "text-white"
                            : "text-white/35"
                          }
                        `}
                      >
                        {step.n}
                      </span>

                      <div className="min-w-0 flex-1">
                        {/* TITLE */}
                        <h3
                          className={`
                            text-[24px]
                            font-medium
                            uppercase
                            leading-none
                            tracking-tight
                            transition-all
                            duration-300
                            ${isActive
                              ? "text-[#F5F5F0]"
                              : "text-white/25"
                            }
                          `}
                        >
                          {step.title}
                        </h3>

                        {/* DESCRIPTION */}
                        <p
                          className={`
                            mt-5
                            max-w-[290px]
                            text-[13px]
                            leading-6
                            transition-all
                            duration-300
                            ${isActive
                              ? "text-[#A3A3A3] opacity-100"
                              : "text-white/20 opacity-60"
                            }
                          `}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================
            DESKTOP LAYOUT
        ================================================= */}
        <div className="mx-auto hidden h-full max-w-[1600px] grid-cols-12 gap-20 px-10 lg:grid">
          {/* =============================================
              FIXED LEFT SIDE
          ============================================= */}
          <div className="col-span-5 flex h-full items-center">
            <div>
         
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em]">
      <span className="text-[#ff5c35]">05</span>
      <span className="h-px w-8 bg-current opacity-30" />
      <span>How We Work</span>
    </div>

              <h2 className="mt-20 max-w-xl text-[clamp(2.25rem,5vw,4rem)] font-semibold uppercase leading-[1.02] tracking-tight">
                From first conversation to lasting impact.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-[#A3A3A3] md:text-base">
                A consistent method, applied to every engagement
                &mdash; from a first call to a system running in
                production and beyond.
              </p>
            </div>
          </div>

          {/* =============================================
              MOVING RIGHT SIDE
          ============================================= */}
          <div
            ref={desktopViewportRef}
            className="relative col-span-7 h-full overflow-hidden"
          >
            {/* =========================================
                SHORT DESKTOP PROGRESS BAR

                Current: 65%
                Smaller: 55%
                Larger: 75%
            ========================================= */}
            <div className="absolute left-[15px] top-1/2 z-20 h-[65%] w-px -translate-y-1/2 bg-white/10">
              <div
                ref={desktopProgressRef}
                className="h-full w-full origin-top bg-[#F5F5F0]"
              />
            </div>

            {/* =========================================
                DESKTOP MOVING STEPS
            ========================================= */}
            <div
              ref={desktopStepsRef}
              className="flex flex-col pb-[35vh] pt-[35vh]"
            >
              {PROCESS_STEPS.map((step, index) => {
                const isActive = activeIndex === index;
                const isCompleted = activeIndex >= index;

                return (
                  <div
                    key={step.n}
                    className="relative flex min-h-[260px] flex-col justify-center border-b border-white/10 py-12 pl-12"
                  >
                    {/* DOT */}
                    <span
                      className={`
                        absolute
                        left-[9px]
                        top-1/2
                        h-3.5
                        w-3.5
                        -translate-y-1/2
                        rounded-full
                        border
                        transition-all
                        duration-300
                        ${isCompleted
                          ? "border-[#F5F5F0] bg-[#F5F5F0]"
                          : "border-white/30 bg-[#050505]"
                        }
                      `}
                    />

                    {/* STEP HEADER */}
                    <div className="flex items-baseline gap-6">
                      {/* NUMBER */}
                      <span
                        className={`
                          font-mono
                          text-sm
                          transition-colors
                          duration-300
                          ${isActive
                            ? "text-[#F5F5F0]"
                            : "text-[#A3A3A3]"
                          }
                        `}
                      >
                        {step.n}
                      </span>

                      {/* TITLE */}
                      <h3
                        className={`
                          text-2xl
                          font-medium
                          uppercase
                          tracking-tight
                          transition-all
                          duration-300
                          md:text-3xl
                          ${isActive
                            ? "text-[#F5F5F0]"
                            : "text-white/30"
                          }
                        `}
                      >
                        {step.title}
                      </h3>
                    </div>

                    {/* DESCRIPTION */}
                    <p
                      className={`
                        mt-4
                        max-w-md
                        pl-[3.25rem]
                        text-sm
                        leading-relaxed
                        transition-all
                        duration-300
                        md:text-base
                        ${isActive
                          ? "text-[#A3A3A3]"
                          : "text-white/20"
                        }
                      `}
                    >
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}