import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import * as Highcharts from 'highcharts';
import addMore from "highcharts/highcharts-more";
addMore(Highcharts)

import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import config from '../config.js';
import dataTest from '../data_test.js';
import { ReportsService } from 'src/app/services/reports.service';
import Exporting from "highcharts/modules/exporting";
import { faDownload } from '@fortawesome/fontawesome-free'




@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {
  title: any;
  userActivities: any;
  userActivitiesrange: any;
  datafilter: any;
  svg: string;
  spSvg: string;
  cbTimes = 0;
  cbspTimes = 0;
  chartRef: Highcharts.Chart;
  chartspRef: Highcharts.Chart;
  constructor(
    private generalService: GeneralService,
    //private translation: TranslationService,
    private translate: TranslateService,
    private ReportsService: ReportsService,
  ) { 
    generalService.setTitle('Actividad por Usuario');
    Exporting(Highcharts);
  }  

  date: any;
  filtered = false;
  config = config;
  loading = false;
  filter: {enterpriseId:1, groupId:0, userId:0};
  page = 1;
  optionNResults = [100, 200, 300, 400, 500, 600];
  nResults = 100;
  chartOptionsUserActivity: any;
  chartOptionsRange: any;  

  highcharts = Highcharts;

  highcharts2 = Highcharts;

  ngOnInit() {
    this.translate.onLangChange.subscribe((event)=>{
      this.title = this.translate.instant('Actividad por Usuario')   
    })
    let today = new Date();    
    this.date = this.getDate(today);
  
    this.load();

      
  }

  load(){
  //  console.log(this.date);
  //console.log("aa",this.filter);
    
    this.datafilter = {
      date: this.date,
      user_group_id:'',
      user_id:''
    };

    if (this.filter !== undefined && this.filter !== null ){
         this.datafilter.user_group_id = this.filter.groupId;
         this.datafilter.user_id = this.filter.userId;
    }
    

    this.ReportsService.useractivity(this.datafilter).subscribe((res)=>{
      
      for (var i = 0; i < res.length; i++) {

        var a = res[i].start_time.split(" ");
        res[i].start_time = a[1]
        var b = res[i].end_time.split(" ");
        res[i].end_time = b[1]
        
    }
      this.userActivities = res;  
      this.chargeOptionsGraphUserActivity();
    })

    this.ReportsService.useractivityrange(this.datafilter).subscribe((res)=>{
      this.userActivitiesrange =res
      this.chargeOptionsGraphRange();
    })
    
  }

  /**
   * Implementacion grafico de actividad de usuario
   */

 
  chargeOptionsGraphUserActivity() {
    let data = this.userActivities;
    let chartHeight = (data.length<11)?650:data.length*40;
    //console.log("data", data);
    
    let usersName = data.map((value, index=1) => (index+1)+'. '+value.user);
    let timeInactive = data.map(value => this.timeDecimal(value.inactive_time));
    let timePrivate = data.map(value => this.timeDecimal(value.private_time));
    let timeUncategorized = data.map(value => this.timeDecimal(value.uncategorized_time));
    let timeImproductive = data.map(value => this.timeDecimal(value.none_productive_time));
    let timeAddedManually = data.map(value => this.timeDecimal(value.manual_time));
    let timeProductive = data.map(value => this.timeDecimal(value.productive_time));
    let timeMeeting = data.map(value => this.timeDecimal(value.manual_time));

    this.chartOptionsUserActivity = {   
      chart: {
        type: 'bar',
        height: chartHeight
      },
      title: {
         text: this.translate.instant('User Activity')
      },
      legend : {
        reversed: true
      },
      xAxis:{
        categories: usersName, 
        title: {
          text: null
        } 
      },
      yAxis : {
         min: 0, 
         title: {
            text: this.translate.instant('Time'), 
            align: 'high'
         },
         labels: {
            overflow: 'justify'
         }
      },
      tooltip : {
        formatter: function () {
          var title = "<b style='text-decoration: underline'>" + this.x + "</b>";
          var minutes = this.y;
          var min = Math.floor(Math.abs(minutes));
          var sec = Math.floor((Math.abs(minutes) * 60)% 60);
          var msec = Math.floor((Math.abs(minutes) * 3600) % 60);
          var valueHours = (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec + ":" + (msec < 10 ? "0" : "") + msec;             
          var time = " " + this.series.name + ": " + valueHours;
          return title + "<br>" + time;
        },
      },
      plotOptions : {
        bar: {
          dataLabels: {
            enabled: true, 
            style: {textShadow: 0}
          }
        },
        series: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            align: "center",
            color: "#FFFFFF",
            x: -10,
            style: {textShadow: 0},
            formatter: function() {
              var minutes = this.y;
              
              var min = Math.floor(Math.abs(minutes));
              var sec = Math.floor((Math.abs(minutes) * 60)% 60);
              var msec = Math.floor((Math.abs(minutes) * 3600) % 60);
              return (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec + ":" + (msec < 10 ? "0" : "") + msec;              
            }, 
  
          },      
        },   
      }, 
      exporting: {
        buttons: {
            contextButton: {
                symbol: 'url(assets/dwnld.png)',
                x:-10,
                menuItems: 'downloadJPEG',
                type: "image/jpg",
                onclick: function () {
                    this.exportChart();
                    
                }
            } 
        },
    },   
      credits:{
         enabled: false
      },
      series: [
        {
          name: this.translate.instant('Inactivity'),
          data: timeInactive,
          color: config.color.inactive,
        }, 
        {
          name: this.translate.instant('Private'),
          data: timePrivate,
          color: config.color.private,
        }, 
        {
          name: this.translate.instant('Meeting'),
          data: timeMeeting,
          color: config.color.meeting,      
        },
        {
          name: this.translate.instant('Manual time'),
          data: timeAddedManually,
          color: config.color.manual
        }, 
        {
          name: this.translate.instant('Uncategorized'),
          data: timeUncategorized,
          color: config.color.uncategorized

        }, 
        {
          name: this.translate.instant('Not Productive'),
          data: timeImproductive,
          color: config.color.improductive
        },
        {
          name: this.translate.instant('Productive'),
          data: timeProductive,
          color: config.color.productive
        }        
    ]
   }; 

  }  

 


  /**
   * Implementacion grafico rango de horas
   */
  chargeOptionsGraphRange() {
    let data = this.userActivitiesrange;
    // console.log("user range",data)
    let chartHeight = (data.length<11)?650:data.length*40;
    let usersName = data.map((value, index=1) => (index+1)+'. '+value.name);

    
    let timeInactive = [];
    let timePrivate = [];
    let timeUncategorized = [];
    let timeImproductive = [];
    let timeProductive = [];
    let timeMeeting = [];
    let timeManualSystem = [];
    let noReports = [];
    var userId =0;
    
    for(let userData of data) {
      for(let registry of userData.relationships.agent_daily_user_range_activity) {
       // console.log("registry",registry)
        if(registry.relationships.status_work == null){
           registry.relationships.status_work =  {
                        name: "no reports"
           }
        }
        
        switch (registry.relationships.status_work.name) {
          case "Trabajando": // active
            switch (registry.relationships.classification.name) {
              case "Productivo":
                timeProductive.push({
                  x: userId,
                  _title: this.translate.instant("Productive"),
                  low: moment.utc(registry.start_date).valueOf(),
                  high: moment.utc(registry.end_date).valueOf(),
                });
                break;
              case "No Productivo":
                timeImproductive.push({
                  x: userId,
                  _title: this.translate.instant("Inactivity"),
                  low: moment.utc(registry.start_date).valueOf(),
                  high: moment.utc(registry.end_date).valueOf(),
                });
                break;
              case "Sin categorizar":
                timeUncategorized.push({
                  x: userId,
                  _title: this.translate.instant("Uncategorized"),
                  low: moment.utc(registry.start_date).valueOf(),
                  high: moment.utc(registry.end_date).valueOf(),
                });
                break;
              case "En Reunión":
                timeMeeting.push({
                  x: userId,
                  _title: this.translate.instant("Meeting"),
                  low: moment.utc(registry.start_date).valueOf(),
                  high: moment.utc(registry.end_date).valueOf(),
                });
                break;
              case "Tiempo Manual":
                timeManualSystem.push({
                  x: userId,
                  _title: this.translate.instant("Manual time"),
                  low: moment.utc(registry.start_date).valueOf(),
                  high: moment.utc(registry.end_date).valueOf(),
                });
                break;                  
              default:
                timeUncategorized.push({
                  x: userId,
                  _title: this.translate.instant("Uncategorized"),
                  low: moment.utc(registry.start_date).valueOf(),
                  high: moment.utc(registry.end_date).valueOf(),
                });
                break;
            }
            break;
          case "Privado": // private
            timePrivate.push({
              x: userId,
              _title: this.translate.instant("Private"),
              low: moment.utc(registry.start_date).valueOf(),
              high: moment.utc(registry.end_date).valueOf(),
            });
            break;
          case "Inactivo": // inactive
          timePrivate.push({
              x: userId,
              _title: this.translate.instant("Inactivity"),
              low: moment.utc(registry.start_date).valueOf(),
              high: moment.utc(registry.end_date).valueOf(),
            });
            break;
          case "no reports": // no reports
            noReports.push({
              x: userId,
              _title: this.translate.instant("Tiempo sin reportes"),
              low: moment.utc(registry.start_date).valueOf(),
              high: moment.utc(registry.end_date).valueOf(),
            });
            break;
        }
      }
      ++userId;
    }

    this.chartOptionsRange = {   
      chart : {
        type: "columnrange",
        inverted: true,
        zoomType: "y",
        height: chartHeight
      },
      title : {
        text: 'User Activity (Time Range)'   
      },
      xAxis : {
        categories: usersName,
        labels: {
             overflow:'justify'
        }
      },
      yAxis : {     
        type: "datetime",
        min: moment.utc(this.getDate(this.date)).valueOf(),
        max: moment.utc(this.getDate(this.date)).add(1, "d").valueOf(),
        title: {
          text: this.translate.instant('Time'),
          align: 'high'
        },
      },
      legend: {
        enabled: true,
      },      
      tooltip: {
        formatter: function () {
          var title = "<b>" + this.x + "</b>";
          return (
            title +
            "<br>" +
            "<b>" +
            this.point._title +
            "</b><br><b>Rango de horas: " +
            Highcharts.dateFormat("%H:%M", this.point.low) +
            "</b> - <b>" +
            Highcharts.dateFormat("%H:%M", this.point.high) +
            "</b>"
          );
        },
      },
      plotOptions: {
        series: {
          turboThreshold: 0,
        },

        columnrange: {
          grouping: false,
        },
      },
      exporting: {
        buttons: {
            contextButton: {
                symbol: 'url(assets/dwnld.png)',
               
                menuItems: 'downloadJPEG',
                type: "image/jpg",
                onclick: function () {
                    this.exportChart();
                    
                }
            } 
        }
    },
      credits: {
         enabled: false
      },
      series: [
        {
          name: this.translate.instant("Privado"),
          data: timePrivate,
          color: config.color.private,
        },
        {
          name: this.translate.instant("Inactividad"),
          data: timeInactive,
          color: config.color.inactive,
        },                    
        {
          name: this.translate.instant("No productivo"),
          data: timeImproductive,
          color: config.color.improductive,
        },
        {
          name: this.translate.instant("Sin categorizar"),
          data: timeUncategorized,
          color: config.color.uncategorized,
        },                   
        {
          name: this.translate.instant("Productivo"),
          data: timeProductive,
          color: config.color.productive,
        },
        {
          name: this.translate.instant("En reunión"),
          data: timeMeeting,
          color: config.color.meeting,
        },
        {
          name: this.translate.instant("Tiempo manual"),
          data: timeManualSystem,
          color: config.color.manual,
        }            
      ],
   };
  }

  getDate(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  timeDecimal(time) {
    return time.split(':')
          .map(function(val) { return parseInt(val, 10); } )
          .reduce( function(previousValue, currentValue, index, array){
              return previousValue + currentValue / Math.pow(60, index);
  });
  }  
  chartCb = chart => {
    this.chartRef = Highcharts.charts[0];
    this.cbTimes++;
    
  };

  chartspCb = chart => {

    this.chartspRef = Highcharts.charts[1];
    this.cbspTimes++;
  };

  export(type){
    try {
      this.svg = this.chartRef.getSVG();

      this.spSvg = this.chartspRef.getSVG();
      var chart_user_activity = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this.svg)));
    //  console.log('got b64 string:',chart_user_activity)

      var chart_special= "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this.spSvg)));
   //   console.log('got chart_special b64 string:',chart_special)
   
     
    } catch (err) {
      this.svg = err;
      
    } 
    
    
    if(type == "xls"){
      var data={
        date: this.date,
        chart_special: chart_special,
       chart_user_activity: chart_user_activity,
       type_report: type
       }
      this.ReportsService.activityExport(data).subscribe((data)=>{
  
        const contentType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        const blob = new Blob([data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
    
    }else{
      var data={
        date: this.date,
        chart_special: chart_special,
       chart_user_activity: chart_user_activity,
       type_report: type
       }
      this.ReportsService.activityExport(data).subscribe((data)=>{
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
