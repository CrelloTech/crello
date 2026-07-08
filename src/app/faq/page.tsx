"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

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

    return (
        <div className={`flex w-full ${fromLeft ? "justify-start" : "justify-end"}`}>
            <div
                ref={ref}
                style={{
                    transitionDelay: `${index * 100}ms`,
                }}
                className={`
  w-full sm:w-[90%] md:w-[75%] lg:w-[65%]
  transition-all duration-700 ease-out
  ${visible
                        ? "translate-x-0 opacity-100"
                        : fromLeft
                            ? "-translate-x-24 opacity-0"
                            : "translate-x-24 opacity-0"
                    }

  bg-black
  backdrop-blur-xl

  ${fromLeft
                        ? "rounded-r-[40px] rounded-l-none border-t border-r border-b border-white/15"
                        : "rounded-l-[40px] rounded-r-none border-t border-l border-b border-white/15"
                    }

  shadow-[0_0_30px_rgba(0,0,0,0.25)]
  hover:border-white/40
  hover:bg-zinc-900
`}
            >
                <button
                    onClick={onToggle}
                    className="flex w-full items-start justify-between gap-6 px-6 py-4 text-left sm:px-8"
                >
                    <div className="flex gap-4">
                        <span className="font-mono text-xs text-white/50">
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-lg font-medium text-white">
                            {item.q}
                        </span>
                    </div>

                    <Plus
                        className={`h-5 w-5 text-white/70 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                </button>

                <div
                    className={`grid overflow-hidden transition-all duration-500 ${isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                        }`}
                >
                    <div className="overflow-hidden">
                        <p className="px-8 pb-5 text-zinc-400 leading-7">
                            {item.a}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="relative overflow-hidden bg-white py-10">
            <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-black/5 blur-3xl" />

            <div className="relative mb-8 text-center px-6">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-black/60">
                    FAQ
                </span>

                <h2 className="mt-2 text-4xl font-bold text-black">
                    Questions, answered.
                </h2>

                <p className="mt-2 text-zinc-500">
                    Everything you need to know before we start building together.
                </p>
            </div>

            <div className="flex flex-col gap-3">
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