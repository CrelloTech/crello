"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const projectTypes = ["Web Design", "Web Development", "Branding", "Other"];

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
    "w-full rounded-lg sm:rounded-xl border border-black/30 bg-black/5 px-3 py-2 sm:px-4 sm:py-3 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-white focus:bg-black/10 sm:text-base";

function Field({
    label,
    htmlFor,
    children,
}: {
    label: string;
    htmlFor: string;
    children: ReactNode;
}) {
    return (
        <div
            data-stagger
            className="flex flex-row items-center gap-3 sm:flex-col sm:items-start sm:gap-1.5"
        >
            <label
                htmlFor={htmlFor}
                className="w-20 shrink-0 text-[10px] font-bold uppercase tracking-wide text-black/70 sm:w-auto sm:text-xs sm:tracking-wider"
            >
                {label}
            </label>
            {children}
        </div>
    );
}

export default function ContactForm() {
    const [status, setStatus] = useState<Status>("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(form);

        if (data.get("company_website")) return;

        setStatus("loading");

        try {

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.get("name"),
                    email: data.get("email"),
                    phone: data.get("phone"),
                    company: data.get("company"),
                    message: data.get("message"),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed");
            }

            setStatus("success");
            form.reset();

        } catch {
            setStatus("error");
        }
    };




    if (status === "success") {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-4 bg-[#F97316] px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black">
                    <Check className="text-black" size={28} />
                </div>
                <h2 className="text-2xl font-black text-black sm:text-4xl">
                    Message sent!
                </h2>
                <p className="max-w-sm text-black/80">
                    Thanks for reaching out — we&apos;ll get back to you within
                    1–2 business days.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-sm font-semibold text-black underline underline-offset-4"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="relative grid h-full grid-rows-[auto_1fr_auto] gap-3 sm:gap-4 bg-[#F97316] px-4 py-3 sm:px-10 sm:py-6 lg:px-14 lg:py-8"
        >
            <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px]"
                aria-hidden="true"
            />

            {/* HEADING */}
            <h2
                data-stagger
                className="mb-3 text-xl font-black leading-[0.95] text-black sm:mb-4 sm:text-4xl lg:text-5xl"
            >
                Let&apos;s talk,
                <br />
                Get in touch!
            </h2>

            {/* FIELDS + MESSAGE — two columns from sm: up, stacked on mobile */}
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                {/* LEFT — one field per row on mobile, 2-per-row from sm: up */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 sm:gap-4">
                    <Field label="Full name" htmlFor="name">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Your full name"
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Email" htmlFor="email">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@company.com"
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Phone" htmlFor="phone">
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="+91 98765 43210"
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Company" htmlFor="company">
                        <input
                            id="company"
                            name="company"
                            type="text"
                            autoComplete="organization"
                            placeholder="Company name"
                            className={inputClass}
                        />
                    </Field>

                    {/* <div className="sm:col-span-2">
                        <Field label="Project" htmlFor="projectType">
                            <select
                                id="projectType"
                                name="projectType"
                                required
                                defaultValue=""
                                className={`${inputClass} appearance-none`}
                            >
                                <option value="" disabled>
                                    Select a type
                                </option>
                                {projectTypes.map((type) => (
                                    <option key={type} value={type} className="text-black">
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </Field>
                    </div> */}
                </div>

                {/* RIGHT — message */}
                <div data-stagger className="flex min-h-0 flex-col gap-1">
                    <label
                        htmlFor="message"
                        className="text-[10px] font-bold uppercase tracking-wide text-black/70 sm:text-xs sm:tracking-wider"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        minLength={10}
                        placeholder="Tell us about your project..."
                        className={`${inputClass} min-h-[56px] flex-1 resize-none sm:min-h-[100px] md:min-h-0`}
                    />
                </div>
            </div>

            {/* SEND */}
            <div
                data-stagger
                className="mt-3 flex shrink-0 flex-col justify-end gap-4 sm:mt-4 sm:flex-row sm:items-center"
            >
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group flex w-full items-center justify-between gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-900 active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 sm:w-[220px] sm:py-4 sm:text-base"
                >
                    <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
                        {status === "loading" ? (
                            <Loader2 className="animate-spin" size={16} />
                        ) : (
                            <ArrowRight size={16} />
                        )}
                    </span>
                </button>
            </div>

            {status === "error" && (
                <p className="mt-3 text-center text-sm text-black">
                    Something went wrong — please try again or email us directly.
                </p>
            )}
        </form>
    );
}