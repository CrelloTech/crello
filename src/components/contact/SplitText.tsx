"use client";

import { forwardRef } from "react";

interface SplitTextProps {
    text: string;
    className?: string;
}

const SplitText = forwardRef<HTMLDivElement, SplitTextProps>(
    ({ text, className = "" }, ref) => {
        const words = text.split(" ");

        return (
            <div
                ref={ref}
                className={`flex justify-center gap-6 overflow-hidden ${className}`}
            >
                {words.map((word, wordIndex) => (
                    <div
                        key={wordIndex}
                        className="flex overflow-hidden"
                    >
                        {word.split("").map((char, charIndex) => (
                            <span
                                key={`${wordIndex}-${charIndex}`}
                                className="
                split-char
                inline-block
                will-change-transform
                "
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
);

SplitText.displayName = "SplitText";

export default SplitText;