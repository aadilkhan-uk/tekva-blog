"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuVariants = {
        closed: { opacity: 0, x: "100%" },
        open: { opacity: 1, x: 0 },
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm"
            >
                <Link href="/" className="text-2xl font-bold tracking-tighter z-50 relative">
                    TEKVA
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-gray-400">
                    <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
                    <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                    <Link href="/consultancy" className="hover:text-white transition-colors">Consultancy</Link>
                </div>

                <Link href="/about" className="hidden md:block border border-white/20 px-6 py-2 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Learn More
                </Link>

                {/* Mobile Hamburger */}
                <button onClick={toggleMenu} className="md:hidden z-50 relative text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"}
                        />
                    </svg>
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        <Link href="/courses" onClick={toggleMenu} className="text-2xl font-bold tracking-widest uppercase hover:text-primary transition-colors">
                            Courses
                        </Link>
                        <Link href="/blog" onClick={toggleMenu} className="text-2xl font-bold tracking-widest uppercase hover:text-primary transition-colors">
                            Blog
                        </Link>
                        <Link href="/consultancy" onClick={toggleMenu} className="text-2xl font-bold tracking-widest uppercase hover:text-primary transition-colors">
                            Consultancy
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
