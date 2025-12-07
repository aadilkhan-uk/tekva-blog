import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
                    Democratizing <span className="text-primary">Machine Learning</span>
                </h1>

                <div className="prose prose-invert prose-lg max-w-none mb-16">
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                        At Tekva Solutions, our mission is simple: <strong>help anyone learn about Machine Learning, no matter their background.</strong>
                    </p>
                    <p className="text-gray-400">
                        We believe that the future of technology shouldn't be locked behind complex jargon and academic gatekeeping. We break down advanced concepts into simple, digestible pieces so you can understand not just the "how", but the "why".
                    </p>
                </div>

                <h2 className="text-3xl font-bold mb-8">How We Help</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <Link href="/courses" className="group p-8 border border-white/10 rounded-xl hover:border-primary/50 transition-colors bg-white/5 block">
                        <h3 className="text-2xl font-bold mb-4 text-primary group-hover:translate-x-2 transition-transform">Courses →</h3>
                        <p className="text-gray-400">
                            Structured learning paths designed to take you from zero to hero. Hands-on projects and clear explanations.
                        </p>
                    </Link>

                    <div className="p-8 border border-white/10 rounded-xl bg-white/5 opacity-50 cursor-not-allowed">
                        <h3 className="text-2xl font-bold mb-4 text-gray-500">Videos (Coming Soon)</h3>
                        <p className="text-gray-500">
                            Visual learners rejoice. High-quality video tutorials that walk you through code and concepts step-by-step.
                        </p>
                    </div>

                    <Link href="/blog" className="group p-8 border border-white/10 rounded-xl hover:border-primary/50 transition-colors bg-white/5 block">
                        <h3 className="text-2xl font-bold mb-4 text-primary group-hover:translate-x-2 transition-transform">Blogs →</h3>
                        <p className="text-gray-400">
                            Deep dives into specific topics, industry news, and quick tips to keep you updated with the fast-paced world of AI.
                        </p>
                    </Link>
                </div>

                <div className="text-center py-16 border-t border-white/10">
                    <h2 className="text-3xl font-bold mb-6">Start Learning Today</h2>
                    <p className="text-gray-400 mb-8">
                        Check out our latest course and begin your journey.
                    </p>
                    <Link
                        href="/courses"
                        className="inline-block bg-primary hover:bg-primary/80 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105"
                    >
                        Explore Courses
                    </Link>
                </div>
            </div>
        </div>
    );
}
