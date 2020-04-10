import { Directive, OnInit, Inject, ElementRef, Input } from "@angular/core";
import { JQ } from "./JQuery.service";

@Directive({
  selector: "[modal-trigger]",
})
export class ModalTriggerDirective implements OnInit {
  private el: HTMLElement;
  @Input("modal-trigger") modalUd: string;
  constructor(ref: ElementRef, @Inject(JQ) private $: any) {
    this.el = ref.nativeElement;
  }
  ngOnInit(): void {
    this.el.addEventListener("click", (e) => {
      this.$(`#${this.modalUd}`).modal({});
    });
  }
}
