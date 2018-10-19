import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  @Input() hasJustView: boolean;
  @Input() title: string;
  @Input() isHidden: boolean;
  constructor() { }

  ngOnInit() {
  }

}
