import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { courseQuery } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const course = await client.fetch(courseQuery, { slug });

    if (!course) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8 pt-24 max-w-4xl mx-auto">
            <Link href="/courses" className="text-sm text-gray-500 hover:text-white mb-8 block">← Back to Courses</Link>

            <h1 className="text-5xl font-bold mb-6 tracking-tighter">{course.title}</h1>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">{course.description}</p>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Chapters</h2>
                {course.chapters?.map((chapter: any, index: number) => (
                    <Link
                        href={`/courses/${slug}/${chapter.slug.current}`}
                        key={chapter.slug.current}
                        className="block p-6 border border-white/10 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-4"
                    >
                        <span className="text-primary font-mono text-xl">{(index + 1).toString().padStart(2, '0')}</span>
                        <span className="text-lg font-medium">{chapter.title}</span>
                    </Link>
                ))}
                {!course.chapters && (
                    <p className="text-gray-500 italic">No chapters added yet.</p>
                )}
            </div>
        </div>
    );
}
