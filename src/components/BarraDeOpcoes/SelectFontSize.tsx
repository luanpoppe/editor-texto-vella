import { useCurrentEditor } from "@tiptap/react";
import { toggleFormatacao } from "../../utils/toggleFormatacoes";
import { useState } from "react";
import {
  BotaoBarraDeOpcoes,
  BotaoBarraDeOpcoesComoDiv,
} from "./BotaoBarraDeOpcoes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          onClick={(e) => {
            console.log("e.isPropagationStopped(): ", e.isPropagationStopped());
            e.stopPropagation();
          }}
        >
          <BotaoBarraDeOpcoesComoDiv>{fontSizeState}</BotaoBarraDeOpcoesComoDiv>

          {/* <BotaoBarraDeOpcoes>{fontSizeState}</BotaoBarraDeOpcoes> */}
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

      {/* <div style={{ position: "relative" }}>
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
      </div> */}
    </>
  );
}
