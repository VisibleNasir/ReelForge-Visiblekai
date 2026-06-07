"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-zinc-800 bg-black">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-5">
          {/* Brand */}
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-1"
          >
            <h3 className="text-2xl font-bold text-white">ReelForge</h3>

            <p className="mt-4 text-sm text-zinc-500">
              Turn long-form podcasts into viral clips with AI-powered editing,
              subtitles, and content automation.
            </p>

            <p className="mt-6 text-sm text-zinc-600">
              © {new Date().getFullYear()} ReelForge. All rights reserved.
            </p>
          </motion.div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Content Studio", "My Clips"],
            },
            {
              title: "Resources",
              links: ["Blog", "Testimonials", "Documentation", "Support"],
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
            },
            {
              title: "Social",
              links: ["X / Twitter", "LinkedIn", "YouTube", "Discord"],
            },
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <h4 className="mb-4 font-semibold text-white">{section.title}</h4>

              <div className="space-y-3">
                {section.links.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block text-zinc-400 transition hover:text-white"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Giant Background Text */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        animate={{ y: [0, -14, 0] }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 1,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true }}
        className="pointer-events-none absolute inset-x-0 bottom-[-100px] flex justify-center overflow-hidden"
      >
        <motion.h1
          animate={{
            opacity: [0.08, 0.14, 0.08],
            scale: [1, 1.015, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            select-none
            whitespace-nowrap
            text-[140px]
            font-black
            tracking-tighter
            text-white
            md:text-[260px]
            lg:text-[340px]
          "
        >
          ReelForge
        </motion.h1>
      </motion.div>
    </footer>
  );
}