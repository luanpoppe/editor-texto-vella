/* eslint-disable react-hooks/rules-of-hooks */
import { toggleFormatacao } from "@/utils/toggleFormatacoes";
import { BotaoBarraDeOpcoes } from "./BotaoBarraDeOpcoes";
import { useCurrentEditor } from "@tiptap/react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../tiptap-ui-primitive/dropdown-menu";
import { ChevronDownIcon } from "../tiptap-icons/chevron-down-icon";
import { Button } from "../tiptap-ui-primitive/button";

export function SelectFontFamily() {
  const fontes = ["Arial", "Inter", "Monospace", "Cursive", "serif"];

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { editor } = useCurrentEditor();

  const attr = editor?.getAttributes("textStyle");

  useEffect(() => {
    setValue(attr?.fontFamily ?? "Arial");
  }, [editor, fontes]);

  if (!editor) return;

  return (
    // <Popover open={open} onOpenChange={setOpen}>
    //   <PopoverTrigger asChild>
    //     <Button
    //       variant="outline"
    //       role="combobox"
    //       aria-expanded={open}
    //       className="w-[130px] justify-between border-none hover:bg-gray-300"
    //     >
    //       {value ? fontes.find((fonte) => fonte === value) : "Fontes"}

    //       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //     </Button>
    //   </PopoverTrigger>

    //   <PopoverContent className="w-[200px] p-0">
    //     <Command>
    //       <CommandInput placeholder="Busque uma fonte..." />
    //       <CommandList>
    //         <CommandEmpty>Nenhuma fonte encontrada</CommandEmpty>

    //         <CommandGroup>
    //           {fontes.map((fonte) => (
    //             <CommandItem
    //               className="cursor-pointer"
    //               key={fonte}
    //               value={fonte}
    //               onSelect={(currentValue) => {
    //                 const setFontFamily = toggleFormatacao(
    //                   editor,
    //                   "setFontFamily",
    //                   fonte
    //                 );
    //                 setFontFamily();
    //                 setValue(currentValue === value ? "" : currentValue);
    //                 setOpen(false);
    //               }}
    //             >
    //               <Check
    //                 className={cn(
    //                   "mr-2 h-4 w-4",
    //                   value === fonte ? "opacity-100" : "opacity-0"
    //                 )}
    //               />
    //               {fonte}
    //             </CommandItem>
    //           ))}
    //         </CommandGroup>
    //       </CommandList>
    //     </Command>
    //   </PopoverContent>
    // </Popover>

    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button type="button" data-style="ghost">
          {value ? fontes.find((fonte) => fonte === value) : "Fontes"}
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {fontes.map((fonte) => (
          <DropdownMenuItem asChild key={fonte}>
            <Button
              onClick={() => {
                const setFontFamily = toggleFormatacao(
                  editor,
                  "setFontFamily",
                  fonte
                );
                setFontFamily();
                setValue(fonte);
                setOpen(false);
              }}
              data-style="ghost"
              role="menuitem"
              data-active-state={value === fonte ? "on" : "off"}
            >
              {fonte}
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
