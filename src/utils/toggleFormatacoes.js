export function toggleFormatacao(
  editor,
  callbackFormatacao,
  options = undefined
) {
  return editor.chain().focus()[callbackFormatacao](options).run;
}
