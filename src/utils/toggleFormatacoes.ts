/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Editor } from "@tiptap/react";

export function toggleFormatacao(
  editor: Editor,
  callbackFormatacao: string,
  options: any = undefined
) {
  // console.log(
  //   'editor.getAttributes("textStyle"): ',
  //   editor.getAttributes("textStyle")
  // );
  // @ts-ignore
  return () => editor.chain().focus()[callbackFormatacao](options).run();
}

export function checkEditorClassActive(editor: Editor, seletorChecado: string) {
  return editor.isActive(seletorChecado) ? "bg-gray-400" : "";
}
