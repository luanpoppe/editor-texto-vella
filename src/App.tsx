/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from "react";
import Tiptap from "./components/TipTap";

import { SimpleEditor } from "./components/tiptap-templates/simple/simple-editor";
import { env } from "./utils/env-variables";
import { SendToBubble } from "./bubble-integration/send-to-bubble";

function App() {
  useEffect(() => {
    if (env.VITE_IS_LOCAL) return;
    SendToBubble.editorFoiInicializado();
  }, []);

  return (
    <>
      {/* <Tiptap /> */}

      <SimpleEditor />
    </>
  );
}

export default App;
