"use client"
import { groq } from 'next-sanity';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react'
import ModalButton from '@/components/ModalButton'
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import DefinitionsModal from '@/components/DefinitionsModal';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, Fragment, use } from 'react';
import { client } from '@/sanity/lib/client';
import { chapterQuery } from '@/sanity/lib/queries';

type Props = {
    params: Promise<{
        slug: string;
        chapterSlug: string;
    }>;
};

export default function ChapterPage({ params }: Props) {
    const { slug, chapterSlug } = use(params);
    const [chapter, setChapter] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Modal state lifted here
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchChapter = async () => {
            const data = await client.fetch(chapterQuery, { chapterSlug });
            if (data) {
                setChapter(data);
            }
            setIsLoading(false);
        };
        fetchChapter();
    }, [chapterSlug]);

    if (!isLoading && !chapter) {
        notFound();
    }

    if (isLoading) {
        return <div className="min-h-screen bg-[#050511] flex items-center justify-center text-white">Loading...</div>;
    }

    // Track highlighted terms for this render pass to ensure only one highlight per term
    const highlightedTerms = new Set<string>();

    const openModalWithTerm = (term: string) => {
        setSearchQuery(term);
        setIsModalOpen(true);
    };

    // Text replacement function
    const highlightDefinitions = (text: string) => {
        if (!chapter.course?.definitions) return text;

        const definedTerms = chapter.course.definitions.map((d: any) => d.title);
        if (definedTerms.length === 0) return text;

        // Create a regex to find terms (case insensitive, whole word)
        const pattern = new RegExp(`\\b(${definedTerms.join('|')})\\b`, 'gi');

        const parts = text.split(pattern);

        return parts.map((part, i) => {
            const match = definedTerms.find((term: string) => term.toLowerCase() === part.toLowerCase());
            if (match) {
                const lowerTerm = match.toLowerCase();
                // Only highlight if not already highlighted in this render
                if (!highlightedTerms.has(lowerTerm)) {
                    highlightedTerms.add(lowerTerm);
                    return (
                        <span
                            key={i}
                            onClick={() => openModalWithTerm(match)}
                            className="cursor-pointer text-primary underline decoration-dotted underline-offset-4 hover:text-primary/80 transition-colors"
                        >
                            {part}
                        </span>
                    );
                }
            }
            return <Fragment key={i}>{part}</Fragment>;
        });
    };

    const components = {
        types: {
            image: ({ value }: any) => {
                return (
                    <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
                        <Image
                            src={urlFor(value).url()}
                            alt={value.alt || 'Chapter Image'}
                            fill
                            className="object-contain"
                        />
                    </div>
                );
            },
            html: ({ value }: any) => {
                const code = value.code || ''
                return <div dangerouslySetInnerHTML={{ __html: code }} className="my-6" />
            },
            modalButton: ModalButton,
        },
        block: {
            normal: ({ children }: any) => {
                return (
                    <p className="mb-6 leading-relaxed text-gray-300">
                        {Array.isArray(children)
                            ? children.map((child: any, i: number) => {
                                if (typeof child === 'string') {
                                    return <Fragment key={i}>{highlightDefinitions(child)}</Fragment>;
                                }
                                return <Fragment key={i}>{child}</Fragment>;
                            })
                            : children}
                    </p>
                )
            },
            h1: ({ children }: any) => <h1 className="text-4xl font-bold mb-6 text-white">{children}</h1>,
            h2: ({ children }: any) => <h2 className="text-3xl font-bold mb-4 mt-8 text-white">{children}</h2>,
            h3: ({ children }: any) => <h3 className="text-2xl font-semibold mb-3 mt-6 text-white">{children}</h3>,
            blockquote: ({ children }: any) => (
                <blockquote className="border-l-4 border-primary pl-4 my-8 italic text-gray-400">
                    {children}
                </blockquote>
            ),
        },
        list: {
            bullet: ({ children }: any) => (
                <ul className="list-disc pl-6 my-4 space-y-2 text-gray-300">{children}</ul>
            ),
            number: ({ children }: any) => (
                <ol className="list-decimal pl-6 my-4 space-y-2 text-gray-300">{children}</ol>
            ),
        },
        listItem: {
            bullet: ({ children }: any) => (
                <li className="pl-1">
                    {Array.isArray(children)
                        ? children.map((child: any, i: number) => {
                            if (typeof child === 'string') {
                                return <Fragment key={i}>{highlightDefinitions(child)}</Fragment>;
                            }
                            return <Fragment key={i}>{child}</Fragment>;
                        })
                        : children}
                </li>
            ),
            number: ({ children }: any) => (
                <li className="pl-1">
                    {Array.isArray(children)
                        ? children.map((child: any, i: number) => {
                            if (typeof child === 'string') {
                                return <Fragment key={i}>{highlightDefinitions(child)}</Fragment>;
                            }
                            return <Fragment key={i}>{child}</Fragment>;
                        })
                        : children}
                </li>
            ),
        },
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Link href={`/course/${slug}`} className="text-primary hover:underline mb-8 inline-block">
                &larr; Back to Course
            </Link>

            <article className="prose prose-invert prose-lg max-w-none">
                <h1 className="text-4xl font-bold mb-8 tracking-tighter">{chapter.title}</h1>

                {chapter.goals && chapter.goals.length > 0 && (
                    <div className="my-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            Chapter Goals
                        </h2>
                        <ul className="space-y-3">
                            {chapter.goals.map((goal: string, index: number) => (
                                <li key={index} className="flex items-start gap-3 text-gray-300">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>{goal}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <PortableText value={chapter.content} components={components} />
            </article>

            {/* Chapter Navigation */}
            {chapter.course?.chapters && (
                <div className="flex items-center justify-between mt-12 mb-20 border-t border-white/10 pt-8">
                    {(() => {
                        const currentChapterIndex = chapter.course.chapters.findIndex(
                            (c: any) => c.slug.current === chapterSlug
                        );

                        const prevChapter = chapter.course.chapters[currentChapterIndex - 1];
                        const nextChapter = chapter.course.chapters[currentChapterIndex + 1];

                        return (
                            <>
                                <div>
                                    {prevChapter && (
                                        <Link
                                            href={`/courses/${slug}/${prevChapter.slug.current}`}
                                            className="group flex flex-col items-start gap-2"
                                        >
                                            <span className="text-gray-400 text-sm group-hover:text-primary transition-colors">
                                                ← Previous Chapter
                                            </span>
                                            <span className="font-semibold text-white group-hover:text-primary transition-colors">
                                                {prevChapter.title}
                                            </span>
                                        </Link>
                                    )}
                                </div>

                                <div>
                                    {nextChapter && (
                                        <Link
                                            href={`/courses/${slug}/${nextChapter.slug.current}`}
                                            className="group flex flex-col items-end gap-2 text-right"
                                        >
                                            <span className="text-gray-400 text-sm group-hover:text-primary transition-colors">
                                                Next Chapter →
                                            </span>
                                            <span className="font-semibold text-white group-hover:text-primary transition-colors">
                                                {nextChapter.title}
                                            </span>
                                        </Link>
                                    )}
                                </div>
                            </>
                        );
                    })()}
                </div>
            )}

            <DefinitionsModal
                definitions={chapter.course?.definitions}
                externalControl={{
                    isOpen: isModalOpen,
                    onOpen: () => setIsModalOpen(true),
                    onClose: () => setIsModalOpen(false),
                    searchQuery: searchQuery,
                    onSearchChange: setSearchQuery,
                }}
            />
        </div>
    );
}
