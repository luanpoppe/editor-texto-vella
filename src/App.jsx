import { useState } from "react";
import "./App.css";
import Tiptap from "./components/TipTap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Tiptap />
    </div>
  );
}

export default App;
