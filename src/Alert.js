import $ from "jquery";

export class Alert {
  constructor(message, type) {
    this.container = $("#alerts");
    this.message = message;
    this.type = type;
    this.create();
  }

  create() {
    let tempAlert = "";
    if (this.type == "danger") {
      tempAlert += "<div class='alert alert-danger alert-dismissible' role='alert'>";
    } else if (this.type == "success") {
      tempAlert += "<div class='alert alert-success alert-dismissible' role='alert'>";
    }

    tempAlert += this.message;
    tempAlert += "<button type='button' id='btnAlertClose' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
    tempAlert += "</div>";

    this.container.html(tempAlert);
    this.initEvent();
  }

  initEvent() {
    const self = this;
    $("#btnAlertClose").on("click", function () {
      self.reset();
    });
  }
  reset() {
    this.container.html("");
  }
  hide() {
    this.container.hide();
  }
  show() {
    this.container.show();
  }
}
