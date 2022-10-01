import $ from "jquery";

export class ShareCopyButton {
  constructor() {
    this.copyShareButton = $("#btnShareDb");
    this.inputShareDb = $("#txtShareDb");
    this.currentDbUuid = undefined;
    this.type = "share DB";
    this.initEvent();
  }

  setLink(linkUrl) {
    this.inputShareDb.show();
    this.inputShareDb.val(linkUrl);
    this.copyShareButton.text("copy");
    this.type = "copy";
  }

  setDbUuid(currentDbUuid) {
    this.currentDbUuid = currentDbUuid;
  }

  initEvent() {
    //share db link button
    let self = this;
    this.copyShareButton.on("click", function () {
      if (self.type == "share DB") {
        let tempShareLink = window.location.href;
        tempShareLink += "?dbid=" + self.currentDbUuid;
        self.setLink(tempShareLink);
      } //copy url
      else {
        self.inputShareDb.select();
        // Copy the text to clipboard
        navigator.clipboard.writeText(self.inputShareDb.val());
      }
    });
  }
}
