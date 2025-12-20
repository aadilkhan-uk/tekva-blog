import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { postQuery } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import ModalButton from '@/components/ModalButton';

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
        modalButton: ModalButton,
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
