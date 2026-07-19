import {
  Mail,
  MapPin,
  Phone,
  Globe2,
} from "lucide-react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import Image from "next/image"
import logo from "../../public/logo-white.png";


export default function Footer() {
  return (
    <footer className="bg-[#111111] px-5 pt-10 text-white md:px-10 md:pt-10 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a
              href="#"
              className="text-5xl font-black tracking-[-0.08em] md:text-7xl"
            >
              <Image
                src={logo}
                alt="Crello Logo"
                width={260}
                height={40}
              />
            </a>

            <p className="mt-7 max-w-sm leading-relaxed text-white/45">
              Software, AI and digital solutions for businesses ready to
              build, scale and transform.
            </p>

            <div className="mt-8 flex gap-3">
              {[
                {
                  icon: FaLinkedinIn,
                  href: "https://www.linkedin.com/company/crellotech/",
                },
                {
                  icon: FaInstagram,
                  href: "https://www.instagram.com/crellotech/",
                },
                {
                  icon: FaWhatsapp,
                  href: "https://wa.me/919479003560",
                },
              ].map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/65 transition-all hover:border-[#ff5c35] hover:bg-[#ff5c35] hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:col-span-7">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Explore
              </p>

              <div className="mt-6 flex flex-col gap-3 text-sm">
                {["Home", "About", "Services", "Work", "Process"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-white/65 transition-colors hover:text-white"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Services
              </p>

              <div className="mt-6 flex flex-col gap-3 text-sm">
                {[
                  "Software",
                  "Web",
                  "Mobile",
                  "AI Solutions",
                  "SEO",
                  "Automation",
                ].map((item) => (
                  <a
                    key={item}
                    href="#services"
                    className="text-white/65 transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Contact
              </p>

              <div className="mt-6 space-y-4 text-sm text-white/65">
                <a
                  href="mailto:info@crello.dev"
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Mail size={15} />
                  info@crello.dev
                </a>

                <div className="flex items-center gap-3">
                  <MapPin size={15} />
                  India
                </div>

                <a
                  href="tel:+919479003560"
                  className="flex items-center gap-3 transition-opacity hover:opacity-70"
                >
                  <Phone size={15} />
                  +91 9479003560
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-5 text-[10px] uppercase tracking-[0.15em] text-white/30 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Crello. All rights reserved.</p>

            <div className="flex gap-6">
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
            </div>
          </div>

          <div className="mt-0 overflow-hidden">
            <p className="translate-y-[18%] text-center text-[25vw] font-black leading-[0.7] tracking-[-0.09em] text-white/[0.04]">
              crello
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}