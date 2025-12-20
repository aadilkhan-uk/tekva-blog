import { type SchemaTypeDefinition } from 'sanity'
import course from './course'
import chapter from './chapter'
import post from './post'
import html from './html'
import modalButton from './modalButton'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [course, chapter, post, html, modalButton],
}
