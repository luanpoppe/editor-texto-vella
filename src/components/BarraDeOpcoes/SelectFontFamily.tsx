/* eslint-disable react-hooks/rules-of-hooks */
import { toggleFormatacao } from "@/utils/toggleFormatacoes";
import { useCurrentEditor } from "@tiptap/react";
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
  const [value, setValue] = useState("Arial");
  const { editor } = useCurrentEditor();

  const attr = editor?.getAttributes("textStyle");

  useEffect(() => {
    setValue(attr?.fontFamily ?? "Arial");
  }, [editor, fontes]);

  useEffect(() => {
    editor?.chain().focus().setFontFamily("Arial").run();
  }, []);

  if (!editor) return;

  return (
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
