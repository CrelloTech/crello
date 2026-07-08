"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function ContactHero() {
    const wrapper = useRef<HTMLDivElement>(null);

    const topText = useRef<HTMLHeadingElement>(null);
    const bottomText = useRef<HTMLHeadingElement>(null);

    const card = useRef<HTMLDivElement>(null);

    const [showCard, setShowCard] = useState(false);

    useLayoutEffect(() => {
        // Prevent GSAP from receiving null refs on first render.
        if (!wrapper.current) return;
        if (!topText.current || !bottomText.current) return;

        const ctx = gsap.context(() => {
            // Set initial styles only if mounted.
            if (card.current) {
                gsap.set(card.current, {
                    y: 500,
                    opacity: 0,
                    scale: 0.82,
                    rotate: -5,
                });
            }

            gsap.set(topText.current, { y: 120, opacity: 0 });
            gsap.set(bottomText.current, { y: 120, opacity: 0 });

            const tl = gsap.timeline();

            tl.to(topText.current, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power4.out",
            });

            tl.to(
                bottomText.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.75,
                    ease: "power4.out",
                },
                "-=.45"
            );

            tl.to({}, { duration: 0.55 });
            tl.to({}, { duration: 0.45 });

            tl.to(
                topText.current,
                {
                    y: -420,
                    duration: 1.25,
                    ease: "power4.inOut",
                },
                "open"
            );

            tl.to(
                bottomText.current,
                {
                    y: 420,
                    duration: 1.25,
                    ease: "power4.inOut",
                },
                "open"
            );

            tl.call(
                () => {
                    setShowCard(true);
                },
                undefined,
                "open+=0.15"
            );

            // wait one frame
            tl.to({}, { duration: 0.01 });

            // Card entrance
            tl.to(
                card.current,
                {
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                    duration: 1.15,
                    ease: "back.out(1.4)",
                },
                "open+=0.15"
            );

            // Slight overshoot
            tl.to(card.current, {
                scale: 1.015,
                duration: 0.18,
                yoyo: true,
                repeat: 1,
                ease: "power2.out",
            });

            // Idle animation
            gsap.to(card.current, {
                y: -8,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 3,
            });
        }, wrapper);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={wrapper}
            className="fixed inset-0 z-[999] overflow-hidden bg-black"
        >
            <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
            >
                <h1
                    ref={topText}
                    className="text-white font-black uppercase tracking-[-8px] leading-none text-[110px] sm:text-[180px] md:text-[250px] lg:text-[330px]"
                >
                    GET IN
                </h1>

                <h1
                    ref={bottomText}
                    className="text-white font-black uppercase tracking-[-8px] leading-none text-[110px] sm:text-[180px] md:text-[250px] lg:text-[330px] -translate-y-10"
                >
                    TOUCH
                </h1>
            </div>

            {showCard && (
                <div
                    ref={card}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[1450px] h-[82vh] rounded-[36px] bg-[#635BFF] overflow-hidden"
                >
                    <div className="grid h-full lg:grid-cols-2">
                        {/* LEFT */}
                        <div className="flex flex-col justify-between p-16 text-white">
                            <div>
                                <p className="uppercase tracking-[5px] text-sm opacity-70">CONTACT</p>
                                <h2 className="mt-8 text-[72px] font-black leading-[0.95]">
                                    Let's
                                    <br />
                                    build
                                    <br />
                                    together.
                                </h2>
                            </div>

                            <div>
                                <p className="opacity-70">hello@yourcompany.com</p>
                                <p className="mt-3 opacity-70">+91 9876543210</p>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="bg-white p-16">{/* PART 3 */}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

