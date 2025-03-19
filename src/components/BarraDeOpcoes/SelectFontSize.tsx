import { useCurrentEditor } from "@tiptap/react";
import { toggleFormatacao } from "../../utils/toggleFormatacoes";
import { useState } from "react";
import { BotaoBarraDeOpcoesComoDiv } from "./BotaoBarraDeOpcoes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SelectFontSize() {
  const [fontSizeState, setFontSizeState] = useState("16px");
  const { editor } = useCurrentEditor();
  if (!editor) return;

  function changeFontSize(fontSize: string) {
    setFontSizeState(fontSize);
    const setFontSize = toggleFormatacao(editor!, "setFontSize", fontSize);
    setFontSize();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={(e) => {
          console.log("e.isPropagationStopped(): ", e.isPropagationStopped());
          e.stopPropagation();
        }}
      >
        <BotaoBarraDeOpcoesComoDiv>{fontSizeState}</BotaoBarraDeOpcoesComoDiv>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Tamanho da fonte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => changeFontSize("16px")}>
          16px
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => changeFontSize("20px")}>
          20px
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => changeFontSize("24px")}>
          24px
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
