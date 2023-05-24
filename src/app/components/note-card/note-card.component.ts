import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit, AfterViewInit {

  @Input() title!: string;
  @Input() body!: string;

  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null)
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10)

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block')
    } else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none')
    }
  }

  ngOnInit() {}

}
