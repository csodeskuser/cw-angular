import { Component, OnInit } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import config from "../config.js";
import * as moment from "moment";
import { ReportsService } from "src/app/services/reports.service";

//import dataTest from '../data_test.js';
import { dateFormat } from "highcharts";
import { J } from "@angular/cdk/keycodes/index.js";

@Component({
  selector: "app-worked-time",
  templateUrl: "./worked-time.component.html",
  styleUrls: ["./worked-time.component.scss"],
})
export class WorkedTimeComponent implements OnInit {
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
  kk = [];
  filterdata = {
    date: "",
    category_id: 0,
    type: "",
    user_group_id: "",
    user_id: "",
  };
  timecal = [];
  contime = [];
  total: any;
  constructor(
    private generalService: GeneralService,
    private reportServices: ReportsService
  ) {
    generalService.setTitle("Tiempo Trabajado");
  }

  filtered = false;
  config = config;
  loading = false;
  filter: { enterpriseId: 1; groupId: ""; userId: "" };
  page = 1;
  optionNResults = [100, 200, 300, 400, 500, 600];
  nResults = 100;
  categorySelecteds = [1, 5, 4];
  format = "hour";
  typeReport = "weekly";
  apiRoot = "https://app.clowdwork.com/api/v1";

  ngOnInit(): void {
    this.startDate = new Date();
    this.data = [];
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
    var today = new Date();
    var date = this.getDate(today);
    this.startDate = date;

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
    this.loading = true;
    this.totalTimeUsers = [];
    var date = this.getDate(this.startDate);
    this.timecal = [{ user_id: "", name: "", work: [] }];
    this.kk = [{ user_id: "", name: "", work: [] }];
    var check = [];
    for (var i = 0; i < this.categorySelecteds.length; i++) {
      this.filterdata.date = date;
      this.filterdata.type = this.typeReport;
      this.filterdata.category_id = this.categorySelecteds[i];
      this.reportServices.workedTime(this.filterdata).subscribe((res) => {
        this.data = res;
        var gtc = this.getTimereal();
        if(this.typeReport !== 'yearly'){

        for (var b = 0; b < this.data.length; b++) {
          this.kk[b].user_id = this.data[b].id;
          this.kk[b].name = this.data[b].name;
        }
         
        for (var n = 0; n < this.kk.length; n++) {
          if (this.kk[n].user_id === gtc[0].user_id) {
            if (this.format == "hour") {
              for (var y = 0; y < gtc[0].work.length; y++) {
                gtc[0].work[y].total = this.hourToDecimal(gtc[0].work[y].total);
                this.kk[n].work.push(gtc[n].work[y]);
              }
            } else {
              for (var y = 0; y < gtc[0].work.length; y++) {
                this.kk[n].work.push(gtc[n].work[y]);
              }
            }
          }
        }

        check.push(gtc);
        
        if (this.categorySelecteds.length === check.length) {
          var holder = {};

          for (var b = 0; b < this.kk.length; b++) {
            this.timecal[b].user_id = this.kk[b].user_id;
            this.timecal[b].name = this.kk[b].name;
            this.kk[b].work.forEach(function (d) {
              if (holder.hasOwnProperty(d.date)) {
                holder[d.date] = holder[d.date] + d.total;
              } else {
                holder[d.date] = d.total;
              }
            });

            for (var prop in holder) {
              if (this.format == "hour") {
                this.timecal[b].work.push({
                  date: prop,
                  total: this.decimalToHour(holder[prop]),
                  
                });
       
              } else {
                this.timecal[b].work.push({ date: prop, total: holder[prop] });
              }
            }
          }
          if(this.typeReport == 'yearly'){
            this.timecal[0].work.sort((a, b) => parseFloat(a.date) - parseFloat(b.date));
          }
          if (this.data.length === 0) {
            this.timecal = [];
          }
          this.getMaxTimeUser();
          this.getTimeTotal();
        }
      }else{
        this.kk = gtc
        check.push(gtc);
        if (this.categorySelecteds.length === check.length) {
          var holder = {};

          for (var b = 0; b < gtc.length; b++) {
            this.timecal[b].user_id = this.kk[b].user_id;
            this.timecal[b].name = this.kk[b].name;
            this.kk[b].work.forEach(function (d) {
              if (holder.hasOwnProperty(d.date)) {
                holder[d.date] = holder[d.date] + d.total;
              } else {
                holder[d.date] = d.total;
              }
            });

            for (var prop in holder) {
              if (this.format == "hour") {
                this.timecal[b].work.push({
                  date: prop,
                  total: this.decimalToHour(holder[prop]),
                });
              } else {
                this.timecal[b].work.push({ date: prop, total: holder[prop] });
              }
            }
          }
          if (this.data.length === 0) {
             this.timecal = [];
            }
           this.getMaxTimeUser();
           this.getTimeTotal();
        }
      }

        this.loading = false;
      });
    }
    this.createListDates();
  }

