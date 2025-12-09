import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'html',
    title: 'HTML Code',
    type: 'object',
    fields: [
        defineField({
            name: 'code',
            title: 'HTML Code',
            type: 'text',
            rows: 10,
        }),
    ],
})
