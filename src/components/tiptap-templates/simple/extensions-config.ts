import { Editor } from "@tiptap/react";
import { FileHandlePluginOptions } from "@tiptap-pro/extension-file-handler";
import { ExportDocxOptions } from "@tiptap-pro/extension-export-docx/dist/tiptap-pro/packages/extension-export-docx/src/extension";

type FileHandler =
  | Partial<Omit<FileHandlePluginOptions, "key" | "editor">>
  | undefined;

export class ExtensionsConfig {
  static fileHandler(): FileHandler {
    return {
      allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
      onDrop: (currentEditor, files, pos) => {
        files.forEach((file) => {
          this.uploadImage(currentEditor, file, pos);
        });
      },
      onPaste: (currentEditor, files, htmlContent) => {
        files.forEach((file) => {
          if (htmlContent) {
            // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
            // you could extract the pasted file from this url string and upload it to a server for example
            console.log(htmlContent);
            return false;
          }

          this.uploadImage(
            currentEditor,
            file,
            currentEditor.state.selection.anchor
          );
        });
      },
    };
  }

  private static uploadImage(
    currentEditor: Editor,
    file: File,
    insertContentAt: number
  ) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      currentEditor
        .chain()
        .insertContentAt(insertContentAt, {
          type: "image",
          attrs: {
            src: fileReader.result,
          },
        })
        .focus()
        .run();
    };
  }

  static exportDocx(): Partial<ExportDocxOptions> {
    return {
      onCompleteExport: (result: any) => {
        // const tituloDocumento = bubble_fn_get_titulo_documento();
        const tituloDocumento = "arquivo-documento";

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
    };
  }
}
