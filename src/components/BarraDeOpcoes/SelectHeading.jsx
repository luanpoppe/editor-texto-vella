import { useCurrentEditor } from "@tiptap/react";
import { useState } from "react";
import { toggleFormatacao } from "../../utils/toggleFormatacoes";
import { BotaoBarraDeOpcoes } from "./BotaoBarraDeOpcoes";

export function SelectHeadings() {
  const [showOptions, setShowOptions] = useState(false);
  const [fontSizeState, setFontSizeState] = useState("16px");
  const { editor } = useCurrentEditor();

  const toggleHeading = (level) =>
    toggleFormatacao(editor, "toggleHeading", { level });

  function changeHeading(level) {
    setShowOptions(false);
    // setFontSizeState(fontSize);
    toggleHeading(level)();
  }

  return (
    <div style={{ position: "relative" }}>
      <BotaoBarraDeOpcoes
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        Títulos
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
          <BotaoBarraDeOpcoes onClick={() => changeHeading(1)}>
            Título 1
          </BotaoBarraDeOpcoes>
          <BotaoBarraDeOpcoes onClick={() => changeHeading(2)}>
            Título 2
          </BotaoBarraDeOpcoes>
          <BotaoBarraDeOpcoes onClick={() => changeHeading(3)}>
            Título 3
          </BotaoBarraDeOpcoes>
        </div>
      )}
    </div>
  );
}
