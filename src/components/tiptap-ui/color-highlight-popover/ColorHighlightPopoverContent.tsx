import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import { ColorHighlightPopoverContentProps } from "./color-highlight-interfaces";
import { DEFAULT_HIGHLIGHT_COLORS } from "./default-highlight-colors";
import { useCallback, useMemo, useRef } from "react";
import { useMenuNavigation } from "@/hooks/use-menu-navigation";
import { ColorHighlightButton } from "../color-highlight-button";
import { Separator } from "@/components/tiptap-ui-primitive/separator";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { BanIcon } from "@/components/tiptap-icons/ban-icon";

export function ColorHighlightPopoverContent({
  editor: providedEditor,
  colors = DEFAULT_HIGHLIGHT_COLORS,
  onClose,
}: ColorHighlightPopoverContentProps) {
  const editor = useTiptapEditor(providedEditor);
  const containerRef = useRef<HTMLDivElement>(null);

  const removeHighlight = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().unsetMark("highlight").run();
    onClose?.();
  }, [editor, onClose]);

  const menuItems = useMemo(
    () => [...colors, { label: "Remove highlight", value: "none" }],
    [colors]
  );

  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "both",
    onSelect: (item) => {
      if (item.value === "none") {
        removeHighlight();
      }
      onClose?.();
    },
    onClose,
    autoSelectFirstItem: false,
  });

  return (
    <div
      ref={containerRef}
      className="tiptap-color-highlight-content"
      tabIndex={0}
    >
      <div className="tiptap-button-group" data-orientation="horizontal">
        {colors.map((color, index) => (
          <ColorHighlightButton
            key={color.value}
            editor={editor}
            color={color.value}
            aria-label={`${color.label} highlight color`}
            tabIndex={index === selectedIndex ? 0 : -1}
            data-highlighted={selectedIndex === index}
            onClick={onClose}
          />
        ))}
      </div>

      <Separator />

      <div className="tiptap-button-group">
        <Button
          onClick={removeHighlight}
          aria-label="Remove highlight"
          tabIndex={selectedIndex === colors.length ? 0 : -1}
          type="button"
          role="menuitem"
          data-style="ghost"
          data-highlighted={selectedIndex === colors.length}
        >
          <BanIcon className="tiptap-button-icon" />
        </Button>
      </div>
    </div>
  );
}
