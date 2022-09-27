import $ from "jquery";
import { Alert } from "./Alert";

export class DisplayResult {
  constructor(result, queryInfos) {
    this.container = $("#result");
    this.result = result;
    this.queryInfos = queryInfos;
    this.checkResult(queryInfos.queryType);
  }

  checkResult() {
    console.log(this.queryInfos.queryType);
    if (this.queryInfos.queryType == "SELECT") {
      this.createTable();
    } else if (this.queryInfos.queryType == "CREATE") {
      new Alert("Table " + this.queryInfos.queryTable + " created", "success");
    }
  }

  createTable() {
    let tempTable = "";
    tempTable += "<table class='table'>";
    tempTable += "<thead>";
    Object.keys(this.result[0]).forEach((columnHeader) => {
      tempTable += "<th>" + columnHeader + "</th>";
    });
    tempTable += "</thead>";
    tempTable += "<tbody>";
    this.result.forEach((row) => {
      tempTable += "<tr>";
      Object.values(row).forEach((column) => {
        tempTable += "<td>" + column + "</td>";
      });
      tempTable += "</tr>";
    });
    tempTable += "</tbody>";
    $("#result").html(tempTable);
  }
}
