import { Component, OnInit } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import * as moment from "moment";
import dataTest from "../data_test.js";
import { ScreenshotsService } from "src/app/services/screenshots.service";
import { DomSanitizer } from "@angular/platform-browser";
import { UserGroupsService } from "src/app/services/user-groups.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-screenshots",
  templateUrl: "./screenshots.component.html",
  styleUrls: ["./screenshots.component.scss"],
})
export class ScreenshotsComponent implements OnInit {
  loading = false;
  date: any;
  data: any;
  screenshots: any;
  users: any;
  userId = 0;
  colSize= 2;
  token;
  searching: boolean;
  user: any;

  constructor(
    private generalService: GeneralService,
    private screenshotsService: ScreenshotsService,
    private usergroup: UserGroupsService,
    private toastr: ToastrService
  ) {
    generalService.setTitle("Capturas de Pantalla");
  }

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.usergroup.userList().subscribe((res) => {
      this.users = res.users;
      this.user = this.users[0];

      this.date = moment().format("YYYY-MM-DD");
      this.data = {
        date: this.date,
        uid: this.user.id,
      };

      this.load();
    });
    this.searching = false;
    this.screenshots = [];
  }

  select(event) {
    this.user = event;
  }
 
  loadss() {
    console.log('ssss',this.user.id)
    this.data = {
      date: this.date,
      uid: this.user.id,
    };
    
    this.load();
  }

  load() {
    this.loading = true;
    this.screenshotsService.getscreenshots(this.data).subscribe((res) => {
      this.loading = false;
    //  var data = res[0];
    //  this.timeManage(data);

      this.screenshots = res[0];
    });

    this.searching = true;

    // this.loading= false;
  }

  // timeManage(data){
  //   for(var items in data ){
  //         //console.log('hihhihi',items,data[items])
  //     var seriel = data[items]
  //   }
  // }

  timeforamt(val) {
    return moment(val + ":00", "hh").format("LT");
  }

  getThumbUrl(id) {
    const token = localStorage.getItem("token");

    return `https://app2testing.clowdwork.com/app/api/admin/screenshots/${id}?token=${token}`;
  }

  download(id) {
    this.screenshotsService.download(id).subscribe((data) => {
      data;

      const contentType = "image/jpeg";
      const blob = new Blob([data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "screenshot.png";

      // Version link.click() to work at firefox
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      setTimeout(() => {
        // firefox
        window.URL.revokeObjectURL(url);
        link.remove();
      }, 100);
    });
    // window.open(url, "_blank");
    //});
    // const token = localStorage.getItem('token');

    // return `https://app2testing.clowdwork.com/app/api/admin/screenshots/${id}?token=${token}`;
  }

  getUrl(id) {
    const token = localStorage.getItem("token");

    return `https://app2testing.clowdwork.com/app/api/admin/screenshots/${id}?token=${token}`;
  }

  addDate(offset) {
    this.date = moment(this.date).add(offset, "days").format("YYYY-MM-DD");
    this.loading = true;
    this.data.date = this.date;
    console.log('kkkk',this.data)
    this.screenshotsService.getscreenshots(this.data).subscribe((res) => {
      this.loading = false;
      this.screenshots = res[0];
    });

    this.searching = true;
  }

  removeScreenshot(item) {
    this.screenshotsService.deleteScrenshot(item).subscribe((res)=>{
      this.load();
      this.toastr.success('Screenshot deleted successfuly')
    },(error)=>{
      this.toastr.error(error.error.error)
    })
  }

  percentColor(val) {
    val = parseFloat(val);

    if (val >= 0 && val <= 19) return "#F44336";
    if (val >= "20" && val <= "39") return "#FF9800";
    if (val >= "40" && val <= "59") return "#FFC107";
    if (val >= "60" && val <= "79") return "#90ee90";
    if (val >= "80") return "#009688";
  }

  albumSize(){
    if(this.colSize < 4){
      this.colSize = this.colSize +1;
    }
  }

  albumSizeDec(){
    if(this.colSize > 2){
      this.colSize = this.colSize -1;
    }
  }

}
