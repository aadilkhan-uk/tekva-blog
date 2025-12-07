import Link from 'next/link';

export default function ConsultancyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
                    AI & ML <span className="text-primary">Consultancy</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-16 leading-relaxed">
                    We provide cutting-edge Machine Learning and Artificial Intelligence solutions tailored to your business needs. From data analysis to deploying complex models, we help you leverage the power of AI.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="p-8 border border-white/10 rounded-xl hover:border-primary/50 transition-colors bg-white/5">
                        <h3 className="text-2xl font-bold mb-4 text-primary">Predictive Analytics</h3>
                        <p className="text-gray-400 mb-4">
                            Forecast trends, customer behavior, and market shifts using advanced statistical models and machine learning algorithms.
                        </p>
                        <div className="text-sm text-gray-500 border-t border-white/10 pt-4">
                            <span className="text-white font-semibold block mb-1">Real-world Application:</span>
                            Retailers predicting stock shortages before they happen to optimize inventory.
                        </div>
                    </div>

                    <div className="p-8 border border-white/10 rounded-xl hover:border-primary/50 transition-colors bg-white/5">
                        <h3 className="text-2xl font-bold mb-4 text-primary">Natural Language Processing</h3>
                        <p className="text-gray-400 mb-4">
                            Automate customer support, analyze sentiment, and extract insights from unstructured text data with state-of-the-art NLP.
                        </p>
                        <div className="text-sm text-gray-500 border-t border-white/10 pt-4">
                            <span className="text-white font-semibold block mb-1">Real-world Application:</span>
                            Automating 24/7 customer support with intelligent chatbots that understand context.
                        </div>
                    </div>

                    <div className="p-8 border border-white/10 rounded-xl hover:border-primary/50 transition-colors bg-white/5">
                        <h3 className="text-2xl font-bold mb-4 text-primary">Computer Vision</h3>
                        <p className="text-gray-400 mb-4">
                            Implement image recognition, object detection, and visual inspection systems to automate visual tasks with high precision.
                        </p>
                        <div className="text-sm text-gray-500 border-t border-white/10 pt-4">
                            <span className="text-white font-semibold block mb-1">Real-world Application:</span>
                            Manufacturing plants detecting defects on the assembly line automatically in real-time.
                        </div>
                    </div>
                </div>

                <div className="text-center py-16 border-t border-white/10">
                    <h2 className="text-3xl font-bold mb-6">Ready to transform your business?</h2>
                    <p className="text-gray-400 mb-8">
                        Get in touch with us to discuss your project.
                    </p>
                    <a
                        href="mailto:tekvasolutions@gmail.com"
                        className="inline-block bg-primary hover:bg-primary/80 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105"
                    >
                        tekvasolutions@gmail.com
                    </a>
                </div>
            </div>
        </div>
    );
}
