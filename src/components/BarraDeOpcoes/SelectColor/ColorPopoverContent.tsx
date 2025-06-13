import { useCallback, useEffect, useRef } from "react";
import { ColorPopoverContentProps } from "./select-color.model";
import { toggleFormatacao } from "@/utils/toggleFormatacoes";
import { Separator } from "@/components/tiptap-ui-primitive/separator";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { BanIcon } from "@/components/tiptap-icons/ban-icon";
import { EachColorButton } from "./EachColorButton";

export function ColorPopoverContent(props: ColorPopoverContentProps) {
  const { editor, colors, onClose, removeColor, selectedIndex } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("selectedIndex: ", selectedIndex);
  }, [editor]);
  console.log("colors: ", colors);

  const selectedColor = editor?.getAttributes("textStyle").color;
  const isButtonActive = useCallback(
    (color: string) => {
      return selectedColor == color;
    },
    [editor]
  );

  const selectColor = useCallback(
    (newColor: string) => {
      const toogle = toggleFormatacao(editor, "setColor", newColor);
      toogle();
      onClose();
    },
    [editor]
  );

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
            isActive={isButtonActive(color.value)}
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
          onClick={removeColor}
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
