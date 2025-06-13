import { Button } from "@/components/tiptap-ui-primitive/button";
import { EachColorButtonProps } from "./select-color.model";

export function EachColorButton(props: EachColorButtonProps) {
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
