import { defineField, defineType } from "sanity";

export default defineType({
  name: "restaurantPage",
  title: "Restaurant Page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string" }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (rule) => rule.required(),
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
      name: "signatureDishes",
      title: "Signature Dishes",
      type: "array",
      of: [
        defineField({
          name: "signatureDish",
          title: "Signature Dish",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
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
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineField({
          name: "testimonial",
          title: "Testimonial",
          type: "object",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
            defineField({ name: "guest", title: "Guest", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "reservationTitle", title: "Reservation Title", type: "string" }),
    defineField({
      name: "reservationDescription",
      title: "Reservation Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "heroTitle",
      media: "heroImage",
    },
    prepare(selection) {
      return {
        title: selection.title || "Restaurant Page",
        media: selection.media,
      };
    },
  },
});
