// import { Mark, mergeAttributes } from "@tiptap/core";

// export const FontSize = Mark.create({
//   name: "fontSize",

//   addAttributes() {
//     return {
//       size: {
//         default: null,
//         parseHTML: (element) => element.style.fontSize.replace("px", ""),
//         renderHTML: (attributes) => {
//           if (!attributes.size) return {};
//           return { style: `font-size: ${attributes.size}px` };
//         },
//       },
//     };
//   },

//   parseHTML() {
//     return [{ tag: "span[style]" }];
//   },

//   renderHTML({ attributes }) {
//     return ["span", mergeAttributes(attributes), 0];
//   },

//   addCommands() {
//     return {
//       setFontSize:
//         (size) =>
//         ({ chain }) => {
//           console.log("size: ", size);

//           return chain().setMark(this.name, { size }).run();
//         },
//       unsetFontSize:
//         () =>
//         ({ chain }) => {
//           return chain().unsetMark(this.name).run();
//         },
//     };
//   },
// });

import { Extension } from "@tiptap/core";
import "@tiptap/extension-text-style";

export const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph"],
        attributes: {
          class: {},
        },
      },
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run(),
    };
  },
});

export default FontSize;
