"use client";

import { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface ModalButtonProps {
    value: {
        buttonText: string;
        modalContent: {
            code: string;
        };
    };
}

export default function ModalButton({ value }: ModalButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!value || !value.buttonText) {
        return null;
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-md transition-colors font-medium my-4"
            >
                {value.buttonText}
                <ExternalLink size={16} />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

                    {/* Modal Content */}
                    <div className="relative bg-[#050511] border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-[#050511] shrink-0 flex items-center justify-between rounded-t-xl">
                            <h3 className="text-lg font-semibold text-white">{value.buttonText}</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors p-1"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto text-gray-200">
                            {value.modalContent?.code ? (
                                <div dangerouslySetInnerHTML={{ __html: value.modalContent.code }} />
                            ) : (
                                <p className="text-gray-500 italic">No content available.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
