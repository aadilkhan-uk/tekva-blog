import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'course',
    title: 'Course',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'chapters',
            title: 'Chapters',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'chapter' } }],
        }),
        defineField({
            name: 'definitions',
            title: 'Definitions',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Term' },
                        { name: 'description', type: 'text', title: 'Definition' },
                    ],
                },
            ],
        }),
    ],
})
