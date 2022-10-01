import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.scss";

import $ from "jquery";
import { v4 as uuidv4 } from "uuid";

// code mirror imports
import { defaultKeymap } from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { sql } from "@codemirror/lang-sql";

// local imports
import { Alert } from "./Alert";
import { DisplayResult } from "./DisplayResult";
import { SqlUtil } from "./SqlUtil";
import { ShareCopyButton } from "./ShareCopyButton";


const sqlWorldEditor = document.getElementById("sqlWorldEditor");

//create uuid
let CURRENT_DB_UUID = undefined;
let SHARED_DB = false;

const sqlUtil = new SqlUtil();
const shareCopyButton = new ShareCopyButton();

//function check for uuid in url or create new one
function checkSharedDbUuid() {
  let tempUrlParameterString = window.location.search;
  const urlParameters = new URLSearchParams(tempUrlParameterString);
  if (urlParameters.get("dbid") != undefined) {
    CURRENT_DB_UUID = urlParameters.get("dbid");
    SHARED_DB = true;
    shareCopyButton.setLink(window.location.href);
  } else {
    CURRENT_DB_UUID = uuidv4();
    SHARED_DB = false;
  }
}

checkSharedDbUuid();
shareCopyButton.setDbUuid(CURRENT_DB_UUID);

//////////////////////
//CodeMirror Editor //
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

let codeMirror = new EditorView({
  doc: "SELECT * FROM users",
  extensions: [basicSetup, myTheme, sql(), keymap.of(defaultKeymap)],
  parent: sqlWorldEditor,
});

//Run Button
$("#btnExecuteSql").on("click", function () {
  let codeMirrorValue = codeMirror.state.doc.toString();
  console.log(codeMirrorValue);

  (async () => {
    let tempQueryInfos = sqlUtil.getQueryInfos(codeMirrorValue);
    let data = await globalDatabaseCRUD(codeMirrorValue);

    //globalHideLoader("loaderDIV");
    if (data["error"] == "") {
      console.log(data["result"]);
      new DisplayResult(data["result"], tempQueryInfos);
    } else {
      const tempError = data["error"]["errorInfo"];
      new Alert(tempError, "danger");
    }
  })();
});

////

// universal CRUD function
async function globalDatabaseCRUD(query) {
  return fetch("http://127.0.0.1/db/db_CRUD.php", {
    method: "post",
    body: JSON.stringify(query),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(function (error) {
      return error;
    });
}
