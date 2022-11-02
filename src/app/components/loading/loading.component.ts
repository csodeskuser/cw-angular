import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnChanges {

  constructor() { }
  @Input() loadingIn: boolean;
  loading: boolean;

  ngOnChanges(): void {
    this.loading = this.loadingIn;
    console.log('cargando', this.loading)    
  }

}
