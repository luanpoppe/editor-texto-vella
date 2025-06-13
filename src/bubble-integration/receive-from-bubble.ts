/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Editor } from "@tiptap/react";
import { ReceiveParamsFromBubble } from "./bubble-functions.model";
import { SendToBubble } from "./send-to-bubble";
import { TipTapClass } from "@/tip-tap.class";

export class ReceiveFromBubble {
  constructor(private editor: Editor) {}

  initialize() {
    (window as any).inicializarEditor = this.inicializarEditor;
    (window as any).pedirTextoAtualizado = this.pedirTextoAtualizado;
    (window as any).pedirCopiarTexto = this.pedirCopiarTexto;
    (window as any).textoAlteradoIA = this.textoAlteradoIA;
    (window as any).pedirDownloadDocumento = this.pedirDownloadDocumento;
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

    const param1 = JSON.parse(properties.param1);
    const { id, texto } = param1[0];
    if (!this.editor) return;
    const tipTap = new TipTapClass(this.editor);
    tipTap.changeNodeHTMLText(texto, id);

    // tipTap.changeSelectionNodeHTML("Opa parágrafo novo pcero tamo junto");
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
    console.log(`FUÇÃO ${nomeDaFuncao} FOI CHAMADA`);
  }
}
