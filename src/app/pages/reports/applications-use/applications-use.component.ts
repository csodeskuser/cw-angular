import { Component, OnInit } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import * as Highcharts from "highcharts";
import addMore from "highcharts/highcharts-more";
addMore(Highcharts);
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import config from "../config.js";
import { ReportsService } from "src/app/services/reports.service";
import Exporting from "highcharts/modules/exporting";

@Component({
  selector: "app-applications-use",
  templateUrl: "./applications-use.component.html",
  styleUrls: ["./applications-use.component.scss"],
})
export class ApplicationsUseComponent implements OnInit {
  listApplication= [];
  listCategories: any;
  type: boolean = true;
  duser=[];
  showimg=false;
  detailid;
  svg: string;
  cbTimes = 0;
  chartRef: Highcharts.Chart;
  constructor(
    private generalService: GeneralService,
    private report: ReportsService
  ) {
    generalService.setTitle("Uso de Aplicaciones");
    Exporting(Highcharts);
  }

  startdate: any;
  enddate: any;
  filtered = false;
  loading = false;
  filter = {
    start_date: "",
    end_date: "",
    class_id: "",
    user_id: 0,
    user_group_id: 0,
    page: 1,
    per_page: 15,
    collectionSize: 0,
    application_id:''
  };
  idfilter: { enterpriseId: 1; groupId: 0; userId: 0 };
  optionNResults = [100, 200, 300, 400, 500, 600];
  nResults = 100;
  highcharts = Highcharts;
  chartOptions: any;
  config = config;
  categorySelecteds = [];
  detaildata:any;
  apiRoot = "https://app.clowdwork.com/api/v1";
  ngOnInit(): void {
    
    this.enddate = moment().format("YYYY-MM-DD");
    this.startdate = moment(this.enddate)
      .subtract(7, "days")
      .format("YYYY-MM-DD");
    this.filter.start_date = this.startdate;
    this.filter.end_date = this.enddate;
    this.report.classification().subscribe((res) => {
      this.filter.class_id = res[0].id;
      this.categorySelecteds = [res[0].id];
      this.listCategories = res;
      this.chargeOptionApplicationsUse();
    });
  }

  search() {
    this.filter.start_date = this.startdate;
    this.filter.end_date = this.enddate;
    if (this.idfilter !== undefined) {
      this.filter.user_id = this.idfilter.userId;
      this.filter.user_group_id = this.idfilter.groupId;
    }
    this.chargeOptionApplicationsUse();
    if (this.type == false) {
      this.type = true;
    }
  }

  chargeOptionApplicationsUse() {
    var cat = this.categorySelecteds.join("+");

    this.filter.class_id = cat;

    this.report.applications(this.filter).subscribe((res) => {
      this.listApplication = res.data;
      var pagi = res.meta;

      this.filter.collectionSize = pagi.total;
      this.filter.page = pagi.current_page;
      this.filter.per_page = pagi.per_page;

      let data = res.data;

      let series = data.map((value) => {
        return {
          name: value.relationships.application
            ? value.relationships.application.name
            : "N/A",
          y: value.duration_in_seconds * 1,
        };
      });
      let total = 0;
      data.forEach((value) => {
        total += parseInt(value.duration_in_seconds);
      });

      this.chartOptions = {
        chart: {
          type: "pie",
          width: 500,
          events: {
            load: function () {
              var chart = this;
              var legend = chart.legend;
              var newHeight = chart.chartHeight + 200;
              chart.setSize(undefined, newHeight);
            },
          },
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "",
        },
        tooltip: {
          formatter: function () {
            let title = "<b>" + this.point.name + "</b>";
            let percent = ((this.y * 100) / total).toFixed(2);
            let dataPercent = this.series.name + ": " + percent + "%";
            return title + "</br>" + dataPercent;
          },
        },
        legend: {
          align: "center",
          enabled: true,
          labelFormatter: function () {
            var title = "<b>" + this.name + "</b>";
            let percent = ((this.y * 100) / total).toFixed(2);
            var dataPercent = this.series.name + ": " + percent + "%";
            return (
              '<div style="text-align: left; width:150px;float:left;">' +
              title +
              '</div><div style="width:60px; float:left;text-align:right;">' +
              dataPercent +
              "</div>"
            );
          },
          layout: "horizontal", //change to horizontal
          //align: 'right',//removed alignment
          verticalAlign: "bottom",
          maxHeight: 250, //this was the key property to make my legend paginated
          //y: 40,//remove position
          navigation: {
            activeColor: "#3E576F",
            animation: true,
            arrowSize: 12,
            inactiveColor: "#CCC",
            style: {
              fontWeight: "bold",
              color: "#333",
              fontSize: "12px",
            },
          },
        },
        useHighStocks: false,
        plotOptions: {
          pie: {
            size: 250,
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: false,
            },
            showInLegend: true,
          },
        },
        series: [
          {
            type: "pie",
            name: "Time",
            data: series,
          },
        ],
      };
    });  

  }

  setPagination(event) {
    this.filter.per_page = event.perPage;
    this.filter.page = event.page;
    this.chargeOptionApplicationsUse();
  }

  setPaginationDetail(event) {
    
    this.filter.per_page = event.perPage;
    this.filter.page = event.page;
    this.state(this.filter.application_id);
  }


  state(id) {
     
      this.filter.application_id = id
    if (this.type == true) {
      this.type = false;
    }
    
      this.report.detail(this.filter).subscribe((res)=>{
        this.detaildata = res.data;
        var pagi = res.meta;

        this.filter.collectionSize = pagi.total;
        this.filter.page = pagi.current_page;
        this.filter.per_page = pagi.per_page;
      })
    
  }

  close(){
    this.type = true;
  }

  getAvatar(id){
    
      return `${this.apiRoot}/profile/${id}/avatar`;
    
    
  }

  loadAvatar(id){

    this.detailid = id;

      // if(this.showimg===false){
      //   this.showimg=true
      // }else{
      //   this.showimg=false
      // }
  }

  chartCb = chart => {
    this.chartRef = Highcharts.charts[0];
    this.cbTimes++;
  };

  export(type){
    try {
      this.svg = this.chartRef.getSVG();

      var pie_chart = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this.svg)));
    //  console.log('got b64 string:',chart_user_activity)


     
    } catch (err) {
      this.svg = err;
      
    } 
    
    
    if(type == "xls"){
      var data={
        start_date: this.startdate,
        end_date: this.enddate,
        classification_id:this.filter.class_id,
        graph:pie_chart,
        type_report: type
       }
      this.report.exportApplication(data).subscribe((data)=>{
  
        const contentType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        const blob = new Blob([data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
    
    }else{
      var data={
        start_date: this.startdate,
        end_date: this.enddate,
        classification_id:this.filter.class_id,
        graph:pie_chart,
        type_report: type
       }
      this.report.exportApplication(data).subscribe((data)=>{
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
