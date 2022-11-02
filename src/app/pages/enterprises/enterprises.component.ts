import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';
import dataTest from '../reports/data_test.js';

@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.component.html',
  styleUrls: ['./enterprises.component.scss']
})
export class EnterprisesComponent implements OnInit {
  loading = false;
  filter = {
    page: 1,
    perPage: 10,
    name: ''
  }  
  enterprises: any;
  collectionSize=15;
  page=1;

  constructor(
    private generalService: GeneralService,
    private modalService: NgbModal
  ) { 
    generalService.setTitle('Empresas');
  }

  ngOnInit(): void {
    this.load();
  }

  setPagination(event) {

  }

  addEnterprise(content) {

  }

  delete() {

  }

  load() {
    this.enterprises = dataTest.enterprises;
    this.collectionSize = this.enterprises.length;
  }

}
