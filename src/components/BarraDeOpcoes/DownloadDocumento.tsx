/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DownloadIcon } from "lucide-react";
import { Button } from "../tiptap-ui-primitive/button";
import { useCurrentEditor } from "@tiptap/react";

export function DownloadDocumento() {
  const { editor } = useCurrentEditor();

  function pedirDownloadDocumento(properties: any) {
    console.log("pedirDownloadDocumento FOI CHAMADO ");
    editor
      ?.chain()
      .exportDocx({
        onCompleteExport: (result: any) => {
          // @ts-ignore
          // const tituloDocumento = bubble_fn_get_titulo_documento();
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
        },
      } as any)
      .run();
  }

  (window as any).pedirDownloadDocumento = pedirDownloadDocumento;

  return (
    <Button
      style={{ width: "32px", height: "32px" }}
      type="button"
      data-style="ghost"
    >
      <DownloadIcon
        color="black"
        onClick={() => editor?.chain().exportDocx().run()}
      />
      {/* <ChevronDownIcon className="tiptap-button-dropdown-small" /> */}
    </Button>
  );
}
