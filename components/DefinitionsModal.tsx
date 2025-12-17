"use client"
import { useState } from 'react';
import { Info, X } from 'lucide-react';

interface Definition {
    title: string;
    description: string;
}

interface DefinitionsModalProps {
    definitions?: Definition[];
}

export default function DefinitionsModal({ definitions }: DefinitionsModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!definitions || definitions.length === 0) {
        return null;
    }

    return (
        <>
            {/* Info Icon Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-200"
                aria-label="View Definitions"
            >
                <Info size={24} />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

                    {/* Modal Content */}
                    <div className="relative bg-[#050511] border border-white/10 rounded-xl w-full max-w-lg max-h-[80vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#050511]">
                            <h2 className="text-xl font-bold text-white">Course Definitions</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Definitions List */}
                        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] space-y-6">
                            {definitions.map((def, index) => (
                                <div key={index} className="space-y-2">
                                    <h3 className="text-lg font-semibold text-primary">{def.title}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{def.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
