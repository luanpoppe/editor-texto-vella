// src/Tiptap.tsx
import { useCurrentEditor } from "@tiptap/react";
import { toggleFormatacao } from "../utils/toggleFormatacoes";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListOl,
  FaListUl,
} from "react-icons/fa6";
import { FontSizeSelector } from "./SelectFontSize";

export function BarraDeOpcoes() {
  const { editor } = useCurrentEditor();
  const toggleBold = toggleFormatacao(editor, "toggleBold");
  const toggleItalic = toggleFormatacao(editor, "toggleItalic");
  const toggleUnderline = toggleFormatacao(editor, "toggleUnderline");
  const toggleStrike = toggleFormatacao(editor, "toggleStrike");
  const toggleBulletList = toggleFormatacao(editor, "toggleBulletList");
  const toggleOrderedList = toggleFormatacao(editor, "toggleOrderedList");
  const toggleHeading = (level) =>
    toggleFormatacao(editor, "toggleHeading", { level });

  const setTextAlign = (posicao) =>
    toggleFormatacao(editor, "setTextAlign", posicao);

  const horizontalRow = toggleFormatacao(editor, "setHorizontalRule");
  const setColor = toggleFormatacao(editor, "setColor", "#958DF1");
  const unsetColor = toggleFormatacao(editor, "unsetColor");

  return (
    <div style={{ marginBottom: "3rem" }}>
      <button onClick={toggleBold}>
        <FaBold />
      </button>
      <button onClick={() => toggleItalic()}>
        <FaItalic />
      </button>
      <button onClick={() => toggleUnderline()}>
        <FaUnderline />
      </button>
      <button onClick={() => toggleStrike()}>
        <FaStrikethrough />
      </button>
      <button onClick={() => toggleOrderedList()}>
        <FaListOl />
      </button>
      <button onClick={() => toggleBulletList()}>
        <FaListUl />
      </button>
      <button onClick={toggleHeading(1)}>Heading 1</button>
      <button onClick={toggleHeading(2)}>Heading 2</button>
      <button onClick={toggleHeading(3)}>Heading 3</button>

      <button onClick={horizontalRow}>LinhaHorizontal</button>

      <button onClick={setColor}>Adicionar cor</button>
      <button onClick={unsetColor}>Remover qualquer cor</button>

      <button onClick={setTextAlign("center")}>Centralizar</button>
      <button onClick={setTextAlign("left")}>Esquerda</button>
      <button onClick={setTextAlign("right")}>Direita</button>
      <button onClick={setTextAlign("justify")}>Justificar</button>

      {/* Mudar tamanho da fonte abaixo ainda não funcionando --> Ver como cria uma custom extension para isso */}
      {/* <FontSizeSelector /> */}
      {/* <button onClick={() => editor.chain().focus().setFontSize(32).run()}>
        Texto maior
      </button> */}
    </div>
  );
}
