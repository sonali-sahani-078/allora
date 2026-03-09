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
    defineField({ name: "heroBadge", title: "Hero Badge Text", type: "string" }),
    defineField({ name: "heroVideoUrl", title: "Hero Video URL", type: "url" }),
    defineField({ name: "heroVideoTag", title: "Hero Video Tag", type: "string" }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Hero Primary CTA Label", type: "string" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Hero Secondary CTA Label", type: "string" }),
    defineField({ name: "navOrderNowLabel", title: "Navbar Order Label", type: "string" }),
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
      name: "signatureHighlights",
      title: "Signature Highlights",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({ name: "craftedTitle", title: "Crafted Section Title", type: "string" }),
    defineField({ name: "experienceTitle", title: "Experience Section Title", type: "string" }),
    defineField({
      name: "experienceDescription",
      title: "Experience Section Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "experiencePillars",
      title: "Experience Pillars",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            defineField({ name: "meta", title: "Meta", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "processTitle", title: "Process Section Title", type: "string" }),
    defineField({ name: "processSubtitle", title: "Process Section Subtitle", type: "string" }),
    defineField({ name: "featuredTitle", title: "Featured Section Title", type: "string" }),
    defineField({ name: "featuredSubtitle", title: "Featured Section Subtitle", type: "string" }),
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
    defineField({ name: "chefTitle", title: "Chef Section Title", type: "string" }),
    defineField({ name: "chefQuote", title: "Chef Quote", type: "text", rows: 3 }),
    defineField({ name: "chefSign", title: "Chef Sign", type: "string" }),
    defineField({
      name: "chefMetrics",
      title: "Chef Metrics",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "editorialTitle", title: "Editorial Section Title", type: "string" }),
    defineField({
      name: "editorialDescription",
      title: "Editorial Section Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "editorialMoments",
      title: "Editorial Moments",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({ name: "studioTitle", title: "Studio Section Title", type: "string" }),
    defineField({
      name: "studioDescription",
      title: "Studio Section Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "serviceMoments",
      title: "Service Moments",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({ name: "weeklyTitle", title: "Weekly Section Title", type: "string" }),
    defineField({
      name: "weeklyDescription",
      title: "Weekly Section Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "weeklyEvents",
      title: "Weekly Events",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "day", title: "Day", type: "string" }),
            defineField({ name: "event", title: "Event", type: "string" }),
            defineField({ name: "time", title: "Time", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "testimonialsTitle", title: "Testimonials Section Title", type: "string" }),
    defineField({
      name: "testimonialsDescription",
      title: "Testimonials Section Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "newsletterTitle", title: "Newsletter Title", type: "string" }),
    defineField({ name: "newsletterDescription", title: "Newsletter Description", type: "text", rows: 2 }),
    defineField({ name: "newsletterPlaceholder", title: "Newsletter Email Placeholder", type: "string" }),
    defineField({ name: "newsletterButtonLabel", title: "Newsletter Button Label", type: "string" }),
    defineField({ name: "ctaTitle", title: "CTA Title", type: "string" }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "ctaPrimaryLabel", title: "CTA Primary Label", type: "string" }),
    defineField({ name: "ctaSecondaryLabel", title: "CTA Secondary Label", type: "string" }),
    defineField({ name: "footerBrandTitle", title: "Footer Brand Title", type: "string" }),
    defineField({ name: "footerTagline", title: "Footer Tagline", type: "string" }),
    defineField({ name: "footerCopyright", title: "Footer Copyright", type: "string" }),
  ],
  preview: {
    select: {
      title: "heroTitle",
      media: "heroImage",
    },
prepare(selection) {
  const { title, media } = selection

  return {
    title: title || "Homepage",
    media,
  }
}
  },
});
