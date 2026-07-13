"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import logoWhite from "../../public/logo-white.png";
import logoBlack from "../../public/logo-black.png";
import Image from "next/image";


function scrollToContact() {
  const el = document.getElementById("contact");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkNavbar, setDarkNavbar] = useState(false);
  return (
    <>
      <header className="fixed left-0 top-0 z-[100] w-full px-5 py-5 mix-blend-difference md:px-10 md:py-7">
        <div className="flex items-center justify-between text-white">

          {/* Logo */}
          <a
            href="#"
            className="text-xl font-black tracking-[-0.07em] md:text-2xl"
          >
            <div className="relative h-10 w-[140px]">
              <Image
                src={logoBlack}
                alt="Crello"
                fill
                className={`absolute object-contain transition-opacity duration-500 ${darkNavbar ? "opacity-100" : "opacity-0"
                  }`}
              />

              <Image
                src={logoWhite}
                alt="Crello"
                fill
                className={`absolute object-contain transition-opacity duration-500 ${darkNavbar ? "opacity-0" : "opacity-100"
                  }`}
              />
            </div>          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.12em]">

            <a
              href="#work"
              className="transition-opacity hover:opacity-50"
            >
              Work
            </a>

            <a
              href="#about"
              className="transition-opacity hover:opacity-50"
            >
              About
            </a>

          </div>

          {/* Desktop Contact Button */}
          <button
            onClick={scrollToContact}
            className="hidden md:flex items-center gap-2 rounded-full border border-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:bg-white hover:text-black"
          >
            Contact
            <ArrowUpRight size={16} />
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex md:hidden items-center gap-2 text-xs font-bold uppercase"
          >
            Menu
            <Menu size={18} strokeWidth={1.7} />
          </button>

        </div>
      </header>


      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-[200] flex min-h-screen flex-col bg-[#ff4d00] p-5 text-black md:p-10"
          >
            <div className="flex items-center justify-between">
              <div className="text-xl font-black tracking-[-0.07em] md:text-2xl">
                <Image
                  src={darkNavbar ? logoWhite : logoBlack}
                  alt="Crello Logo"
                  width={140}
                  height={40}
                /> </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="flex md:hidden items-center gap-2 text-xs font-bold uppercase"
              >
                Close
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center">
              {["Work", "About", "Services", "Contact"].map(
                (item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      setMenuOpen(false);

                      if (item === "Contact") {
                        e.preventDefault();
                        // let the fullscreen menu finish closing first,
                        // then scroll to the contact section behind it
                        setTimeout(scrollToContact, 400);
                      }
                    }}
                    initial={{
                      opacity: 0,
                      y: 80,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.18 + index * 0.08,
                      duration: 0.7,
                    }}
                    className="group flex items-center justify-between border-b border-black/30 py-2 text-[13vw] font-black uppercase leading-[0.9] tracking-[-0.08em] md:text-[7vw]"
                  >
                    <span>{item}</span>

                    <ArrowUpRight
                      className="h-8 w-8 opacity-0 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100 md:h-16 md:w-16"
                      strokeWidth={1}
                    />
                  </motion.a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}