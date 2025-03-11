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

// define your extension array
const extensions = [StarterKit];

const content = "<h1>olá meu pcero</h1>";

const Tiptap = () => {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={<Outro />}
      onUpdate={(e) => console.log(e)}
    >
      <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
      <BubbleMenuWithEditor />
    </EditorProvider>
  );
};

export default Tiptap;

export function Outro() {
  const { editor } = useCurrentEditor();
  const hue = editor.getJSON();
  // console.log("hue: ", hue);
  return <div>OPAAAAAAAAAAAA</div>;
}

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
