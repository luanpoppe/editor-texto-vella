import { DownloadIcon } from "lucide-react";
import { Button } from "../tiptap-ui-primitive/button";
import { useCurrentEditor } from "@tiptap/react";

export function DownloadDocumento() {
  const { editor } = useCurrentEditor();

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
