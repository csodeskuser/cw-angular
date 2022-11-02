import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import * as Highcharts from 'highcharts';
import addMore from "highcharts/highcharts-more";
addMore(Highcharts)
import * as moment from 'moment';
import config from '../config.js';
import { ReportsService } from 'src/app/services/reports.service';
import Exporting from "highcharts/modules/exporting";


@Component({
  selector: 'app-daily-productivity',
  templateUrl: './daily-productivity.component.html',
  styleUrls: ['./daily-productivity.component.scss']
})
export class DailyProductivityComponent implements OnInit {
  listTableReport: any;
  svg: string;
  chartRef: Highcharts.Chart;
  cbTimes = 0;

  constructor(
    private generalService: GeneralService,
    private ReportsService: ReportsService    
  ) {
    generalService.setTitle('Productividad Diaria');
    Exporting(Highcharts);
  }
  dataFilter: any;
  startdate: any;
  enddate: any;
  filtered = false;
  loading = false;
  filter: {enterpriseId:1, groupId:0, userId:0};
  page = 1;
  optionNResults = [100, 200, 300, 400, 500, 600];
  nResults = 100;  
  highcharts = Highcharts;
  chartOptions: any;    
  dailyProductivitydata: any; 
  proHour:number=8;
  ngOnInit(): void {
    this.enddate = moment().format("YYYY-MM-DD");   
    this.startdate = moment(this.enddate).subtract(7, 'days').format("YYYY-MM-DD");  
    this.load();   
   // this.chargeOptionDailyProductivity();    
  }

  valueHours(time) {
      let Hours = String(time);
      let H = Hours.split(":")[0];
      let M = Hours.split(":")[1];
      let S = Hours.split(":")[2];
      time = parseFloat(H + "." + M);

      return time;
   }  

   load() {
   // console.log("filter",this.filter);
    
     this.dataFilter ={
      start_date :this.startdate,
      end_date: this.enddate,
      user_group_id: '',
      user_id: '',
      productivity_hour: this.proHour
     }
    
     if(this.filter !== undefined && this.filter != null){
      this.dataFilter.user_group_id = this.filter.groupId,
      this.dataFilter.user_id = this.filter.userId
     }
    // console.log("dataFilter",this.dataFilter);
 this.ReportsService.activityDaily(this.dataFilter).subscribe((res)=>{
  this.dailyProductivitydata= res;
  this.chargeOptionDailyProductivity();

       for (var i = 0; i < res.length; i++) {
          var avg = res[i].average_percentage;

          res[i].average_percentage = parseFloat(avg).toFixed(2);
          res[i].productive_time = this.secondsTohms(res[i].productive_time);
          res[i].none_productive_time = this.secondsTohms(res[i].none_productive_time);
          res[i].uncategorized_time = this.secondsTohms(res[i].uncategorized_time);
          res[i].manual_time = this.secondsTohms(res[i].manual_time);
          
      }
      this.listTableReport = res;    
   
 }) 
        this.filter = null;
   }

  chargeOptionDailyProductivity() {
    let categoriesDay = this.dailyProductivitydata.map((value) => moment(value.date).format('MMM DD'));
    let dataProductive = this.dailyProductivitydata.map(value => this.valueHours((value.productive_time)?value.productive_time:'00:00:00'));
    let dataUncategorized = this.dailyProductivitydata.map(value => this.valueHours((value.uncategorized_time)?value.uncategorized_time:'00:00:00'));
    let dataTimeManual = this.dailyProductivitydata.map(value => this.valueHours((value.manual_time_system)?value.manual_time_system:'00:00:00'));
    // let dataMeeting = this.dailyProductivitydata.map(value => this.valueHours((value.manual_time)?value.manual_time:'00:00:00'));
    let dataNotProductive = this.dailyProductivitydata.map(value => this.valueHours((value.none_productive_time)?value.none_productive_time:'00:00:00'));
    let dataAvg = this.dailyProductivitydata.map(value => this.valueHours((value.average_percentage)?value.average_percentage.toFixed(2):'00:00:00'));
    // this.listTableReport = data.map(value => {
    //   return {
    //     date: moment(value.date).format("MMM DD"),
    //     productive: this.valueHours((value.productive_time)?value.productive_time:'00:00:00'),
    //     not_productive: this.valueHours((value.improductive_time)?value.improductive_time:'00:00:00'),
    //     uncategorized: this.valueHours((value.uncategorized_time)?value.uncategorized_time:'00:00:00'),
    //     meeting: this.valueHours((value.manual_time)?value.manual_time:'00:00:00'),
    //     manual_time: this.valueHours((value.manual_time_system)?value.manual_time_system:'00:00:00'),
    //     duration: value.total,
    //     avg_perc: value.avg_perc.toFixed(2),
    //   }
    // });    

    this.chartOptions = {   
      chart: {
        type: "area",
      },
      exporting: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },

      title: {
        text: "Daily Productivity",
      },
      xAxis: {
        categories: categoriesDay,
        tickmarkPlacement: "on",
        title: {
          enabled: false,
        },
      },
      yAxis: [
        {
          title: {
            text: "Time",
          },
          labels: {
            formatter: function () {
              return this.value + " h";
            },
          },
        },
        {
          title: {
            text: "% Productivity",
          },
          labels: {
            formatter: function () {
              return this.value + " %";
            },
          },
          opposite: true,
        },
      ],
      tooltip: {
        shared: true,
      },
      plotOptions: {
        area: {
          stacking: "normal",
          lineColor: "#666666",
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: "#666666",
          },
        },
      },
      series: [
        {
          name: "Not Productive",
          data: dataNotProductive,
          yAxis: 0,
          tooltip: { valueSuffix: " Hours" },
          color: config.color.improductive,
        },
        {
          name: "Manual Time",
          data: dataTimeManual,
          yAxis: 0,
          tooltip: { valueSuffix: " Hours" },
          color: config.color.manual,
        },          
        // {
        //   name: "Meeting",
        //   data: dataMeeting,
        //   yAxis: 0,
        //   tooltip: { valueSuffix: " Horas" },
        //   color: config.color.meeting,
        // },
        {
          name: "Uncategorized",
          data: dataUncategorized,
          yAxis: 0,
          tooltip: { valueSuffix: " Hours" },
          color: config.color.uncategorized
        },
        {
          name: "Productive",
          data: dataProductive,
          yAxis: 0,
          tooltip: { valueSuffix: " Hours" },
          color: config.color.productive
        },
        {
          name: "% Productivity",
          tooltip: { valueSuffix: " %" },
          data: dataAvg,
          color: "#ff0000",
          type: "spline",
          yAxis: 1,
        },
      ],       
    };    
  }

  secondsTohms(seconds) {
    seconds = Number(seconds);
 //   var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    

    return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s; 
    }

    chartCb = chart => {
      this.chartRef = Highcharts.charts[0];
      this.cbTimes++;
    };
  

    export(type){
      try {
        this.svg = this.chartRef.getSVG();
  
        var graph = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this.svg)));
      //  console.log('got b64 string:',chart_user_activity)
  
  
      } catch (err) {
        this.svg = err;
        
      } 
      
      if(type == "xls"){
        var data={
          start_date :this.startdate,
          end_date: this.enddate,
          graph: graph,
          type_report: type
         }
        this.ReportsService.dailyActExport(data).subscribe((data)=>{
    
          const contentType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          const blob = new Blob([data], { type: contentType });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        });
      
      }else{
        var data1={
          start_date :this.startdate,
          end_date: this.enddate,
          graph: graph,
          type_report: type
         }
        this.ReportsService.dailyActExport(data1).subscribe((data)=>{
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
