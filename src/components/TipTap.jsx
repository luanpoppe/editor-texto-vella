// src/Tiptap.tsx
import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { getChatGPTAnswer } from "../utils/openAI";
import { BarraDeOpcoes } from "./BarraDeOpcoes";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Typography from "@tiptap/extension-typography";
import { FontSize } from "../utils/customFontSizeExtension";
import TextAlign from "@tiptap/extension-text-align";

// define your extension array
const extensions = [
  StarterKit,
  Underline,
  Link,
  TextStyle,
  Color,
  Typography,
  FontSize,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    defaultAlignment: "left",
  }),
];

const content = "<h1>olá meu pcero</h1>";

const Tiptap = () => {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={<BarraDeOpcoes />}
      onUpdate={(e) => console.log(e)}
    >
      <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
      <BubbleMenuWithEditor />
    </EditorProvider>
  );
};

export default Tiptap;

export function BubbleMenuWithEditor() {
  const { editor } = useCurrentEditor();

  return (
    <BubbleMenu editor={null}>
      <div>
        <button
          onClick={async () => {
            const { from, to } = editor.state.selection;
            const text = editor.state.doc.textBetween(from, to, " ");
            console.log("text: ", text);
            editor.commands.insertContentAt(to, "<p>Carregando...</p>");
            const gptAnswer = await getChatGPTAnswer(text);
            editor.commands.undo();

            editor.commands.insertContentAt(
              { from: to, to: to },
              `${gptAnswer}`
            );
            editor.chain().focus();

            // editor.state.selection.content().toJSON()
            // console.log("CADE AQUI OLÁ", editor.getJSON());
          }}
        >
          GPTinho
        </button>
        <button>Botão 2</button>
      </div>
    </BubbleMenu>
  );
}
