import { useCurrentEditor } from "@tiptap/react";
import {
  checkEditorClassActive,
  toggleFormatacao,
} from "../../utils/toggleFormatacoes";
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
import { RxDividerHorizontal } from "react-icons/rx";
import { AlignTextBarraDeOpcoes } from "./AlignText";

export function BarraDeOpcoes() {
  const { editor } = useCurrentEditor();
  if (!editor) return;
  const toggleBold = toggleFormatacao(editor, "toggleBold");
  const toggleItalic = toggleFormatacao(editor, "toggleItalic");
  const toggleUnderline = toggleFormatacao(editor, "toggleUnderline");
  const toggleStrike = toggleFormatacao(editor, "toggleStrike");
  // const toggleBulletList = toggleFormatacao(editor, "toggleBulletList");
  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = toggleFormatacao(editor, "toggleOrderedList");

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
        height: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <BotaoBarraDeOpcoes
        className={checkEditorClassActive(editor, "bold")}
        onClick={toggleBold}
      >
        <FaBold />
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes
        className={checkEditorClassActive(editor, "italic")}
        onClick={toggleItalic}
      >
        <FaItalic />
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes
        className={checkEditorClassActive(editor, "underline")}
        onClick={toggleUnderline}
      >
        <FaUnderline />
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes
        className={checkEditorClassActive(editor, "strike")}
        onClick={toggleStrike}
      >
        <FaStrikethrough />
      </BotaoBarraDeOpcoes>

      <SeparadorVertical />

      <BotaoBarraDeOpcoes
        className={checkEditorClassActive(editor, "orderedList")}
        onClick={toggleOrderedList}
      >
        <FaListOl />
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes
        className={checkEditorClassActive(editor, "bulletList")}
        onClick={toggleBulletList}
      >
        <FaListUl />
      </BotaoBarraDeOpcoes>

      <SeparadorVertical />

      <SelectFontSize />
      <SelectHeadings />

      <SeparadorVertical />

      <BotaoBarraDeOpcoes onClick={horizontalRow}>
        <RxDividerHorizontal />
      </BotaoBarraDeOpcoes>

      <BotaoBarraDeOpcoes onClick={setColor}>Adicionar cor</BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes onClick={unsetColor}>
        Remover qualquer cor
      </BotaoBarraDeOpcoes>

      <SeparadorVertical />

      <AlignTextBarraDeOpcoes />
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
