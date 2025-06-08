import { Editor } from "@tiptap/react";

export class TipTapClass {
  constructor(public editor: Editor) {}

  getSelectionPosition() {
    const from = this.editor.state.selection.from;
    const to = this.editor.state.selection.to;

    return { from, to };
  }

  getSelectionNode() {
    const node = this.editor.state.selection.$from.node();
    const { id } = node.attrs;
    return { id };
  }

  changeSelectionNodeHTML(newHTML: string) {
    const { id } = this.getSelectionNode();
    const node = document.querySelector(`[data-id="${id}"]`);
    if (!node) return;
    node.innerHTML = newHTML;
  }

  changeNodeHTMLText(newHTML: string, nodeId: string) {
    const node = document.querySelector(`[data-id="${nodeId}"]`);
    if (!node) return;
    node.innerHTML = newHTML;
  }

  getDomFromSelection() {
    const { from } = this.getSelectionPosition();
    const resolvedPos = this.editor.view.domAtPos(from);
    const { node, offset } = resolvedPos;
    return {
      node,
      offset,
    };
  }

  replaceSelectedParagraph(newText: string) {
    const { from, to } = this.getSelectionPosition();

    this.editor
      .chain()
      .focus() // Keep focus on the editor
      .setTextSelection({ from, to }) // Select the entire content of the node
      .insertContent(newText) // Replace the selected content with the new text
      .run();
  }
}
