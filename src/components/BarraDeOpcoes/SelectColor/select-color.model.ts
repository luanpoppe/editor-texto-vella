import { ColorHighlightPopoverColor } from "@/components/tiptap-ui/color-highlight-popover/color-highlight-interfaces";
import { Editor } from "@tiptap/react";

export type ColorPopoverContentProps = {
  editor: Editor;
  colors: ColorHighlightPopoverColor[];
  onClose: () => void;
  removeColor: () => void;
  selectedIndex?: number;
};

export type EachColorButtonProps = {
  key: string;
  isActive: boolean;
  editor: Editor;
  color: string;
  ["aria-label"]: string;
  tabIndex: number;
  ["data-highlighted"]: boolean;
  onClick: (newColor: string) => void;
};
