import { Editor } from "@tiptap/react";
import { AIIntegration } from "@/toolbar-functions/AI/AI-integration";

type BubbleMenuOptions = {
  heading: string;
  items: {
    name: string;
    onClick: (editor: Editor) => void;
  }[];
}[];

export const bubbleMenuOptions: BubbleMenuOptions = [
  {
    heading: "Escrita",
    items: [
      {
        name: "Melhorar escrita",
        onClick: (editor) => ai(editor).alterarTextoIA("melhorarescrita"),
      },
      {
        name: "Tornar mais sucinto",
        onClick: (editor) => ai(editor).alterarTextoIA("maissucinto"),
      },
      {
        name: "Tornar texto maior",
        onClick: (editor) => ai(editor).alterarTextoIA("aumentartexto"),
      },
      {
        name: "Tornar mais formal",
        onClick: (editor) => ai(editor).alterarTextoIA("maisformal"),
      },
    ],
  },
];

function ai(editor: Editor) {
  return new AIIntegration(editor);
}
