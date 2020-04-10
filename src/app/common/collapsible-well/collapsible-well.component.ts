import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "collapsible-well",
  templateUrl: "./collapsible-well.component.html"
})
export class CollapsibleWellComponent implements OnInit {
  visible: boolean;
  constructor() {
    this.visible = true;
  }

  ngOnInit() {}
  toggleContent() {
    this.visible = !this.visible;
  }
}
