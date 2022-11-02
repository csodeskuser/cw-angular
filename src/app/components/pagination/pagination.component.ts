import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  constructor() { }

  nItems = [10, 50, 100, 500];
  @Input() page;
  @Input() collectionSize;
  @Input() pageSize;
  @Output() paginationOut = new EventEmitter<object>();

  ngOnChanges(): void {}

  pageChange() {
    this.paginationOut.emit({
      page: this.page,
      perPage: this.pageSize
    });
  }

  selectPageSize() {
    this.paginationOut.emit({
      page: this.page,
      perPage: this.pageSize
    });    
  }
}
