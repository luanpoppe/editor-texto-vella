/* eslint-disable react-hooks/rules-of-hooks */
import { useCurrentEditor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { toggleFormatacao } from "../../utils/toggleFormatacoes";
import { BotaoBarraDeOpcoesComoDiv } from "./BotaoBarraDeOpcoes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SelectHeadings() {
  const [headingState, setHeadingState] = useState("Normal");
  const { editor } = useCurrentEditor();
  if (!editor) return;
  const attr = editor.getAttributes("heading");

  function changeHeading(level: number) {
    editor!.chain().focus().unsetAllMarks().run();

    if (level == 0) {
      setHeadingState("Normal");
      const setParagraph = toggleFormatacao(editor!, "setParagraph");
      setParagraph();
    } else {
      setHeadingState(`Título ${level}`);
      const setHeading = toggleFormatacao(editor!, "setHeading", {
        level,
      });
      setHeading();
    }
  }

  useEffect(() => {
    console.log("attr: ", attr);
    const heading = attr.level;
    setHeadingState(heading ? `Título ${heading}` : "Normal");
  }, [editor, attr]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BotaoBarraDeOpcoesComoDiv>{headingState}</BotaoBarraDeOpcoesComoDiv>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Títulos</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => changeHeading(0)}>
          Normal
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => changeHeading(1)}>
          Título 1
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => changeHeading(2)}>
          Título 2
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => changeHeading(3)}>
          Título 3
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // return (
  //   <div style={{ position: "relative" }}>
  //     <BotaoBarraDeOpcoes
  //       onClick={() => {
  //         setShowOptions(!showOptions);
  //       }}
  //     >
  //       Títulos
  //     </BotaoBarraDeOpcoes>
  //     <div
  //       style={{
  //         position: "absolute",
  //         zIndex: "99",
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         width: "100%",
  //       }}
  //     >
  //       <BotaoBarraDeOpcoes onClick={() => changeHeading(1)}>
  //         Título 1
  //       </BotaoBarraDeOpcoes>
  //       <BotaoBarraDeOpcoes onClick={() => changeHeading(2)}>
  //         Título 2
  //       </BotaoBarraDeOpcoes>
  //       <BotaoBarraDeOpcoes onClick={() => changeHeading(3)}>
  //         Título 3
  //       </BotaoBarraDeOpcoes>
  //     </div>
  //   </div>
  // );
}
