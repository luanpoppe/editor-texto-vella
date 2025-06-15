/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BubbleMenu, NodePos, useCurrentEditor } from "@tiptap/react";
import { BotaoBarraDeOpcoes } from "../BarraDeOpcoes/BotaoBarraDeOpcoes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../tiptap-ui-primitive/popover";
import { MoreHorizontal } from "lucide-react";
import { BubblePopover } from "./BubblePopover";
import { useState } from "react";
import { bubbleMenuOptions } from "./bubble-menu-options";

export function BubbleMenuWithEditor() {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState(false);
  if (!editor) return;

  return (
    <BubbleMenu editor={editor} tippyOptions={{ placement: "right" }}>
      <Popover open={open} onOpenChange={setOpen}>
        <BubblePopover>
          <Input placeholder="Peça para a IA fazer algo..." className="mb-5" />
          <Card>
            <CardContent className="my-8 flex flex-col">
              <Command>
                <CommandInput placeholder="Ache o que procura" />

                <CommandList>
                  <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>

                  {bubbleMenuOptions.map(({ heading, items }) => {
                    return (
                      <>
                        <CommandGroup key={heading} heading={heading}>
                          {items.map(({ name, onClick }) => {
                            return (
                              <CommandItem key={name}>
                                <p onClick={() => onClick(editor)}>{name}</p>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                        <CommandSeparator />
                      </>
                    );
                  })}

                  {/* <CommandGroup heading="Escrita">
                    <CommandItem>
                      <p
                        onClick={() => {
                          console.log("FOI CLICADO TOP");
                          // console.log("editor.getText(): ", editor.getText());

                          const { from } = editor.state.selection;
                          const domAtPos = editor.view.domAtPos(from);
                          const selectedElement = domAtPos.node as HTMLElement;
                          console.log("selectedElement: ", selectedElement);

                          const { state } = editor;
                          const { selection } = state;
                          const $from = selection.$from;
                          const parentNode = $from.parent;
                          const parentNodeStartPos = $from.start();

                          console.log("Node Type:", parentNode.type.name);
                          console.log(
                            "Node Start Position:",
                            parentNodeStartPos
                          );
                          console.log(
                            "Node Content:",
                            parentNode.content.toJSON()
                          );

                          selectedElement.setAttribute(
                            "contenteditable",
                            "false"
                          );
                          editor.setEditable(false);
                          setTimeout(() => {
                            selectedElement.setAttribute(
                              "contenteditable",
                              "true"
                            );
                            editor.setEditable(true);
                          }, 4000);

                          // @ts-ignore
                          bubble_fn_salvar_texto({
                            // output1: editor.getText(),
                            // output2: JSON.stringify(editor.getJSON()),
                            // output3: editor.getHTML(),
                            output1: parentNode.toJSON(),
                            output2: parentNodeStartPos,
                            output3: editor.getHTML(),
                          });
                        }}
                      >
                        Melhorar escrita do texto selecionado
                      </p>
                    </CommandItem>
                    <CommandItem>
                      Tornar o texto selecionado mais sucinto
                    </CommandItem>
                    <CommandItem>
                      Tornar o texto selecionado mais formal
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading="Settings">
                    <CommandItem>Profile</CommandItem>
                    <CommandItem>Billing</CommandItem>
                    <CommandItem>Settings</CommandItem>
                  </CommandGroup> */}
                </CommandList>
              </Command>
            </CardContent>
            {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
          </Card>

          {/* <div>
        <button
          onClick={async () => {
            const { from, to } = editor.state.selection;
            const text = editor.state.doc.textBetween(from, to, " ");
            console.log("text: ", text);
            editor.commands.insertContentAt(to, "<p>Carregando...</p>");
            const gptAnswer = await getChatGPTAnswer(text);
            editor.commands.undo();

            editor.commands.insertContentAt(
              { from: to, to: to },
              `${gptAnswer}`
            );
            editor.chain().focus();

            // editor.state.selection.content().toJSON()
            // console.log("CADE AQUI OLÁ", editor.getJSON());
          }}
        >
          GPTinho
        </button>
        <button>Botão 2</button>
      </div> */}
        </BubblePopover>
      </Popover>
    </BubbleMenu>
  );
}
