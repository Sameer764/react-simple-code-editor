import { useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './index.css'

function App() {

const [codeString, setCodeString] = useState(`
  import React from "react";
  import ReactDOM from "react-dom";

  function App() {
    return (
      <h1>Hello world</h1>
    );
  }

  ReactDOM.render(<App />, document.getElementById("root"));

`);
  useEffect(()=>{
    setCodeString(codeString);
  },[codeString])

function check_tab(event) {
  let code = codeString;
  // console.log(element)
  if(event.key == "Tab") {
    /* Tab key pressed */
    event.preventDefault(); // stop normal
    let before_tab = code.slice(0, event.target.selectionStart); // text before tab
    let after_tab = code.slice(event.target.selectionEnd, event.target.value.length); // text after tab
    let cursor_pos = event.target.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
    event.target.value = before_tab + "\t" + after_tab; // add tab char
    // move cursor
    event.target.selectionStart = cursor_pos;
    event.target.selectionEnd = cursor_pos;
    setCodeString(event.target.value); // Update text to include indent
  }
}
 
return (
  <div className='container'>
    <h1 className='text-center text-3xl font-bold my-2.5'>react-simple-code-editor</h1>
    <p className='text-center my-2.5'>A simple no-frills code editor with syntax highlighting.</p>
    <div className='editor-container'>
      <textarea
        className="overflow-hidden absolute inset-0 resize-none bg-transparent p-2 font-mono text-transparent caret-pink-500 outline-none"
        onKeyDown={(event)=>check_tab(event)}
        value={codeString}
        onChange={(e) => setCodeString(e.target.value)}
        spellcheck="false"
      />
      <SyntaxHighlighter
        language="jsx"
        style={docco}
        customStyle={{
          flex: '1',
          background: '#fafafa'
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  </div>
);
}

export default App
