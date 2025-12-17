import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { chapterQuery } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

export const revalidate = 60;

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
            return (
                <div dangerouslySetInnerHTML={{ __html: value.code }} className="my-8" />
            );
        },
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc pl-6 my-4 space-y-2 text-gray-300">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal pl-6 my-4 space-y-2 text-gray-300">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: any) => <li className="pl-1">{children}</li>,
        number: ({ children }: any) => <li className="pl-1">{children}</li>,
    },
    block: {
        normal: ({ children }: any) => <p className="mb-6 leading-relaxed text-gray-200">{children}</p>,
        h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-4">{children}</h3>,
        blockquote: ({ children }: any) => <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-gray-300">{children}</blockquote>,
    },
};

export default async function ChapterPage({ params }: { params: Promise<{ slug: string; chapterSlug: string }> }) {
    const { slug, chapterSlug } = await params;
    const chapter = await client.fetch(chapterQuery, { chapterSlug });

    if (!chapter) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8 pt-24 max-w-3xl mx-auto">
            <Link href={`/courses/${slug}`} className="text-sm text-gray-500 hover:text-white mb-8 block">← Back to Course</Link>

            <article className="prose prose-invert prose-lg max-w-none">
                <h1 className="text-4xl font-bold mb-8 tracking-tighter">{chapter.title}</h1>
                <PortableText value={chapter.content} components={components} />
            </article>
        </div>
    );
}
