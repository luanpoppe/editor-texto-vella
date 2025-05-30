/* eslint-disable react-hooks/rules-of-hooks */
import { useCurrentEditor } from "@tiptap/react";
import { toggleFormatacao } from "../../utils/toggleFormatacoes";
import { useEffect, useState } from "react";
import { BotaoBarraDeOpcoesComoDiv } from "./BotaoBarraDeOpcoes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../tiptap-ui-primitive/dropdown-menu";
import { Button } from "../tiptap-ui-primitive/button";
import { ChevronDownIcon } from "../tiptap-icons/chevron-down-icon";

export function SelectFontSize() {
  const [fontSizeState, setFontSizeState] = useState("16px");
  const { editor } = useCurrentEditor();
  const attr = editor?.getAttributes("textStyle");
  const fontSizes = [12, 16, 20, 24, 30, 36, 48];

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
    const fontSize = attr?.fontSize;
    setFontSizeState(fontSize ?? "16px");
  }, [editor, attr]);

  if (!editor) return;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={(e) => {
          // console.log("e.isPropagationStopped(): ", e.isPropagationStopped());
          e.stopPropagation();
        }}
      >
        <Button type="button" data-style="ghost">
          {fontSizeState}
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {fontSizes.map((size) => {
          return (
            <DropdownMenuItem asChild key={size}>
              <Button
                onClick={() => changeFontSize(`${size}px`)}
                data-style="ghost"
                role="menuitem"
                data-active-state={fontSizeState === `${size}px` ? "on" : "off"}
              >
                {`${size}px`}
              </Button>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
