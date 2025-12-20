import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'chapter',
    title: 'Chapter',
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
            name: 'goals',
            title: 'Chapter Goals',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
                // Add video support if needed, usually via a plugin or just a url field for now
                {
                    type: 'object',
                    name: 'video',
                    title: 'Video',
                    fields: [
                        {
                            name: 'url',
                            title: 'YouTube/Vimeo URL',
                            type: 'url'
                        }
                    ]
                },
                { type: 'html' },
                { type: 'modalButton' },
            ],
        }),
    ],
})
