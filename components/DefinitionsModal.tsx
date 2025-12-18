"use client";

import { useState, useMemo } from 'react';
import { Info, X, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface Definition {
    title: string;
    description: string;
}

interface DefinitionsModalProps {
    definitions?: Definition[];
    externalControl?: {
        isOpen: boolean;
        onClose: () => void;
        onOpen: () => void;
        searchQuery: string;
        onSearchChange: (query: string) => void;
    };
}

export default function DefinitionsModal({ definitions, externalControl }: DefinitionsModalProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [internalSearchQuery, setInternalSearchQuery] = useState('');
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Use external control if provided, otherwise fallback to internal state
    const isOpen = externalControl ? externalControl.isOpen : internalIsOpen;
    const setIsOpen = externalControl
        ? (open: boolean) => open ? externalControl.onOpen() : externalControl.onClose()
        : setInternalIsOpen;

    const searchQuery = externalControl ? externalControl.searchQuery : internalSearchQuery;
    const setSearchQuery = externalControl ? externalControl.onSearchChange : setInternalSearchQuery;

    const filteredDefinitions = useMemo(() => {
        if (!definitions) return [];
        return definitions.filter((def) =>
            def.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [definitions, searchQuery]);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

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
                    <div className="relative bg-[#050511] border border-white/10 rounded-xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 bg-[#050511] shrink-0">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">Course Definitions</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search terms..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                        </div>

                        {/* Definitions List */}
                        <div className="p-6 overflow-y-auto">
                            {filteredDefinitions.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredDefinitions.map((def, index) => (
                                        <div
                                            key={index}
                                            className="border border-white/5 rounded-lg overflow-hidden bg-white/5"
                                        >
                                            <button
                                                onClick={() => toggleExpand(index)}
                                                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                                            >
                                                <span className="font-semibold text-primary">{def.title}</span>
                                                {expandedIndex === index ? (
                                                    <ChevronUp size={18} className="text-gray-400" />
                                                ) : (
                                                    <ChevronDown size={18} className="text-gray-400" />
                                                )}
                                            </button>

                                            {expandedIndex === index && (
                                                <div className="px-4 pb-4 pt-3 text-gray-300 text-sm leading-relaxed animate-in slide-in-from-top-2 duration-200">
                                                    {def.description}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-8">No definitions found for "{searchQuery}"</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
