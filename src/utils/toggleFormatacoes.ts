import { Editor } from "@tiptap/react";

export function toggleFormatacao(
  editor: Editor,
  callbackFormatacao: string,
  options: any = undefined
) {
  return editor.chain().focus()[callbackFormatacao](options).run;
}
