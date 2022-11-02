import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import config from '../config.js';
import * as moment from 'moment';
//import { ReportsService } from 'src/app/services/reports.service.js';

import dataTest from '../data_test.js';    

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {
  txtListDate: any[];
  listDate: any[];
  startDate: any;
  numDaysMonth: number;
  data: any;
  numberDates: any;
  avgLineString: any;
  avgLineNumber: any;
  totalTimeUsers: any;
  maxTimeUser: number;
  endDateTxt: string;
  startDateTxt: string;

  constructor(
    private generalService: GeneralService,
    //private reportServices: ReportsService
  ) { 
    generalService.setTitle('Automatic timesheets');
  }

  filtered = false;
  config = config;
  loading = false;
  filter: {enterpriseId:1, groupId:0, userId:0};
  page = 1;
  optionNResults = [100, 200, 300, 400, 500, 600];
  nResults = 100;
  categorySelecteds = [1, 3];
  format = 'hour';
  typeReport='weekly';
  apiRoot = 'https://app.clowdwork.com/api/v1';

  ngOnInit(): void {
    this.startDate = '2021-05-28';//new Date();
    this.data = dataTest.workedtime;
    this.loadData();
  }

  /**
   * Cambia el formato de hora a decimal y viceversa
   */
  changeFormat(format) {
    this.format = format;
    this.loadData();
  }

  /**
   * Cambia el periodo a ser mostrado
   */
  changePeriod(event) {
    this.typeReport = event;
    this.startDate = '2021-05-28';//new Date();
    
    this.loadData();
  }

  getWorkedTime() {
   // this.reportServices.getWorkedTime().subscribe(
   //   res=>{
    //    console.log('resp', res);
    //  },
    //  error=>{
    //    console.log('error', error);
     // }
   // )
  }

  loadData() {
    this.totalTimeUsers = [];
    if(this.typeReport=='weekly') {
      this.data = dataTest.workedtime;  
    }

    if(this.typeReport=='monthly') {
      this.data = dataTest.workedTimeMonthly;        
    }  

    if(this.typeReport=='yearly') {
      this.data = dataTest.workedTimeYearly;        
    }     

    this.createListDates();    
    this.getMaxTimeUser();
  } 

  getMaxTimeUser() {
    let timeUsers = [];

    for(let user of this.data) {
      let total = 0;
      for(let time of user.times) {
        total += this.hourToDecimal(time.time_worked);
      }
      
      timeUsers.push(total);
    }

    this.maxTimeUser = Math.max(...timeUsers);
  }
  
  /**
   * Obtiene el tiempo por usuario y fecha
   */
  getTime(date, userId) {

    let timeWorked = '00:00:00';

    for(let user of this.data) {
      if(user.id==userId) {
        for(let time of user.times) {
          if(this.typeReport!='yearly') {
            if(time.date==date) {
              timeWorked = time.time_worked;
            }
          }else{
            if(time.month==date) {
              timeWorked = time.time_worked;
            }
          }
        }
      }
    }

    if(this.format=='decimal') {
      return this.hourToDecimal(timeWorked);
    }

    return timeWorked;
  }

  /**
   * Obtiene el tiempo total por usuario
   */
  getTimeUser(userId, forceDecimal) {
    let total = 0;

    for(let user of this.data) {
      if(user.id==userId) {
        for(let time of user.times) {
          total += this.hourToDecimal(time.time_worked);
        }
      }
    }    

    this.totalTimeUsers.push(total);

    if(this.format=='hour' && !forceDecimal) {
      return this.decimalToHour(total);
    }    

    return total.toFixed(2);
  }

  /**
   * Obtiene el tiempo total por fecha
   */
  getTimeDate(date) {
    let total = 0;

    for(let user of this.data) {
      for(let time of user.times) {
        if(this.typeReport!='yearly') {
          if(date==time.date) {
            total += this.hourToDecimal(time.time_worked);
          }
        }else{
          if(date==time.month) {
            total += this.hourToDecimal(time.time_worked);
          }
        }
      }
    }

    if(this.format=='hour') {
      return this.decimalToHour(total);
    }    

    return total.toFixed(2);    
  }

  /**
   * Obtiene el tiempo total de usuarios y dias, se obtiene el avg de tiempo trabajado
   */
  getTimeTotal() {
    let total = 0;
    let numberUsers = 0;

    for(let user of this.data) {
      numberUsers++;
      for(let time of user.times) {        
        total += this.hourToDecimal(time.time_worked);
      }
    }

    this.avgLineNumber = 0;

    this.avgLineNumber = total/numberUsers;

    this.avgLineString = (this.avgLineNumber*100/this.maxTimeUser)+'%';    

    if(this.format=='hour') {
      return this.decimalToHour(total);
    }          

    return total.toFixed(2);        
  }

  /**
   * Calcula el porcentaje total
   */
  totalPercent(totalUser) {
    totalUser = parseFloat(totalUser);

    let percent = totalUser*100/this.maxTimeUser;

    return `${percent}%`;
  }

  /**
   * Convierte el formato hora a decimal
   */
  hourToDecimal(hour) {
    let a = hour.split(':');
    let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    return parseFloat((seconds/3600).toFixed(2));
  }  

  /**
   * Convierte decimal a hora
   */
  decimalToHour(decimal) {
    let min = Math.floor(Math.abs(decimal));
    let sec = Math.floor((Math.abs(decimal) * 60) % 60);
    let msec = Math.floor((Math.abs(decimal) * 3600) % 60);

    return (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec + ":" + (msec < 10 ? "0" : "") + msec;    
  }

  /**
   * LLenar los dias/fechas de las pagina
   */
  createListDates() {
    this.listDate = [];
    this.txtListDate = [];

    if (this.typeReport == 'weekly') {
      this.startDate = moment(this.startDate).startOf('isoWeek').format('YYYY-MM-DD');      

      this.startDateTxt = moment(this.startDate).startOf('isoWeek').format('YYYY-MMM-DD');
      this.endDateTxt = moment(this.startDate).endOf('isoWeek').format('YYYY-MMM-DD');      

      for (var i = 0; i < 7; i++) {
        this.listDate.push(moment(this.startDate).add((i), 'days').format('YYYY-MM-DD'));
        this.txtListDate.push(moment(this.startDate).add((i), 'days').format('dddd DD'));
      }
    } 
    
    if (this.typeReport == 'monthly') {
      this.startDate = moment(this.startDate).startOf('month').format('YYYY-MM-DD');        

      this.startDateTxt = moment(this.startDate).startOf('month').format('YYYY-MMM-DD');
      this.endDateTxt = moment(this.startDate).endOf('month').format('YYYY-MMM-DD');                

      let numberDays = moment(this.startDate, "YYYY-MM-DD").daysInMonth();

      for(let i=0; i<numberDays; i++) {
        this.listDate.push(moment(this.startDate).add((i), 'days').format('YYYY-MM-DD'));
        this.txtListDate.push(moment(this.startDate).add((i), 'days').format('ddd DD'));
      }
    }
    
    if (this.typeReport == 'yearly') {
      this.startDate = moment(this.startDate).startOf('year').format('YYYY-MM-DD');            

      this.startDateTxt = moment(this.startDate).startOf('year').format('YYYY-MMM');
      this.endDateTxt = moment(this.startDate).endOf('year').format('YYYY-MMM');                      

      for (var j = 0; j < 12; j++) {
          this.listDate.push(j + 1);
          this.txtListDate.push(moment(this.startDate).add(j, 'month').format('MMM'));
      }
    }
  }

  /**
   * Agregar o restar elemento a la fecha
   */
  addDate(offset) {
    let period = 'w';    
    
    switch (this.typeReport) {
      case 'weekly': period = 'w'; break;
      case 'monthly': period = 'M'; break;
      case 'yearly': period = 'y'; break;
    }

    this.startDate = moment(this.startDate).add(offset, period);  
    
    this.loadData();
  }
}
