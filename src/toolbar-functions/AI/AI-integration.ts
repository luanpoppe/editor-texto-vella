import { AlterarTextoIA } from "@/bubble-integration/bubble-functions.model";
import { SendToBubble } from "@/bubble-integration/send-to-bubble";
import { TipTapClass } from "@/tip-tap.class";
import { Editor } from "@tiptap/react";
export class AIIntegration {
  tipTap: TipTapClass;
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
    this.tipTap = new TipTapClass(editor);
  }

  alterarTextoIA() {
    console.log("alterarTextoIA FOI CHAMADO");
    if (!this.editor) return;
    const tipTap = this.tipTap;

    const nodes = tipTap.getAllNodesFromSelection();
    console.log("nodes: ", nodes);

    const textoASerAlterado: AlterarTextoIA = nodes.map((n) => {
      return {
        id: n.attrs.id,
        texto: n.textContent ?? "Não pegou nenhum texto no parágrafo :(",
      };
    });

    console.log("textoASerAlterado: ", textoASerAlterado);

    // const { id } = tipTap.getSelectionNode();
    // // debugger;
    // const text =
    //   tipTap.getDomFromSelection().node.textContent ??
    //   "Não pegou nenhum texto no parágrafo :(";
    // console.log("id: ", id);

    // const textoASerAlterado: AlterarTextoIA = [
    //   {
    //     id,
    //     texto: text,
    //   },
    // ];

    SendToBubble.alterarTextoIA(
      textoASerAlterado,
      "modificar",
      "melhorarescrita"
    );
  }

  adicionarTextoIA() {
    if (!this.editor) return;
    console.log("adicionarTextoIA FOI CHAMADO");
    const tipTap = this.tipTap;

    const nodes = tipTap.getAllNodesFromSelection();

    const textoASerAlterado: AlterarTextoIA = nodes.map((n) => {
      return {
        id: n.attrs.id,
        texto: n.textContent ?? "Não pegou nenhum texto no parágrafo :(",
      };
    });

    console.log("textoASerAlterado: ", textoASerAlterado);

    SendToBubble.alterarTextoIA(
      textoASerAlterado,
      "adicionar",
      "melhorarescrita",
      textoASerAlterado.at(-1)?.id
    );

    // this.tipTap.addTextAfterNode(
    //   "Olá!! Como vai?",
    //   textoASerAlterado.at(-1)!.id
    // );
  }
}
