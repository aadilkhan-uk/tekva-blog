import { groq } from "next-sanity";

export const coursesQuery = groq`*[_type == "course" && defined(slug.current)] {
  _id,
  title,
  slug,
  description,
  image
}`;

export const courseQuery = groq`*[_type == "course" && slug.current == $slug][0] {
  title,
  description,
  image,
  chapters[]->{
    title,
    slug
  }
}`;

export const chapterQuery = groq`*[_type == "chapter" && slug.current == $chapterSlug][0] {
  title,
  content,
  "course": *[_type == "course" && references(^._id)][0] {
    definitions
  }
}`;

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  excerpt
}`;

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  title,
  publishedAt,
  mainImage,
  body
}`;
