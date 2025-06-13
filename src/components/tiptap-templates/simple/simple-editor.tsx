/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from "react";
import {
  EditorContent,
  EditorContext,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { LinkContent } from "@/components/tiptap-ui/link-popover";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import { BubbleMenuWithEditor } from "@/components/BubbleMenu";
import { tipTapExtensions } from "./tip-tap-extensions";
import { MainToolbarContent } from "./MainToolbarContent";
import { ColorHighlightPopoverContent } from "@/components/tiptap-ui/color-highlight-popover/ColorHighlightPopoverContent";

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

export function SimpleEditor() {
  const isMobile = useMobile();
  const windowSize = useWindowSize();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: tipTapExtensions,
    content:
      "<p><span style='font-family: Arial; font-size: 16px;'>Carregando...</span></p>",
  });

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  function inicializarEditor(properties: any) {
    console.log("NOVA BUILD DE 18:11");
    console.log("a função inicializarEditor foi chamada!!!");
    editor!.commands.setContent(properties.param1);
  }

  function pedirTextoAtualizado(properties: any) {
    const texto = editor!.getHTML();
    console.log("PEDIR TEXTO ATUALIZADO FOI CHAMADO ");
    console.log("properties.param2: ", properties.param2);
    // @ts-ignore
    bubble_fn_enviarTextoAtualizado({
      output1: texto,
      output2: properties.param2,
    });
  }

  async function pedirCopiarTexto() {
    console.log("PEDIR COPIAR TEXTO FOI CHAMADO");
    const texto = editor!.getHTML();
    const blob = new Blob([texto], { type: "text/html" });
    const data = [new ClipboardItem({ "text/html": blob })];

    await navigator.clipboard.write(data);
  }

  (window as any).inicializarEditor = inicializarEditor;
  (window as any).pedirTextoAtualizado = pedirTextoAtualizado;
  (window as any).pedirCopiarTexto = pedirCopiarTexto;

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar
        ref={toolbarRef}
        style={
          isMobile
            ? {
                bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
              }
            : {}
        }
      >
        {mobileView === "main" ? (
          <MainToolbarContent
            onHighlighterClick={() => setMobileView("highlighter")}
            onLinkClick={() => setMobileView("link")}
            isMobile={isMobile}
          />
        ) : (
          <MobileToolbarContent
            type={mobileView === "highlighter" ? "highlighter" : "link"}
            onBack={() => setMobileView("main")}
          />
        )}
      </Toolbar>

      <div className="content-wrapper">
        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </div>

      {/* <FloatingMenu editor={null}>This is the floating menu</FloatingMenu> */}

      {/* <BubbleMenuWithEditor /> */}
    </EditorContext.Provider>
  );
}
