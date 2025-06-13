import { Node } from "@tiptap/pm/model";
import { Editor } from "@tiptap/react";

export class TipTapClass {
  constructor(public editor: Editor) {}

  get state() {
    return this.editor.state;
  }
  get selection() {
    return this.state.selection;
  }

  getSelectionPosition() {
    const from = this.selection.from;
    const to = this.selection.to;

    return { from, to };
  }

  getSelectionNode() {
    const node = this.selection.$from.node();
    const { id } = node.attrs;
    return { id };
  }

  getAllNodesFromSelection() {
    const { from, to } = this.selection;
    const nodes: Node[] = [];

    this.state.doc.nodesBetween(from, to, (node) => {
      if (node.attrs.id) nodes.push(node);
    });

    return nodes;
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

  getNodeByItsDataId(nodeId: string) {
    const node = document.querySelector(`[data-id="${nodeId}"]`);
    if (!node) return;

    const nodePos = this.editor.view.posAtDOM(node, 0);
    console.log("nodePos: ", nodePos);

    const tiptapNode = this.editor.state.doc.nodeAt(nodePos - 1);
    console.log("tiptapNode: ", tiptapNode);
    return tiptapNode;
  }

  addTextAfterNode(newText: string, nodeId: string) {
    let target: any = null;
    this.editor.state.doc.descendants((node, pos) => {
      if (node.attrs.id === nodeId) {
        target = {
          node,
          pos,
        };
        return false; // Stop searching once found
      }
    });

    if (!target) return;

    // Calculate the position immediately AFTER the found node.
    const insertPos = target.pos + target.node.nodeSize - 1;

    this.editor
      .chain()
      .focus()
      // 1. Move the cursor to the end of the target node.
      // This action loads the marks (bold, italic, etc.) from that position.
      .setTextSelection(insertPos)
      // .createParagraphNear()
      .setParagraph()
      // 2. Insert the content. Tiptap will now use the stored marks.
      .insertContent("\n\n" + newText)
      .run();
  }
}
