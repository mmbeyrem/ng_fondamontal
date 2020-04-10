import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Inject,
} from "@angular/core";
import { JQ } from "../JQuery.service";

@Component({
  selector: "simple-modal",
  templateUrl: "./simple-modal.component.html",
  styles: [
    `
      .modal-body {
        height: 250px;
        overflow-y: scroll;
      }
    `,
  ],
})
export class SimpleModalComponent implements OnInit {
  @Input() title: string;
  @Input() closeOnBodyClick: any;
  @Input() elementId: string;
  @ViewChild("modalcontainer") containerEl: ElementRef;
  constructor(@Inject(JQ) private $: any) {}
  Close() {
    debugger;
    if (this.closeOnBodyClick == "")
      this.$(this.containerEl.nativeElement).modal("hide");
  }
  ngOnInit() {}
}
