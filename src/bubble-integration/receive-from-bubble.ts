/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Editor } from "@tiptap/react";
import {
  AlterarTextoIA,
  ReceiveParamsFromBubble,
} from "./bubble-functions.model";
import { SendToBubble } from "./send-to-bubble";
import { TipTapClass } from "@/tip-tap.class";

export class ReceiveFromBubble {
  tipTap: TipTapClass = new TipTapClass(this.editor);

  constructor(private editor: Editor) {}

  initialize() {
    (window as any).inicializarEditor = this.inicializarEditor;
    (window as any).pedirTextoAtualizado = this.pedirTextoAtualizado;
    (window as any).pedirCopiarTexto = this.pedirCopiarTexto;
    (window as any).textoAlteradoIA = this.textoAlteradoIA;
    (window as any).pedirDownloadDocumento = this.pedirDownloadDocumento;
    (window as any).textoAdicionarIA = this.textoAdicionarIA;
  }

  inicializarEditor(properties: ReceiveParamsFromBubble) {
    this.funcaoFoiChamada(this.inicializarEditor.name);
    console.log("NOVA BUILD DE 18:11");

    this.editor.commands.setContent(properties.param1);
  }

  async pedirCopiarTexto() {
    this.funcaoFoiChamada(this.pedirCopiarTexto.name);

    const texto = this.editor!.getHTML();
    const blob = new Blob([texto], { type: "text/html" });
    const data = [new ClipboardItem({ "text/html": blob })];

    await navigator.clipboard.write(data);
  }

  pedirTextoAtualizado(properties: ReceiveParamsFromBubble) {
    this.funcaoFoiChamada(this.pedirTextoAtualizado.name);

    const texto = this.editor.getHTML();
    console.log("properties.param2: ", properties.param2);

    SendToBubble.enviarTextoAtualizado(texto, properties.param2);
  }

  textoAlteradoIA(properties: ReceiveParamsFromBubble) {
    this.funcaoFoiChamada(this.textoAlteradoIA.name);
    if (!this.editor) return;

    const paragraphArray = JSON.parse(properties.param1) as AlterarTextoIA;
    paragraphArray.forEach(({ id, texto }) => {
      this.tipTap.changeNodeHTMLText(texto, id);
    });
  }

  textoAdicionarIA({ param1, param2 }: ReceiveParamsFromBubble) {
    this.funcaoFoiChamada(this.textoAdicionarIA.name);

    if (!this.editor) return;
    const tipTap = this.tipTap;
    const texto = param1;
    const nodeId = param2;

    tipTap.addTextAfterNode(texto, nodeId);
  }

  pedirDownloadDocumento(properties: ReceiveParamsFromBubble) {
    this.funcaoFoiChamada(this.pedirDownloadDocumento.name);

    const onCompleteExport = (result: any) => {
      const tituloDocumento = properties?.param1 ?? "arquivo-documento";

      const blob = new Blob([result], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `${tituloDocumento ?? "arquivo-documento"}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    };

    this.editor
      ?.chain()
      .exportDocx({
        onCompleteExport,
      } as any)
      .run();
  }

  private funcaoFoiChamada(nomeDaFuncao: string) {
    console.log(`FUNÇÃO ${nomeDaFuncao} FOI CHAMADA`);
  }
}
