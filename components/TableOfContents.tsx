"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, List, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Heading {
    id: string;
    text: string;
    level: "h3" | "h4";
}

interface Chapter {
    title: string;
    slug: { current: string };
}

interface TableOfContentsProps {
    headings: Heading[];
    chapters?: Chapter[];
    currentChapterSlug?: string;
}

export default function TableOfContents({ headings, chapters, currentChapterSlug }: TableOfContentsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isChaptersOpen, setIsChaptersOpen] = useState(false);

    if (!headings || headings.length === 0) {
        return null;
    }

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            // Optional: Close on click on mobile? keeping it open for now as requested "pop in and out"
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-primary/20 hover:bg-primary/40 text-primary backdrop-blur-md border-l border-t border-b border-primary/30 p-2 rounded-l-md transition-all duration-300 shadow-lg"
                aria-label="Toggle Table of Contents"
            >
                {isOpen ? <ChevronRight size={24} /> : <List size={24} />}
            </button>

            {/* Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-80 bg-[#050511]/95 backdrop-blur-xl border-l border-white/10 z-30 shadow-2xl overflow-y-auto"
                    >
                        <div className="p-6 pt-24 text-white">
                            <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">
                                On this page
                            </h2>
                            <nav className="flex flex-col gap-3">
                                {headings.map((heading, index) => (
                                    <button
                                        key={index}
                                        onClick={() => scrollToHeading(heading.id)}
                                        className={`text-left text-sm transition-colors duration-200 hover:text-primary ${heading.level === "h3"
                                            ? "font-semibold text-gray-200"
                                            : "pl-4 text-gray-400 font-normal"
                                            }`}
                                    >
                                        {heading.text}
                                    </button>
                                ))}
                            </nav>

                            {/* Chapters Section */}
                            {chapters && chapters.length > 0 && (
                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <button
                                        onClick={() => setIsChaptersOpen(!isChaptersOpen)}
                                        className="flex items-center justify-between w-full text-left mb-6 group"
                                    >
                                        <span className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                            Other Chapters
                                        </span>
                                        {isChaptersOpen ? (
                                            <ChevronDown size={22} className="text-gray-400 group-hover:text-primary transition-transform" />
                                        ) : (
                                            <ChevronRight size={22} className="text-gray-400 group-hover:text-primary transition-transform" />
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {isChaptersOpen && (
                                            <motion.nav
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex flex-col gap-3 overflow-hidden"
                                            >
                                                {chapters.map((chapter, index) => {
                                                    const isCurrent = currentChapterSlug === chapter.slug.current;
                                                    return (
                                                        <Link
                                                            key={index}
                                                            href={chapter.slug.current}
                                                            className={`text-sm transition-colors duration-200 block ${isCurrent
                                                                ? "text-primary font-semibold cursor-default"
                                                                : "text-gray-400 hover:text-white"
                                                                }`}
                                                            onClick={(e) => {
                                                                if (isCurrent) e.preventDefault();
                                                            }}
                                                        >
                                                            {chapter.title}
                                                        </Link>
                                                    );
                                                })}
                                            </motion.nav>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