  getMaxTimeUser() {
    let timeUsers = [];

    for (let user of this.timecal) {
      let total = 0;
      if (this.format == "hour") {
        for (let time of user.work) {
          total += this.hourToDecimal(time.total);
        }
      } else {
        for (let time of user.work) {
          total += time.total;
        }
      }

      timeUsers.push(total);
    }

    this.maxTimeUser = Math.max(...timeUsers);
  }

  /**
   * Obtiene el tiempo por usuario y fecha
   */
  getTime(date, userId) {
    let timeWorked = "00:00:00";

    for (let user of this.timecal) {
      if (user.user_id == userId) {
        for (let time of user.work) {
          if (this.typeReport != "yearly") {
            if (time.date == date) {
              timeWorked = time.total;
            }
          } else {
            if (time.month == date) {
              timeWorked = time.total;
            }
          }
        }
      }
    }

    if (this.format == "decimal") {
      return this.hourToDecimal(timeWorked);
    }
    return timeWorked;
  }

  /**
   * Obtiene el tiempo total por usuario
   */
  getTimeUser(userId, forceDecimal) {
    let total = 0;
    for (let user of this.timecal) {
      if (user.user_id == userId) {
        for (let time of user.work) {
          if (this.format == "hour") {
            total += this.hourToDecimal(time.total);
          } else {
            total += (time.total);
          }
        }
      }
    }
    
    this.totalTimeUsers.push(total);

    if (this.format == "hour" && !forceDecimal) {

      return this.decimalToHour(total);
      
    }
    return total.toFixed(2);
  }

  /**
   * Obtiene el tiempo total por fecha
   */
  getTimereal() {
    let data = [{ user_id: "", work: [] }];

    if (this.typeReport !== "yearly") {
      for (var i = 0; i < this.listDate.length; i++) {
        for (var j = 0; j < this.data.length; j++) {
          for (var q = 0; q < this.listDate.length; q++) {
            data[j].work.push({ date: this.listDate[q], total: 0 });
          }
          data[j].user_id = this.data[j].id;
          var agent =
            this.data[j].relationships.agent_daily_user_range_activity;
          for (var k = 0; k < agent.length; k++) {
            for (var l = 0; l < data[j].work.length; l++) {
              if (data[j].work[i].date == agent[k].date) {
                data[j].work[i].total = this.hourToDecimal(
                  agent[k].worked_time
                );
              }
            }
          }
        }
      }

      if (this.format == "hour") {
        for (var x = 0; x < this.data.length; x++) {
          for (var m = 0; m < data[x].work.length; m++) {
            var dtoh = this.decimalToHour(data[x].work[m].total);
            data[x].work[m].total = dtoh;
          }
        }
        return data;
      } else {
        return data;
      }

    } else {
      
       let datayear = [{ user_id: 0, name:'', work: [] }];

    
            const res =  Object.entries(this.data).map(([name, work]) => ({ name, work }))
         
       for(var u=0; u<res.length; u++){
          datayear[u].user_id = u;
          datayear[u].name = res[u].name;
          var workVal = Object.values(res[u].work);
          for(var pp=0; pp<this.listDate.length; pp++){
            datayear[u].work.push({date:this.listDate[pp],total:0})
            for(var jj=0; jj<workVal.length; jj++){
              if(datayear[u].work[pp].date == workVal[jj].month){
                datayear[u].work[pp].total =workVal[jj].worked_time_sum
              }
                 
             }
          }

       }
      

       if (this.format == "hour") {
        for (var x = 0; x < this.data.length; x++) {
          for (var m = 0; m < datayear[x].work.length; m++) {
            var dtoh = this.decimalToHour(datayear[x].work[m].total);
            datayear[x].work[m].total = dtoh;
          }
        }
        return datayear;
      } else {
        return datayear;
      }
     
    }
    
  }

  getTimeDate(date) {
    let total = 0;

    for (let user of this.timecal) {
      for (let time of user.work) {
        
          if (date == time.date) {
            if (this.format == "hour") {
              total += this.hourToDecimal(time.total);
            } else {
              total += time.total;
            }
          }
        
      }
    }

    if (this.format == "hour") {
      return this.decimalToHour(total);
    }

    return total;
  }

  /**
   * Obtiene el tiempo total de usuarios y dias, se obtiene el avg de tiempo trabajado
   */
  getTimeTotal() {
    let total = 0;
    let numberUsers = 0;

    for (let user of this.timecal) {
      numberUsers++;
      if (this.format == "hour") {
        for (let time of user.work) {
          total += this.hourToDecimal(time.total);
        }
      } else {
        for (let time of user.work) {
          total += time.total;
        }
      }
    }

    this.avgLineNumber = 0;

    this.avgLineNumber = total / numberUsers;

    this.avgLineString = (this.avgLineNumber * 100) / this.maxTimeUser + "%";

    if (this.format == "hour") {
      this.total = this.decimalToHour(total);
    } else {
      this.total = total;
    }
  }

