/* eslint-disable @typescript-eslint/ban-ts-comment */
import Tiptap from "./components/TipTap";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "./components/ui/accordion";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

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

      {/* <h1 className="text-red-500">Olá</h1> */}

      {/* <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs> */}
    </>
  );
}

export default App;
