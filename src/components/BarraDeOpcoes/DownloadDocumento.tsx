import { AIIntegration } from "@/toolbar-functions/AI/AI-integration";
import { useCurrentEditor } from "@tiptap/react";
import { useMemo } from "react";

export function DownloadDocumento() {
  const { editor } = useCurrentEditor();

  const aiIntegration = useMemo(() => new AIIntegration(editor!), [editor]);
  // const aiIntegration = new AIIntegration(editor!);

  // function textoAlteradoIA(properties: any) {
  //   console.log("textoAlteradoIA FOI CHAMADO");

  //   const param1 = JSON.parse(properties.param1);
  //   const { id, texto } = param1[0];
  //   if (!editor) return;
  //   const tipTap = new TipTapClass(editor);
  //   tipTap.changeNodeHTMLText(texto, id);

  //   // tipTap.changeSelectionNodeHTML("Opa parágrafo novo pcero tamo junto");
  // }
  // (window as any).textoAlteradoIA = textoAlteradoIA;

  // function pedirDownloadDocumento(properties: any) {
  //   console.log("pedirDownloadDocumento FOI CHAMADO ");
  //   editor
  //     ?.chain()
  //     .exportDocx({
  //       onCompleteExport: (result: any) => {
  //         // @ts-ignore
  //         // const tituloDocumento = bubble_fn_get_titulo_documento();
  //         const tituloDocumento = properties?.param1 ?? "arquivo-documento";

  //         const blob = new Blob([result], {
  //           type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //         });
  //         const url = URL.createObjectURL(blob);
  //         const a = document.createElement("a");

  //         a.href = url;
  //         a.download = `${tituloDocumento ?? "arquivo-documento"}.docx`;
  //         a.click();
  //         URL.revokeObjectURL(url);
  //       },
  //     } as any)
  //     .run();
  // }

  // (window as any).pedirDownloadDocumento = pedirDownloadDocumento;

  // return (
  //   <Button
  //     style={{ width: "32px", height: "32px" }}
  //     type="button"
  //     data-style="ghost"
  //   >
  //     <DownloadIcon
  //       color="black"
  //       onClick={() => editor?.chain().exportDocx().run()}
  //     />
  //   </Button>
  // );

  return (
    <>
      <button onClick={() => aiIntegration.alterarTextoIA("aumentartexto")}>
        B1
      </button>
      <button onClick={() => aiIntegration.adicionarTextoIA()}>B2</button>
    </>
  );
}
