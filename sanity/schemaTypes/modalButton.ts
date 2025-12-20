import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'modalButton',
    title: 'Modal Button',
    type: 'object',
    fields: [
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'modalContent',
            title: 'Modal Content (HTML)',
            type: 'html', // Re-using the existing html type
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'buttonText',
        },
        prepare({ title }) {
            return {
                title: title || 'Modal Button',
                subtitle: 'Click to edit content',
            }
        },
    },
})
