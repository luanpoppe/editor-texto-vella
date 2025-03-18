import { useCurrentEditor } from "@tiptap/react";
import { useState } from "react";

const fontSizes = [12, 14, 16, 18, 20, 24, 32, 40];

export const FontSizeSelector = () => {
  const [selectedSize, setSelectedSize] = useState(16);

  const { editor } = useCurrentEditor();

  const handleFontSizeChange = (size) => {
    if (editor) {
      console.log("editor: ", editor);
      editor.chain().focus().setFontSize(size).run();
      setSelectedSize(size);
    }
  };

  if (!editor) return null;

  return (
    <div>
      <select
        value={selectedSize}
        onChange={(e) => handleFontSizeChange(Number(e.target.value))}
      >
        {fontSizes.map((size) => (
          <option key={size} value={size}>
            {size}px
          </option>
        ))}
      </select>
    </div>
  );
};
