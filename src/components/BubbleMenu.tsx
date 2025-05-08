/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BubbleMenu, useCurrentEditor } from "@tiptap/react";
import { BotaoBarraDeOpcoes } from "./BarraDeOpcoes/BotaoBarraDeOpcoes";
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
import { Input } from "./ui/input";

export function BubbleMenuWithEditor() {
  const { editor } = useCurrentEditor();
  if (!editor) return;

  return (
    <BubbleMenu editor={null} tippyOptions={{ placement: "right" }}>
      {/* <div className="bg-slate-400 min-w-80 min-h-80 w-full flex flex-col p-6 rounded-md"> */}
      {/* </div> */}
      <Input placeholder="Peça para a IA fazer algo..." className="mb-5" />
      {/* <Card className="mb-5">
        <CardContent>
        </CardContent>
      </Card> */}

      <Card>
        {/* <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader> */}
        <CardContent className="my-8 flex flex-col">
          <Command>
            <CommandInput placeholder="Ache o que procura" />

            <CommandList>
              <CommandEmpty
                onClick={() => {
                  // @ts-ignore
                  bubble_fn_salvar_texto({
                    output1: editor.getText(),
                    output2: JSON.stringify(editor.getJSON()),
                    output3: editor.getHTML(),
                  });
                }}
              >
                Nenhum resultado encontrado
              </CommandEmpty>

              <CommandGroup heading="Escrita">
                <CommandItem>Melhorar escrita do texto selecionado</CommandItem>
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
              </CommandGroup>
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
    </BubbleMenu>
  );
}
