import { useCurrentEditor } from "@tiptap/react";
import { toggleFormatacao } from "../../utils/toggleFormatacoes";
import { useState } from "react";
import { BotaoBarraDeOpcoes } from "./BotaoBarraDeOpcoes";

export function SelectFontSize() {
  const [showOptions, setShowOptions] = useState(false);
  const [fontSizeState, setFontSizeState] = useState("16px");
  const { editor } = useCurrentEditor();
  if (!editor) return;

  const setFontSize = (tamanho: string) =>
    toggleFormatacao(editor, "setFontSize", tamanho);

  function changeFontSize(fontSize: string) {
    setShowOptions(false);
    setFontSizeState(fontSize);
    setFontSize(fontSize)();
  }

  return (
    <div style={{ position: "relative" }}>
      <BotaoBarraDeOpcoes
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        {fontSizeState}
      </BotaoBarraDeOpcoes>
      {showOptions && (
        <div
          style={{
            position: "absolute",
            zIndex: "99",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <BotaoBarraDeOpcoes onClick={() => changeFontSize("16px")}>
            16px
          </BotaoBarraDeOpcoes>
          <BotaoBarraDeOpcoes onClick={() => changeFontSize("20px")}>
            20px
          </BotaoBarraDeOpcoes>
          <BotaoBarraDeOpcoes onClick={() => changeFontSize("24px")}>
            24px
          </BotaoBarraDeOpcoes>
        </div>
      )}
    </div>
  );
}
