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
                        className="object-cover"
                    />
                </div>
            );
        },
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
