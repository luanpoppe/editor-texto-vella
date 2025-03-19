/* eslint-disable react-hooks/rules-of-hooks */
import { useCurrentEditor } from "@tiptap/react";
import { toggleFormatacao } from "../../utils/toggleFormatacoes";
import { useEffect, useState } from "react";
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
  const attr = editor.getAttributes("textStyle");

  function changeFontSize(fontSize: string) {
    const heading = editor!.getAttributes("heading").level;
    if (heading) {
      editor!.chain().focus().toggleHeading({ level: heading }).run();
    }

    setFontSizeState(fontSize);
    const setFontSize = toggleFormatacao(editor!, "setFontSize", fontSize);
    setFontSize();
  }

  useEffect(() => {
    const fontSize = editor.getAttributes("textStyle").fontSize;
    setFontSizeState(fontSize ?? "16px");
  }, [editor, attr]);

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
