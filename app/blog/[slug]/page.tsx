import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { postQuery } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

const components = {
    types: {
        image: ({ value }: any) => {
            return (
                <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Blog Image'}
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
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await client.fetch(postQuery, { slug });

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8 pt-24 max-w-3xl mx-auto">
            <Link href="/blog" className="text-sm text-gray-500 hover:text-white mb-8 block">← Back to Blog</Link>

            <article className="prose prose-invert prose-lg max-w-none">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">{post.title}</h1>
                <p className="text-gray-400 mb-8">
                    {new Date(post.publishedAt).toLocaleDateString()}
                </p>

                {post.mainImage && (
                    <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
                        <Image
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                )}

                <PortableText value={post.body} components={components} />
            </article>
        </div>
    );
}
