import { useCurrentEditor } from "@tiptap/react";
import { toggleFormatacao } from "../../utils/toggleFormatacoes";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListOl,
  FaListUl,
} from "react-icons/fa6";
import { BotaoBarraDeOpcoes } from "./BotaoBarraDeOpcoes";
import { SelectFontSize } from "./SelectFontSize";
import { SelectHeadings } from "./SelectHeading";

export function BarraDeOpcoes() {
  const { editor } = useCurrentEditor();
  if (!editor) return;
  const toggleBold = toggleFormatacao(editor, "toggleBold");
  const toggleItalic = toggleFormatacao(editor, "toggleItalic");
  const toggleUnderline = toggleFormatacao(editor, "toggleUnderline");
  const toggleStrike = toggleFormatacao(editor, "toggleStrike");
  const toggleBulletList = toggleFormatacao(editor, "toggleBulletList");
  const toggleOrderedList = toggleFormatacao(editor, "toggleOrderedList");

  const setTextAlign = (posicao: string) =>
    toggleFormatacao(editor, "setTextAlign", posicao);

  const horizontalRow = toggleFormatacao(editor, "setHorizontalRule");
  const setColor = toggleFormatacao(editor, "setColor", "#958DF1");
  const unsetColor = toggleFormatacao(editor, "unsetColor");

  return (
    <div
      style={{
        marginBottom: "2rem",
        backgroundColor: "white",
        borderRadius: "6px",
        border: "1px solid #cfcaca",
        height: "2.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <BotaoBarraDeOpcoes onClick={toggleBold}>
        <FaBold />
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes onClick={() => toggleItalic()}>
        <FaItalic />
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes onClick={() => toggleUnderline()}>
        <FaUnderline />
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes onClick={() => toggleStrike()}>
        <FaStrikethrough />
      </BotaoBarraDeOpcoes>

      <SeparadorVertical />

      <BotaoBarraDeOpcoes onClick={() => toggleOrderedList()}>
        <FaListOl />
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes onClick={() => toggleBulletList()}>
        <FaListUl />
      </BotaoBarraDeOpcoes>

      <SeparadorVertical />

      <SelectFontSize />

      <SelectHeadings />

      <BotaoBarraDeOpcoes onClick={horizontalRow}>
        LinhaHorizontal
      </BotaoBarraDeOpcoes>

      <BotaoBarraDeOpcoes onClick={setColor}>Adicionar cor</BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes onClick={unsetColor}>
        Remover qualquer cor
      </BotaoBarraDeOpcoes>

      <BotaoBarraDeOpcoes onClick={setTextAlign("center")}>
        Centralizar
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes onClick={setTextAlign("left")}>
        Esquerda
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes onClick={setTextAlign("right")}>
        Direita
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes onClick={setTextAlign("justify")}>
        Justificar
      </BotaoBarraDeOpcoes>

      {/* Mudar tamanho da fonte abaixo ainda não funcionando --> Ver como cria uma custom extension para isso */}
      {/* <FontSizeSelector /> */}
      {/* <BotaoBarraDeOpcoes onClick={() => editor.chain().focus().setFontSize(32).run()}>
        Texto maior
      </BotaoBarraDeOpcoes> */}
    </div>
  );
}

function SeparadorVertical() {
  return (
    <span
      style={{
        width: "2px",
        height: "70%",
        backgroundColor: "rgb(230, 224, 224)",
      }}
    ></span>
  );
}
