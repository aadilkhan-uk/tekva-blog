import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { coursesQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CoursesPage() {
    const courses = await client.fetch(coursesQuery);

    return (
        <div className="min-h-screen bg-background text-foreground p-8 pt-24">
            <h1 className="text-4xl font-bold mb-12 tracking-tighter">Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course: any) => (
                    <Link href={`/courses/${course.slug?.current}`} key={course._id} className="group block border border-white/10 rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                        {course.image && (
                            <div className="relative h-48 w-full">
                                <Image
                                    src={urlFor(course.image).url()}
                                    alt={course.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{course.title}</h2>
                            <p className="text-gray-400 text-sm line-clamp-3">{course.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
