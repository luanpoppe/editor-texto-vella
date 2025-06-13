import * as React from "react";
import { isNodeSelection } from "@tiptap/react";

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// --- Lib ---
import { isMarkInSchema } from "@/lib/tiptap-utils";

// --- UI Primitives ---
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/tiptap-ui-primitive/popover";

// --- Tiptap UI ---
import {
  ColorHighlightButton,
  canToggleHighlight,
} from "@/components/tiptap-ui/color-highlight-button";

// --- Styles ---
import "@/components/tiptap-ui/color-highlight-popover/color-highlight-popover.scss";
import { DEFAULT_HIGHLIGHT_COLORS } from "./default-highlight-colors";
import { ColorHighlightPopoverProps } from "./color-highlight-interfaces";
import { ColorHighlightPopoverButton } from "./ColorHighlightPopoverButton";
import { ColorHighlightPopoverContent } from "./ColorHighlightPopoverContent";

ColorHighlightPopoverButton.displayName = "ColorHighlightPopoverButton";

export function ColorHighlightPopover({
  editor: providedEditor,
  colors = DEFAULT_HIGHLIGHT_COLORS,
  hideWhenUnavailable = false,
  ...props
}: ColorHighlightPopoverProps) {
  const editor = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const markAvailable = isMarkInSchema("highlight", editor);

  React.useEffect(() => {
    if (!editor) return;

    const updateIsDisabled = () => {
      let isDisabled = false;

      if (!markAvailable || !editor) {
        isDisabled = true;
      }

      const isInCompatibleContext =
        editor.isActive("code") ||
        editor.isActive("codeBlock") ||
        editor.isActive("imageUpload");

      if (isInCompatibleContext) {
        isDisabled = true;
      }

      setIsDisabled(isDisabled);
    };

    editor.on("selectionUpdate", updateIsDisabled);
    editor.on("update", updateIsDisabled);

    return () => {
      editor.off("selectionUpdate", updateIsDisabled);
      editor.off("update", updateIsDisabled);
    };
  }, [editor, markAvailable]);

  const isActive = editor?.isActive("highlight") ?? false;

  const shouldShow = React.useMemo(() => {
    if (!hideWhenUnavailable || !editor) return true;

    return !(
      isNodeSelection(editor.state.selection) || !canToggleHighlight(editor)
    );
  }, [hideWhenUnavailable, editor]);

  if (!shouldShow || !editor || !editor.isEditable) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <ColorHighlightPopoverButton
          disabled={isDisabled}
          data-active-state={isActive ? "on" : "off"}
          data-disabled={isDisabled}
          aria-pressed={isActive}
          {...props}
        />
      </PopoverTrigger>

      <PopoverContent aria-label="Highlight colors">
        <ColorHighlightPopoverContent
          editor={editor}
          colors={colors}
          onClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}

export default ColorHighlightPopover;
