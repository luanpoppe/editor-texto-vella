// src/Tiptap.tsx
import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Typography from "@tiptap/extension-typography";

import TextAlign from "@tiptap/extension-text-align";
import { getChatGPTAnswer } from "@/utils/openAI";
import FontSize from "@/utils/customFontSizeExtension";
import { BarraDeOpcoes } from "./BarraDeOpcoes/BarraDeOpcoes";
import FontFamily from "@tiptap/extension-font-family";
import { BubbleMenuWithEditor } from "./BubbleMenu";

// define your extension array
const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Underline,
  Link,
  TextStyle,
  Color,
  Typography,
  FontSize,
  FontFamily,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    defaultAlignment: "left",
  }),
];

const content = "<h2>Olá!!</h2><br><p>Texto qualquer</p>";

const Tiptap = () => {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={<BarraDeOpcoes />}
      // onUpdate={(e) => console.log(e.editor.isActive("bold"))}
      autofocus={false}
      editorProps={{
        attributes: {
          style: "font-family: Arial, sans-serif;", // Default font
        },
      }}
    >
      <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>

      <BubbleMenuWithEditor />
    </EditorProvider>
  );
};

export default Tiptap;
