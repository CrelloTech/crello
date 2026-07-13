"use client";

import { useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import ContactForm from "./ContactForm";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type ContactOverlayProps = {
    onClose: () => void;
};

export default function ContactOverlay({ onClose }: ContactOverlayProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const topPanel = useRef<HTMLDivElement>(null);
    const bottomPanel = useRef<HTMLDivElement>(null);
    const topText = useRef<HTMLDivElement>(null);
    const bottomText = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const openTl = useRef<gsap.core.Timeline | null>(null);
    const closeTl = useRef<gsap.core.Timeline | null>(null);

    const closeCard = useCallback(() => {
        closeTl.current?.restart();
    }, []);

    // Lock page scroll while the overlay is mounted
    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
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

            // Plays automatically as soon as the overlay mounts (i.e. on button click)
            const open = gsap.timeline({
                defaults: { ease: "power4.out" },
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
            open.to({}, { duration: 0.1 });

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
                    // Fully unmount only after the close animation finishes
                    onClose();
                },
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const overlay = (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[999] h-screen w-screen overflow-hidden bg-white/25 backdrop-blur-[18px]"
        >
            {/* TOP PANEL */}
            <section
                ref={topPanel}
                className="absolute top-0 left-0 z-40 flex w-full items-end justify-center"
            >
                <div ref={topText} className="pb-0">
                    <SplitText
                        text="GET IN"
                        className="font-black uppercase text-black/100 leading-none tracking-[-5px] text-[82px] sm:text-[150px] lg:text-[260px] overflow-hidden"
                    />
                </div>
            </section>

            {/* CARD */}
            <section
                ref={cardRef}
                className="absolute z-20 left-1/2 -translate-x-1/2 w-[96vw] max-w-[1300px] top-[8vh] bottom-[8vh] md:top-[11vh] md:bottom-[11vh] overflow-hidden rounded-[18px] md:rounded-[28px]"
            >
                <button
                    onClick={closeCard}
                    aria-label="Close contact overlay"
                    className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-black/5 text-black transition-colors duration-300 hover:bg-black hover:text-white md:right-8 md:top-8"
                >
                    <X size={18} />
                </button>

                <div ref={formRef} className="h-full">
                    <ContactForm />
                </div>
            </section>

            {/* BOTTOM PANEL */}
            <section
                ref={bottomPanel}
                className="absolute bottom-0 left-0 z-40 flex w-full items-start justify-center"
            >
                <div ref={bottomText} className="pt-0">
                    <SplitText
                        text="TOUCH"
                        className="font-black uppercase text-black/100 leading-none tracking-[-8px] text-[72px] sm:text-[120px] md:text-[180px] lg:text-[260px]"
                    />
                </div>
            </section>
        </div>
    );

    return typeof document !== "undefined" ? createPortal(overlay, document.body) : null;
}