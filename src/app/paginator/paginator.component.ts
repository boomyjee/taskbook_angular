import { Component, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { PageMark } from '../_models/page-mark';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {

  private pageMarks: Array<PageMark>;

  @Input() currentPage: number;
  @Input() total: number;
  @Input() perPage: number;

  @Output() onPageChange = new EventEmitter<string>();

  constructor() { }

  ngOnChanges() {
    const total = +(this.total || 0);
    const currentPage = +(this.currentPage || 1);
    const perPage = +(this.perPage || 3);

    this.recalc(currentPage, total, perPage);
  }

  recalc(curr, total, perPage) {
    const pages = [];
    const maxPage = Math.ceil(total/perPage);

    for(let i = 1; i <= maxPage; i++) {
      pages.push(new PageMark(
        i + '',
        (page) => this.goPage(page),
        i === curr
      ));
    }

    this.pageMarks = pages;
  }

  goBack() {
    const currentPage = +(this.currentPage || 1);

    if (currentPage === 1) {
      return false;
    }

    return this.goPage(currentPage - 1);
  }

  goNext() {
    const total = +(this.total || 0);
    const currentPage = +(this.currentPage || 1);
    const perPage = +(this.perPage || 3);
    const maxPage = Math.ceil(total/perPage);

    if (currentPage === maxPage) {
      return false;
    }

    return this.goPage(currentPage + 1);
  }

  goPage(page) {
    this.onPageChange.emit(page);
  }

}
