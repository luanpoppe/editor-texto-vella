import { PaginationPlus } from "./../../../../node_modules/tiptap-pagination-plus/src/PaginationPlus";
// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Underline } from "@tiptap/extension-underline";
import { ExportDocx } from "@tiptap-pro/extension-export-docx";
import UniqueID from "@tiptap-pro/extension-unique-id";
import { Link } from "@/components/tiptap-extension/link-extension";
import { Selection } from "@/components/tiptap-extension/selection-extension";
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension";
import FontSize from "@/utils/customFontSizeExtension";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import FileHandler from "@tiptap-pro/extension-file-handler";

import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import { ExtensionsConfig } from "./extensions-config";

export const tipTapExtensions = [
  StarterKit,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Underline,
  TaskList,
  TaskItem.configure({ nested: true }),
  Highlight.configure({ multicolor: true }),
  Image,
  Typography,
  Superscript,
  Subscript,
  FontSize,
  FontFamily,
  TextStyle,
  Color,
  Selection,
  ImageUploadNode.configure({
    accept: "image/*",
    maxSize: MAX_FILE_SIZE,
    limit: 3,
    upload: handleImageUpload,
    onError: (error) => console.error("Upload failed:", error),
  }),
  TrailingNode,
  Link.configure({ openOnClick: true }),
  ExportDocx.configure(ExtensionsConfig.exportDocx()),
  UniqueID.configure({
    types: ["heading", "paragraph"],
  }),
  PaginationPlus.configure({
    pageHeight: 842, // Altura de uma págiona A4 em pixels
    pageGap: 20, // Gap between pages in pixels
    pageBreakBackground: "#f9fbfd", // Background color for page gaps
    pageHeaderHeight: 50, // Height of page header/footer in pixels
    // footerText: "Made with ❤️ by Romik", // Custom footer text
  }),
  FileHandler.configure(ExtensionsConfig.fileHandler()),
];
