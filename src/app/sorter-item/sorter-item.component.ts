import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SorterConfig } from '../_models/sorter-config';
import { SorterOutput } from '../_models/sorter-output';

@Component({
  selector: 'app-sorter-item',
  templateUrl: './sorter-item.component.html',
  styleUrls: ['./sorter-item.component.scss']
})
export class SorterItemComponent implements OnInit {

  @Input() config: SorterConfig;
  @Input() currentVal: string;

  @Output() onSortChange = new EventEmitter<SorterOutput>();

  constructor() { }

  ngOnInit() {
  }

  selectConfig(key, val) {
    this.onSortChange.emit(new SorterOutput(key, val));
  }

}
