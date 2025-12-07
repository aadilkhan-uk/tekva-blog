import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { postsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

export default async function BlogPage() {
    const posts = await client.fetch(postsQuery);

    return (
        <div className="min-h-screen bg-background text-foreground p-8 pt-24">
            <h1 className="text-4xl font-bold mb-12 tracking-tighter">Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                    <Link href={`/blog/${post.slug.current}`} key={post._id} className="group block border border-white/10 rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                        {post.mainImage && (
                            <div className="relative h-48 w-full">
                                <Image
                                    src={urlFor(post.mainImage).url()}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}
                        <div className="p-6">
                            <p className="text-xs text-primary mb-2 uppercase tracking-widest">
                                {new Date(post.publishedAt).toLocaleDateString()}
                            </p>
                            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                            <p className="text-gray-400 text-sm line-clamp-3">{post.excerpt}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
