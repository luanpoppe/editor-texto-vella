import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { Button, ButtonProps } from "@/components/tiptap-ui-primitive/button";
import { forwardRef } from "react";

const Component = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, children } = props;

  return (
    <Button
      type="button"
      className={className}
      data-style="ghost"
      data-appearance="default"
      role="button"
      tabIndex={-1}
      aria-label="Highlight text"
      tooltip="Highlight"
      ref={ref}
      {...props}
    >
      {children || <HighlighterIcon className="tiptap-button-icon" />}
    </Button>
  );
});

export const ColorHighlightPopoverButton = Component;
