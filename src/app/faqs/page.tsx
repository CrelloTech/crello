"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface FAQ {
    q: string;
    a: string;
}

const FAQS: FAQ[] = [
    {
        q: "What kind of projects do you take on?",
        a: "Everything from custom software builds and mobile apps to AI integrations, business automation, and full digital transformation programs — for startups shipping their first product and enterprises modernizing legacy systems.",
    },
    {
        q: "How do you approach a new engagement?",
        a: "We start by understanding the actual business problem, not just the feature request. That shapes a scoped, secure, and scalable architecture before a single line of code ships.",
    },
    {
        q: "Can you integrate AI into our existing workflows?",
        a: "Yes. We integrate AI into existing systems through automation, copilots, and intelligent workflows without requiring a complete rebuild.",
    },
    {
        q: "Do you help with visibility, or just the build?",
        a: "Both. We combine engineering with SEO and performance optimization so your product is fast, scalable, and discoverable.",
    },
    {
        q: "What does a typical timeline look like?",
        a: "Most projects move through discovery, design, MVP, and iterative releases so you can see working software early.",
    },
    {
        q: "Do you work with existing development teams?",
        a: "Absolutely. We collaborate with in-house teams, providing expertise where needed while delivering clean, maintainable code.",
    },
];

interface FAQItemProps {
    item: FAQ;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}

function FAQItem({ item, index, isOpen, onToggle }: FAQItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    const fromLeft = index % 2 === 0;

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // The question button — larger, more substantial, still fixed-size.
    const questionBox = (
        <button
            onClick={onToggle}
            className={`
        group relative z-10 flex flex-shrink-0 items-center gap-4
        w-full sm:w-80 md:w-180
        min-h-[76px]
        px-4 py-3 sm:px-5
        text-left
        bg-gradient-to-br from-zinc-900 to-black
        transition-all duration-300
        hover:from-zinc-800 hover:to-zinc-900
        ${fromLeft
                    ? "rounded-r-3xl border-y border-r border-white/10"
                    : "rounded-l-3xl border-y border-l border-white/10"
                }
        ${isOpen ? "border-white/50" : ""}
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      `}
        >
            <span
                className={`
          flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full
          font-mono text-xs
          transition-colors duration-300
          ${isOpen ? "bg-white text-black" : "bg-white/10 text-white/60"}
        `}
            >
                {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 text-md font-medium leading-snug text-white sm:text-md">
                {item.q}
            </span>
            <span className="flex flex-shrink-0 items-center gap-1.5">
                <span
                    className={`hidden text-xs font-medium uppercase tracking-wide transition-colors duration-300 sm:inline ${isOpen ? "text-white" : "text-white/50 group-hover:text-white/80"
                        }`}
                >
                    {isOpen ? "Hide" : "View"}
                </span>
                <ArrowRight
                    className={`h-5 w-5 text-white/70 transition-transform duration-300 group-hover:text-white ${fromLeft
                        ? isOpen
                            ? "rotate-180"
                            : "rotate-0"
                        : isOpen
                            ? "rotate-0"
                            : "rotate-180"
                        }`}
                />
            </span>
        </button>
    );

    // The wire connector — draws itself between the question node and the answer node.
    const connector = (
        <div
            className={`
        hidden sm:flex flex-shrink-0 items-center justify-center self-center
        overflow-visible
        transition-all duration-300 ease-out
        ${isOpen ? "w-14 opacity-100" : "w-0 opacity-0"}
      `}
            style={{ transitionDelay: isOpen ? "0ms" : "150ms" }}
            aria-hidden="true"
        >
            <svg
                width="56"
                height="20"
                viewBox="0 0 56 20"
                className={`overflow-visible ${fromLeft ? "" : "-scale-x-100"}`}
            >
                {/* terminal dot, box side */}
                <circle cx="2" cy="10" r="3.5" className="fill-black/70" />
                {/* wire */}
                <line
                    x1="2"
                    y1="10"
                    x2="44"
                    y2="10"
                    stroke="currentColor"
                    className="text-black/60"
                    strokeWidth="2"
                    strokeDasharray="42"
                    strokeDashoffset={isOpen ? 0 : 42}
                    style={{
                        transition: "stroke-dashoffset 450ms ease-out",
                        transitionDelay: isOpen ? "120ms" : "0ms",
                    }}
                />
                {/* arrowhead pointing into the answer */}
                <path
                    d="M42 4 L52 10 L42 16"
                    fill="none"
                    stroke="currentColor"
                    className={`transition-colors duration-300 ${isOpen ? "text-black/80" : "text-black/20"
                        }`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transitionDelay: isOpen ? "500ms" : "0ms" }}
                />
            </svg>
        </div>
    );

    // The answer drawer — slides open sideways, toward the center of the screen.
    const answerPanel = (
        <div
            className={`
        overflow-hidden transition-all duration-500 ease-out
        ${isOpen ? "max-w-xl opacity-100" : "max-w-0 opacity-0"}
      `}
            style={{
                transitionProperty: "max-width, opacity",
                transitionDelay: isOpen ? "150ms" : "0ms",
            }}
        >
            <div
                className={`
          flex h-full items-center
          w-[min(90vw,34rem)] min-h-[76px]
          bg-transparent
          px-4 py-3 sm:px-5
          border-y border-black/10
          ${fromLeft ? "rounded-r-3xl border-r" : "rounded-l-3xl border-l"}
        `}
            >
                <p className="text-sm leading-6 text-black sm:text-[15px]">
                    {item.a}
                </p>
            </div>
        </div>
    );

    return (
        <div className={`flex w-full ${fromLeft ? "justify-start" : "justify-end"}`}>
            <div
                ref={ref}
                style={{
                    transitionDelay: `${index * 100}ms`,
                }}
                className={`
          flex items-stretch max-w-full
          transition-all duration-700 ease-out
          ${visible
                        ? "translate-x-0 opacity-100"
                        : fromLeft
                            ? "-translate-x-24 opacity-0"
                            : "translate-x-24 opacity-0"
                    }
        `}
            >
                {fromLeft ? (
                    <>
                        {questionBox}
                        {connector}
                        {answerPanel}
                    </>
                ) : (
                    <>
                        {answerPanel}
                        {connector}
                        {questionBox}
                    </>
                )}
            </div>
        </div>
    );
}

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="relative overflow-hidden bg-white py-16">
            <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-black/5 blur-3xl" />

            <div className="relative mb-12 text-center px-6">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-black/60">
                    FAQ
                </span>

                <h2 className="mt-3 text-4xl font-bold text-black sm:text-5xl">
                    Questions, answered.
                </h2>

                <p className="mt-3 text-zinc-500">
                    Everything you need to know before we start building together.
                </p>
            </div>

            {/* No horizontal padding here — cards touch the true window edge */}
            <div className="flex flex-col gap-5">
                {FAQS.map((item, index) => (
                    <FAQItem
                        key={item.q}
                        item={item}
                        index={index}
                        isOpen={openIndex === index}
                        onToggle={() =>
                            setOpenIndex(openIndex === index ? null : index)
                        }
                    />
                ))}
            </div>
        </section>
    );
}