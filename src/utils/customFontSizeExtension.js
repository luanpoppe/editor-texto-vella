import { Mark, mergeAttributes } from "@tiptap/core";

export const FontSize = Mark.create({
  name: "fontSize",

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: (element) => element.style.fontSize.replace("px", ""),
        renderHTML: (attributes) => {
          if (!attributes.size) return {};
          return { style: `font-size: ${attributes.size}px` };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[style]" }];
  },

  renderHTML({ attributes }) {
    return ["span", mergeAttributes(attributes), 0];
  },

  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ chain }) => {
          console.log("size: ", size);

          return chain().setMark(this.name, { size }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().unsetMark(this.name).run();
        },
    };
  },
});
