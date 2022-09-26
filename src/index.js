import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.scss";

import $ from "jquery";

import { defaultKeymap } from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { sql } from "@codemirror/lang-sql";

import { MyClass } from "./MyClass";



//bootstrap button
const app = document.getElementById("app");
const sqlWorldEditor = document.getElementById("sqlWorldEditor");

//CodeMirror Editor
const myTheme = EditorView.theme({
  //Editorbereich und grauer Rand mit Zeilennummern
  ".cm-content, .cm-gutter": {
    minHeight: "150px",
  },
  //editor border
  "&.cm-editor": {
    maxHeight: "150px",
    outline: "1px solid grey",
  },
  //editor border when focused
  "&.cm-editor.cm-focused": {
    outline: "1px solid grey",
  },
});

let view = new EditorView({
  doc: "SELECT * FROM schueler",
  extensions: [basicSetup, myTheme, sql(), keymap.of(defaultKeymap)],
  parent: sqlWorldEditor,
});

//Run Button
$("#btnExecuteSql").on("click", function () {
  let codeMirrorValue = view.state.doc.toString();
  console.log(codeMirrorValue);
});
