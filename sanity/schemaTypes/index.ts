import { type SchemaTypeDefinition } from 'sanity'
import course from './course'
import chapter from './chapter'
import post from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [course, chapter, post],
}
