/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from "react";
import Tiptap from "./components/TipTap";

import { SimpleEditor } from "./components/tiptap-templates/simple/simple-editor";

function App() {
  useEffect(() => {
    //@ts-ignore
    bubble_fn_editorFoiInicializado();
    console.log("INICIOU APP");
  }, []);

  return (
    <>
      {/* <Tiptap /> */}

      <SimpleEditor />
    </>
  );
}

export default App;
