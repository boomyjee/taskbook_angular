import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SorterConfig } from '../_models/sorter-config';
import { SorterOutput } from '../_models/sorter-output';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent implements OnInit {

  private configMap: {} = {};

  @Input() configs: Array<SorterConfig>;

  @Output() onSortChange = new EventEmitter<SorterOutput>();

  constructor() { }

  ngOnInit() {

  }

  selectConfig(confOut) {
    this.configMap[confOut.key] = confOut.value;

    this.onSortChange.emit(confOut);
  }

}
