import { defineArrayMember, defineField, defineType } from "sanity";

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
    defineField({ name: "pageTitle", title: "Default Page Title", type: "string" }),
    defineField({ name: "pageSubtitle", title: "Default Page Subtitle", type: "string" }),
    defineField({ name: "buildTitle", title: "Build Tab Title", type: "string" }),
    defineField({ name: "buildDescription", title: "Build Tab Description", type: "text", rows: 2 }),
    defineField({ name: "buildButtonLabel", title: "Build Tab Button Label", type: "string" }),
    defineField({ name: "sidesTitle", title: "Sides Section Title", type: "string" }),
    defineField({ name: "drinksTitle", title: "Drinks Section Title", type: "string" }),
    defineField({ name: "reservationTabTitle", title: "Reservation Tab Title", type: "string" }),
    defineField({ name: "reserveButtonLabel", title: "Reservation Submit Label", type: "string" }),
    defineField({ name: "checkoutButtonLabel", title: "Checkout Button Label", type: "string" }),
    defineField({ name: "emptyCartTitle", title: "Empty Cart Title", type: "string" }),
    defineField({ name: "emptyCartDescription", title: "Empty Cart Description", type: "text", rows: 2 }),
    defineField({ name: "deliveryPillLabel", title: "Delivery Pill Label", type: "string" }),
    defineField({ name: "quickOrderSliderLabel", title: "Quick Order Slider Label", type: "string" }),
    defineField({ name: "orderSuccessMessage", title: "Order Success Message", type: "text", rows: 2 }),
    defineField({ name: "pickupOtpPrefix", title: "Pickup OTP Prefix", type: "string" }),
    defineField({ name: "footerDescription", title: "Footer Description", type: "text", rows: 2 }),
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
        defineArrayMember({
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
      name: "sideItems",
      title: "Side Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "id", title: "ID", type: "string" }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "price", title: "Price", type: "string" }),
            defineField({ name: "image", title: "Image URL", type: "url" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "drinkItems",
      title: "Drink Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "id", title: "ID", type: "string" }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "price", title: "Price", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "reservationSlots",
      title: "Reservation Slots",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineArrayMember({
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