  /**
   * Calcula el porcentaje total
   */
  totalPercent(totalUser) {
    totalUser = parseFloat(totalUser);

    let percent = (totalUser * 100) / this.maxTimeUser;

    return `${percent}%`;
  }

  /**
   * Convierte el formato hora a decimal
   */
  hourToDecimal(hour) {
    if (hour === 0) {
      hour = "00:00:00";
    }

    let a = hour.split(":");
    let seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

    return parseFloat((seconds / 3600).toFixed(2));
  }

  /**
   * Convierte decimal a hora
   */
  decimalToHour(decimal) {
    let min = Math.floor(Math.abs(decimal));
    let sec = Math.floor((Math.abs(decimal) * 60) % 60);
    let msec = Math.floor((Math.abs(decimal) * 3600) % 60);

    return (
      (min < 10 ? "0" : "") +
      min +
      ":" +
      (sec < 10 ? "0" : "") +
      sec +
      ":" +
      (msec < 10 ? "0" : "") +
      msec
    );
  }

  /**
   * LLenar los dias/fechas de las pagina
   */
  createListDates() {
    this.listDate = [];
    this.txtListDate = [];

    if (this.typeReport == "weekly") {
      this.startDate = moment(this.startDate)
        .startOf("isoWeek")
        .format("YYYY-MM-DD");

      this.startDateTxt = moment(this.startDate)
        .startOf("isoWeek")
        .format("YYYY-MMM-DD");
      this.endDateTxt = moment(this.startDate)
        .endOf("isoWeek")
        .format("YYYY-MMM-DD");

      for (var i = 0; i < 7; i++) {
        this.listDate.push(
          moment(this.startDate).add(i, "days").format("YYYY-MM-DD")
        );
        this.txtListDate.push(
          moment(this.startDate).add(i, "days").format("dddd DD")
        );
      }
    }

    if (this.typeReport == "monthly") {
      this.startDate = moment(this.startDate)
        .startOf("month")
        .format("YYYY-MM-DD");

      this.startDateTxt = moment(this.startDate)
        .startOf("month")
        .format("YYYY-MMM-DD");
      this.endDateTxt = moment(this.startDate)
        .endOf("month")
        .format("YYYY-MMM-DD");

      let numberDays = moment(this.startDate, "YYYY-MM-DD").daysInMonth();

      for (let i = 0; i < numberDays; i++) {
        this.listDate.push(
          moment(this.startDate).add(i, "days").format("YYYY-MM-DD")
        );
        this.txtListDate.push(
          moment(this.startDate).add(i, "days").format("ddd DD")
        );
      }
    }

    if (this.typeReport == "yearly") {
      this.startDate = moment(this.startDate)
        .startOf("year")
        .format("YYYY-MM-DD");

      this.startDateTxt = moment(this.startDate)
        .startOf("year")
        .format("YYYY-MMM");
      this.endDateTxt = moment(this.startDate).endOf("year").format("YYYY-MMM");

      for (var j = 0; j < 12; j++) {
        this.listDate.push(j + 1);
        this.txtListDate.push(
          moment(this.startDate).add(j, "month").format("MMM")
        );
      }
    }
  }

  /**
   * Agregar o restar elemento a la fecha
   */
  addDate(offset) {
    let period = "w";

    switch (this.typeReport) {
      case "weekly":
        period = "w";
        break;
      case "monthly":
        period = "M";
        break;
      case "yearly":
        period = "y";
        break;
    }

    this.startDate = moment(this.startDate).add(offset, period);

    this.loadData();
  }

  getDate(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  getFilter() {
    if (this.filter !== undefined) {
      if (this.filter.userId !== null) {
        this.filterdata.user_group_id = this.filter.groupId;
        this.filterdata.user_id = this.filter.userId;
        this.loadData();
      }
    }
  }

  export(type){

    
    if(type == "xls"){
      var data={
        date: this.startDate,
        category_ids: this.categorySelecteds,
        enterprise_id: 1,
        type:this.typeReport,
        format:1,
       type_report: type
       }
      this.reportServices.workedTimeExport(data).subscribe((data)=>{
  
        const contentType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        const blob = new Blob([data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
    
    }else{
       data={
        date: this.startDate,
        category_ids: this.categorySelecteds,
        enterprise_id: 1,
        type:this.typeReport,
        format:1,
        type_report: type
       }
      this.reportServices.workedTimeExport(data).subscribe((data)=>{
        data;
  
        const contentType =
          "application/pdf";
        const blob = new Blob([data], { type: contentType });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'usegroupPDFFile.pdf';
        link.click();
        window.URL.revokeObjectURL(link.href);
        // const url = window.URL.createObjectURL(blob);
        // window.open(url);
      });
    }
 }

}
