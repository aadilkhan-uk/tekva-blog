"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative selection:bg-primary selection:text-white">
      {/* Background Glow Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-secondary/40 rounded-full blur-[100px] pointer-events-none"
      />



      {/* Social Icons (Right) */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-40 text-gray-400"
      >
        <a href="https://x.com/TekvaSolutions" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
        </a>
        <a href="mailto:tekvasolutions@gmail.com" className="hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </a>
      </motion.div>

      {/* Main Content */}
      <main className="relative w-full h-screen flex items-center justify-center">

        {/* Central Sphere Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] z-10"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full relative"
          >
            <Image
              src="/hero-sphere.png"
              alt="3D Abstract Sphere"
              fill
              className="object-contain drop-shadow-[0_0_50px_rgba(109,40,217,0.5)]"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Large Typography */}
        <div className="relative z-20 text-center mix-blend-overlay">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 0.9 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[15vw] leading-[0.8] font-bold tracking-tighter text-white select-none"
          >
            TEKVA
          </motion.h1>
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-[15vw] leading-[0.8] font-bold tracking-tighter text-white select-none"
          >
            SOLUTIONS
          </motion.h2>
        </div>

        {/* Bottom Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-12 md:left-32 z-30"
        >
          <Link href="/about" className="flex items-center gap-4 mb-4 cursor-pointer group">
            <span className="text-sm font-bold tracking-widest uppercase group-hover:text-primary transition-colors">Learn More</span>
            <span className="w-12 h-[1px] bg-white group-hover:bg-primary transition-colors"></span>
            <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 right-12 md:right-32 max-w-xs text-right z-30 hidden md:block"
        >
          <div className="border-l-2 border-white pl-4 text-left">
            <p className="text-sm text-gray-400 leading-relaxed">
              Making Machine Learning accessible to everyone.
            </p>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
