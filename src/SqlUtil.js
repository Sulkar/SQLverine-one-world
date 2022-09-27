import $ from "jquery";

export class SqlUtil {
  constructor() {
    this.lastQueryTable = undefined;
    this.lastQueryType = undefined;
  }

  getQueryType(query) {
    if (query.match(/CREATE TABLE/i)) {
      this.lastQueryType = "CREATE";
      this.lastQueryTable = query.match(/CREATE TABLE\s(\w+)/i)[1];
    } else if (query.match(/SELECT/i)) {
      this.lastQueryType = "SELECT";
      this.lastQueryTable = query.match(/FROM\s(\w+)/i)[1];
    } else if (query.match(/DROP TABLE/i)) {
      this.lastQueryType = "DROP TABLE";
      this.lastQueryTable = query.match(/DROP TABLE\s(\w+)/i)[1];
    }
    return this.lastQueryType;
  }
  getQueryTable() {
    return this.lastQueryTable;
  }
  getQueryInfos(query) {
    this.getQueryType(query);
    const tempInfos = {
      queryType: this.lastQueryType,
      queryTable: this.lastQueryTable,
    };
    return tempInfos;
  }
}
