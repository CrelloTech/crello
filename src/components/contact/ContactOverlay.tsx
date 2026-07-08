"use client";

import { useEffect, useLayoutEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import ContactForm from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);

export default function ContactOverlay() {
    const overlayRef = useRef<HTMLDivElement>(null);
    const topPanel = useRef<HTMLDivElement>(null);
    const bottomPanel = useRef<HTMLDivElement>(null);
    const topText = useRef<HTMLDivElement>(null);
    const bottomText = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const openTl = useRef<gsap.core.Timeline | null>(null);
    const closeTl = useRef<gsap.core.Timeline | null>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [canOpen, setCanOpen] = useState(true);
    const closeCard = useCallback(() => {
        closeTl.current?.restart();
    }, []);
    // Card tilt on mouse move
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const move = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 6;
            const rotateX = ((y / rect.height) - 0.5) * -6;

            gsap.to(card, {
                rotateX,
                rotateY,
                duration: 0.4,
                ease: "power3.out",
                transformPerspective: 1200,
            });
        };

        const leave = () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: "power3.out" });
        };

        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);

        return () => {
            card.removeEventListener("mousemove", move);
            card.removeEventListener("mouseleave", leave);
        };
    }, []);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            gsap.set(topPanel.current, { height: "50%" });
            gsap.set(bottomPanel.current, { height: "50%" });
            gsap.set(cardRef.current, { yPercent: 120, scale: 0.86, rotate: -6 });
            gsap.set(formRef.current, { opacity: 0, y: 80 });
            /*             gsap.set(".split-char", { y: 180 });
             */
            const open = gsap.timeline({
                defaults: { ease: "power4.out" },
                scrollTrigger: {
                    trigger: overlayRef.current,
                    start: "top 65%",
                    end: "bottom top",
                    toggleActions: "play none none none", // <-- don't reverse automatically
                },
                onStart: () => setIsOpen(true),
            });

            openTl.current = open;


            open.to(topText.current?.querySelectorAll(".split-char") || [], {
                y: 0,
                duration: 0.9,
                stagger: { each: 0.02, from: "start" },
                ease: "power4.out",
            });

            open.to(
                bottomText.current?.querySelectorAll(".split-char") || [],
                {
                    y: 0,
                    duration: 0.75,
                    stagger: { each: 0.025 },
                    ease: "power4.out",
                },
                "-=0.45"
            );
            open.to({}, { duration: 0.45 });

            mm.add(
                { isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" },
                (context) => {
                    const { isDesktop } = context.conditions as { isDesktop: boolean };
                    const panelHeight = isDesktop ? "11%" : "8%";

                    open.to(topPanel.current, { height: panelHeight, duration: 1.2, ease: "power4.inOut" }, "-=0.1");
                    open.to(bottomPanel.current, { height: panelHeight, duration: 1.2, ease: "power4.inOut" }, "<");
                }
            );

            open.to(cardRef.current, {
                yPercent: 0,
                rotate: 0,
                scale: 1,
                duration: 1.35,
                ease: "power4.out",
            }, "-=0.9");

            open.to(cardRef.current, { scale: 1.015, duration: 0.18, repeat: 1, yoyo: true });

            open.to(formRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4");

            open.to({}, { duration: 0.08 });

            open.from(formRef.current?.querySelectorAll("[data-stagger]") || [], {
                opacity: 0,
                y: 30,
                stagger: 0.12,
                duration: 0.55,
                ease: "power4.out",
            }, "-=0.15");
            const close = gsap.timeline({
                paused: true,
                defaults: {
                    ease: "power4.inOut",
                },
                onComplete: () => {
                    setIsOpen(false);
                    setCanOpen(true);
                    // Reset the opening timeline to the beginning
                    openTl.current?.pause(0).progress(0);
                }
            });

            mm.add(
                { isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" },
                (context) => {
                    const { isDesktop } = context.conditions as { isDesktop: boolean };
                    const panelHeight = isDesktop ? "11%" : "8%";

                    close
                        .to(formRef.current, {
                            opacity: 0,
                            y: 80,
                            duration: 0.35,
                        })

                        .to(
                            cardRef.current,
                            {
                                yPercent: 120,
                                rotate: -6,
                                scale: 0.86,
                                duration: 1,
                            },
                            "-=0.1"
                        )

                        .to(
                            topPanel.current,
                            {
                                height: "50%",
                                duration: 1,
                            },
                            "-=0.8"
                        )

                        .to(
                            bottomPanel.current,
                            {
                                height: "50%",
                                duration: 1,
                            },
                            "<"
                        );
                }
            );

            closeTl.current = close;
        }, overlayRef);

        return () => {
            closeTl.current = null;
            openTl.current = null;
            ctx.revert();
        };
    }, []);
    const openContact = useCallback(() => {
        if (isOpen) return;
        setCanOpen(false);

        setIsOpen(true);

        // Reset opening timeline
        openTl.current?.restart();

        // Reset closing timeline
        closeTl.current?.pause(0);
    }, [isOpen]);
    return (
        <div ref={overlayRef} className="relative h-screen w-full bg-black">
            {isOpen && (
                <button
                    onClick={closeCard}
                    className="absolute right-10 top-10 z-50 text-sm uppercase tracking-[6px] text-white transition-opacity duration-300 hover:text-orange-500"
                >
                    Close
                </button>
            )}

            {/* TOP PANEL — no overflow-hidden here, SplitText already self-clips its reveal */}
            <section
                ref={topPanel}
                className="absolute top-0 left-0 z-40 flex w-full items-end justify-center bg-black"
            >
                <div ref={topText} className="pb-0">
                    <SplitText
                        text="GET IN"
                        className="font-black uppercase text-white leading-none tracking-[-8px] text-[90px] sm:text-[150px] lg:text-[260px]"
                    />
                </div>
            </section>
            {canOpen && !isOpen && (
                <button
                    onClick={openContact}
                    className="
absolute
left-1/2
top-1/2
z-50
-flex
-translate-x-1/2
-translate-y-1/2
items-center
gap-2

rounded-full
bg-[#ff5c35]

px-5 py-3
sm:px-6 sm:py-3.5
md:px-8 md:py-4
lg:px-10 lg:py-5

text-[10px]
sm:text-xs
md:text-sm

font-semibold
uppercase
tracking-[0.15em]
sm:tracking-[0.18em]
md:tracking-[0.22em]

text-white

shadow-[0_10px_30px_rgba(255,92,53,0.35)]
transition-all
duration-300

hover:scale-105
hover:bg-[#ff6d47]
active:scale-95

        "
                >
                    Let's Talk
                </button>
            )}
            {/* CARD */}
            <section
                ref={cardRef}
                className="absolute z-20 left-1/2 -translate-x-1/2 w-[96vw] max-w-[1500px] top-[8vh] bottom-[8vh] md:top-[11vh] md:bottom-[11vh] overflow-hidden rounded-[18px] md:rounded-[28px]"
            >
                <div ref={formRef} className="h-full">
                    <ContactForm />
                </div>
            </section>

            {/* BOTTOM PANEL — same fix */}
            <section
                ref={bottomPanel}
                className="absolute bottom-0 left-0 z-40 flex w-full items-start justify-center bg-black"
            >
                <div ref={bottomText} className="pt-0">
                    <SplitText
                        text="TOUCH"
                        className="font-black uppercase text-white leading-none tracking-[-8px] text-[72px] sm:text-[120px] md:text-[180px] lg:text-[260px]"
                    />
                </div>
            </section>
        </div>
    );
}