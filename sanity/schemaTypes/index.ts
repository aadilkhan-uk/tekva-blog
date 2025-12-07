import { type SchemaTypeDefinition } from 'sanity'
import course from './course'
import chapter from './chapter'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [course, chapter],
}
