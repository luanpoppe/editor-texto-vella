/* eslint-disable @typescript-eslint/ban-ts-comment */
import Tiptap from "./components/TipTap";

import { SimpleEditor } from "./components/tiptap-templates/simple/simple-editor";

function testeBubbleForaDoApp(param1: string) {
  console.log("OPAAAA ESTE TEXTO TEM QUE APARECER HEIN");
  alert(
    "VALOR DO PARAMETRO: " +
      param1 +
      " Valor parâmetro organizado: " +
      // @ts-ignore
      properties.param1
  );
}

(window as any).testeBubbleForaDoApp = testeBubbleForaDoApp;

function App() {
  function testeBubbleDentroDoApp() {
    console.log("OPAAAA ESTE TEXTO TEM QUE APARECER HEIN");
    alert("OPAAAA SE APARECEU É PQ DEU BOM");
  }

  return (
    <>
      {/* <Tiptap /> */}

      <SimpleEditor />
    </>
  );
}

export default App;
