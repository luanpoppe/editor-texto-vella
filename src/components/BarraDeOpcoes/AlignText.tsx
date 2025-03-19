import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
} from "react-icons/fa6";
import { BotaoBarraDeOpcoes } from "./BotaoBarraDeOpcoes";
import { toggleFormatacao } from "@/utils/toggleFormatacoes";
import { useCurrentEditor } from "@tiptap/react";

export function AlignTextBarraDeOpcoes() {
  const { editor } = useCurrentEditor();
  if (!editor) return;
  const setTextAlign = (posicao: string) =>
    toggleFormatacao(editor, "setTextAlign", posicao);

  return (
    <>
      <BotaoBarraDeOpcoes onClick={setTextAlign("justify")}>
        <FaAlignJustify />
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes onClick={setTextAlign("left")}>
        <FaAlignLeft />
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes onClick={setTextAlign("center")}>
        <FaAlignCenter />
      </BotaoBarraDeOpcoes>
      <BotaoBarraDeOpcoes onClick={setTextAlign("right")}>
        <FaAlignRight />
      </BotaoBarraDeOpcoes>
    </>
  );
}
