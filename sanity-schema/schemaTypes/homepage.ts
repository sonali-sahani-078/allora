import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroHighlight",
      title: "Hero Highlight",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "process",
      title: "Process",
      type: "array",
      of: [
        defineArrayMember({
          title: "Process Item",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineArrayMember({
          title: "Stat Item",
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "featuredPizzas",
      title: "Featured Pizzas",
      type: "array",
      of: [
        defineArrayMember({
          title: "Featured Pizza",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "price", title: "Price", type: "string" }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
            }),
          ],
        }),
      ],
    }),
    defineField({ name: "ctaTitle", title: "CTA Title", type: "string" }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "heroTitle",
      media: "heroImage",
    },
    prepare(selection: { title?: string; media?: unknown }) {
      return {
        title: selection.title || "Homepage",
        media: selection.media,
      };
    },
  },
});
