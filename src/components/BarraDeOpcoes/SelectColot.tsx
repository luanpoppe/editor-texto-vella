import { Editor, useCurrentEditor } from "@tiptap/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../tiptap-ui-primitive/popover";
import { useCallback, useMemo, useRef, useState } from "react";
import { Baseline } from "lucide-react";
import { Button } from "../tiptap-ui-primitive/button";
import { useMenuNavigation } from "@/hooks/use-menu-navigation";
import { Separator } from "../tiptap-ui-primitive/separator";
import { BanIcon } from "../tiptap-icons/ban-icon";
import { ColorHighlightButton } from "../tiptap-ui/color-highlight-button";
import { toggleFormatacao } from "@/utils/toggleFormatacoes";
import { DEFAULT_HIGHLIGHT_COLORS } from "../tiptap-ui/color-highlight-popover/default-highlight-colors";
import { ColorHighlightPopoverColor } from "../tiptap-ui/color-highlight-popover/color-highlight-interfaces";

export function SelectColor(props?: any) {
  const { editor } = useCurrentEditor();
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // const isActive = editor?.isActive("color") ?? false;
  const colors = DEFAULT_HIGHLIGHT_COLORS;

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
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </PopoverContent>
    </Popover>
  );
}

type ColorPopoverContentProps = {
  editor: Editor;
  colors: ColorHighlightPopoverColor[];
  onClose: () => void;
  isActive: boolean;
  setIsActive: any;
};

function ColorPopoverContent({
  editor,
  colors,
  onClose,
  isActive,
  setIsActive,
}: ColorPopoverContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const removeHighlight = useCallback(() => {
    if (!editor) return;
    const remove = toggleFormatacao(editor, "unsetColor");
    // editor.chain().focus().unsetColor().run();
    remove();
    setIsActive(false);
    onClose();
  }, [editor, onClose]);

  const selectColor = useCallback(
    (newColor: string) => {
      const toogle = toggleFormatacao(editor, "setColor", newColor);
      toogle();
      setIsActive(true);
      onClose();
    },
    [editor]
  );

  const menuItems = useMemo(
    () => [...colors, { label: "Remove color", value: "none" }],
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
          <EachColorButton
            key={color.value}
            isActive={isActive}
            editor={editor}
            color={color.value}
            aria-label={`${color.label} text color`}
            tabIndex={index === selectedIndex ? 0 : -1}
            data-highlighted={selectedIndex === index}
            onClick={(newColor: string) => selectColor(newColor)}
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

type EachColorButtonProps = {
  key: string;
  isActive: boolean;
  editor: Editor;
  color: string;
  ["aria-label"]: string;
  tabIndex: number;
  ["data-highlighted"]: boolean;
  onClick: (newColor: string) => void;
};

function EachColorButton(props: EachColorButtonProps) {
  const { color, isActive, onClick } = props;

  return (
    <Button
      type="button"
      data-style="ghost"
      data-active-state={isActive ? "on" : "off"}
      role="button"
      tabIndex={-1}
      aria-label={`${color} text color`}
      // aria-pressed={isActive}
      // onClick={handleClick}
      onClick={() => onClick(color)}
      // style={buttonStyle}
      // {...buttonProps}
      // ref={ref}
    >
      <>
        <span
          className="tiptap-button-highlight"
          style={{ "--highlight-color": color } as React.CSSProperties}
        />

        {/* {color && <span className="tiptap-button-text">{color}</span>} */}
      </>
    </Button>
  );
}
