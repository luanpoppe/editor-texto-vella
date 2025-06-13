import { Button } from "@/components/tiptap-ui-primitive/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/tiptap-ui-primitive/popover";
import { DEFAULT_HIGHLIGHT_COLORS } from "@/components/tiptap-ui/color-highlight-popover/default-highlight-colors";
import { useMenuNavigation } from "@/hooks/use-menu-navigation";
import { useCurrentEditor } from "@tiptap/react";
import { Baseline } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { ColorPopoverContent } from "./ColorPopoverContent";
import { toggleFormatacao } from "@/utils/toggleFormatacoes";

export function SelectColor({ onClose, ...props }: any) {
  const { editor } = useCurrentEditor();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedColor = editor?.getAttributes("textStyle").color;
  const isActive = selectedColor ?? false;
  const colors = DEFAULT_HIGHLIGHT_COLORS;

  const menuItems = useMemo(
    () => [...colors, { label: "Remover cor", value: "none" }],
    [colors]
  );

  const removeColor = useCallback(() => {
    if (!editor) return;
    const remove = toggleFormatacao(editor, "unsetColor");
    remove();

    onClose();
  }, [editor, onClose]);

  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "both",
    onSelect: (item) => {
      if (item.value === "none") {
        removeColor();
      }
      onClose?.();
    },
    onClose,
    autoSelectFirstItem: false,
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className={"tiptap-button"}
          data-style="ghost"
          data-appearance="default"
          role="button"
          tabIndex={-1}
          aria-label="Highlight text"
          tooltip="Highlight"
          // ref={ref}
          data-active-state={isActive ? "on" : "off"}
          aria-pressed={isActive}
          {...props}
        >
          <Baseline className="tiptap-button-icon" />
        </Button>
      </PopoverTrigger>

      <PopoverContent aria-label="Cor do texto">
        <ColorPopoverContent
          editor={editor!}
          colors={colors}
          onClose={() => setIsOpen(false)}
          removeColor={removeColor}
          data-highlighted={selectedIndex === colors.length}
          selectedIndex={selectedIndex}
        />
      </PopoverContent>
    </Popover>
  );
}
