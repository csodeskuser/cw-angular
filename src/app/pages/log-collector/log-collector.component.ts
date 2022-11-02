import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { GeneralService } from "src/app/services/general.service";
import { LogCollectorService } from "src/app/services/log-collector.service";

@Component({
  selector: "app-log-collector",
  templateUrl: "./log-collector.component.html",
  styleUrls: ["./log-collector.component.scss"],
})
export class LogCollectorComponent implements OnInit {
  loading = false;
  data = {
    log_date: "",
    db_log: false,
    monitor_log: false,
    agent_log: false,
    user_id: 0,
  };

  filter1 = {
    page: "",
    perPage: "",
    name: "",
    collectionSize: "",
  };

  collectorLogs = [];
  subject: any;
  router: any;
  logCollectors: any = [];

  constructor(
    private generalService: GeneralService,
    private collectorService: LogCollectorService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    generalService.setTitle("Recolector de logs");
  }

  ngOnInit(): void {
    this.list();
  }

  addLogCollector(content) {
    this.data.log_date = moment().format("YYYY-MM-DD");
    this.data.db_log = false;
    this.data.monitor_log = false;
    this.data.agent_log = false;
    this.modalService.open(content, { size: "md" });
  }

  formatDate(date, time) {
    return time
      ? moment(date).format("YYYY-MM-DD h:mm a")
      : moment(date).format("YYYY-MM-DD");
  }

  onSubmit() {
    if (!this.data.user_id) {
      this.toastr.error(
        "Ocurrio un error, debe seleccionar un usuario",
        "Error"
      );
      return false;
    }

    console.log(this.data);
    this.loading = true;
    this.collectorService.add(this.data).subscribe(
      (res) => {
        this.toastr.success("El collector fue creado", "Exito");
        this.list();
        this.loading = false;
        return true;
      },
      (err) => {
        this.toastr.error(
          "Ocurrio un error, favor contacta al administrador",
          "Error"
        );
        console.log("error", err);
        this.loading = false;
        return false;
      }
    );
  }

  list() {
    // this.loading=true;
    this.collectorService.list(this.data.user_id).subscribe(
      (res) => {
        //   this.loading=false;
        this.logCollectors = res.data;

        var paginate = res.meta;

        this.filter1.collectionSize = paginate.total;
        this.filter1.page = paginate.current_page;
        this.filter1.perPage = paginate.per_page;
        return true;
      },
      (err) => {}
    );
  }

  filter(event) {
    this.data.user_id = event.userId;

    this.list();
  }

  setPagination(event) {
    this.filter1.page = event.page;
    this.list();
  }

  delete(logId) {
    this.collectorService.delete(logId).subscribe(
      (res) => {
        this.toastr.success("El collector fue eliminado", "Exito");
        this.list();
      },
      (err) => {
        console.log("error", err);
        this.toastr.error("Ocurrio un error eliminando el collector", "Error");
      }
    );
    this.list();
  }

  download(id) {
    this.collectorService.download(id).subscribe((res) => {
      const blob = new Blob([res], {
        type: "application/zip",
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
