import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { UntypedFormGroup, UntypedFormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientConfigurationService } from 'src/app/services/client-configuration.service';
import { UserGroupsService } from 'src/app/services/user-groups.service';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-client-configuration',
  templateUrl: './client-configuration.component.html',
  styleUrls: ['./client-configuration.component.scss']
})
export class ClientConfigurationComponent implements OnInit {
  error:any;
  groups: any;
  enterpriseId=1;
  loading=false;
  users: any;
  clientId;
  apiRoot = 'https://app.clowdwork.com/api/v1';

  filter = {
    page: '',
    perPage: '',
    name: "",
    collectionSize : ''
  }; 

  version;


  checkoption = [{id:1, name:'Monitor activado'},
                 {id:2, name:'Captura de pantalla'},
                 {id:3, name:'Salida y clerre de sesion'},
                 {id:4, name:'Modo privado'},
                 {id:5, name:'Permitir el inventario de hardware'},
                 {id:6, name:'Permitir el inventario de software'},
                 {id:7, name:'Send registry'},
                 {id:8, name:'Silent mode'}];

  odata=[];
  collectionSize=15;  

  searchform = new UntypedFormGroup({  
    name: new UntypedFormControl,
    enterprise_id: new UntypedFormControl(''),
  })  

  editForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),    
    report: new UntypedFormControl('', Validators.required),
    db_suffix: new UntypedFormControl('', Validators.required),
    canal: new UntypedFormControl('', Validators.required),
    windows_version: new UntypedFormControl('', Validators.required),
    linux_version: new UntypedFormControl('', Validators.required),
    mac_version: new UntypedFormControl('', Validators.required),
    log_interval: new UntypedFormControl('', Validators.required),
    hardware_inventory_interval: new UntypedFormControl('', Validators.required),
    software_inventory_interval: new UntypedFormControl('', Validators.required),
    inactivity_time_to_idle:new UntypedFormControl('', Validators.required),
    registry_submission_interval:new UntypedFormControl('', Validators.required),
    config_verification_interval:new UntypedFormControl('', Validators.required),
  }) 

  user_admin_id:any;
 
  enterprise_name:any;

  modalRefEditClient:any;

  submitted = false;

  constructor(
    private generalService: GeneralService,
    private modalService: NgbModal,
    private Clients: ClientConfigurationService,
    private UserGroupService: UserGroupsService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { 
    generalService.setTitle('Client-configuration');
  }

  ngOnInit(): void {
    this.load();
   // this.form.patchValue({enterprise_name: this.enterprise_name })   
   this.editForm = this.formBuilder.group({
    report: ["", Validators.required],
    db_suffix:["", Validators.required],
    canal: ["", Validators.required],
    windows_version: ["", Validators.required],
    linux_version: ["", Validators.required],
    mac_version: ["", Validators.required],
    log_interval: ["", Validators.required],
    hardware_inventory_interval: ["", Validators.required],
    software_inventory_interval: ["", Validators.required],
    inactivity_time_to_idle: ["", Validators.required],
    registry_submission_interval: ["", Validators.required],
    config_verification_interval: ["", Validators.required],
  }); 
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  load() {
    this.Clients.getclients(this.filter.page).subscribe(
      res => {
        this.users = res.data
        
        var paginate = res.meta;
      
        this.filter.collectionSize = paginate.total;
        this.filter.page = paginate.current_page;
        this.filter.perPage = paginate.per_page;

      })

      this.UserGroupService.groupList().subscribe(res =>{
        this.groups = res.userGroup;
      })
      
      this.Clients.getVersions().subscribe((res)=>{
        this.version = res.data
      })

  }


  editClient(content1, clien_id) {
   this.clientId = clien_id;
    var result = this.users.find( ({ id }) => id === clien_id );
 var checkarr = [];
    if(result.monitor_enabled == 1){
      checkarr.push(this.checkoption[0])
    }
    if(result.screenshots_enabled == 1){
      checkarr.push(this.checkoption[1])
    }
    if(result.allow_logout_and_exit == 1){
      checkarr.push(this.checkoption[2])
    }
    if(result.allow_private_mode == 1){
      checkarr.push(this.checkoption[3])
    }
    if(result.enable_hardware_inventory == 1){
      checkarr.push(this.checkoption[4])
    }
    if(result.enable_software_inventory == 1){
      checkarr.push(this.checkoption[5])
    }
    if(result.send_registry == 1){
      checkarr.push(this.checkoption[6])
    }
    if(result.silent_mode == 1){
      checkarr.push(this.checkoption[7])
    }

    this.odata = checkarr;
  
    this.editForm.patchValue({
      canal:result.channel, 
      config_verification_interval:result.config_verification_interval,
      db_suffix:result.db_suffix,
      hardware_inventory_interval:result.hardware_inventory_interval, 
      inactivity_time_to_idle:result.inactivity_time_to_idle,
      linux_version:result.linux_version,
      mac_version:result.osx_version,
      registry_submission_interval:result.registry_submission_interval,
      report:result.reporting_url,
      log_interval:result.screen_captor_interval,
      software_inventory_interval:result.software_inventory_interval,
      windows_version:result.windows_version,

    })
    this.modalRefEditClient = this.modalService.open(content1, {size: 'md'});
  }

  getAvatar(userId) {    
    return `${this.apiRoot}/profile/${userId}/avatar`;
  }


  /**
   * Modal crear/editar funciones
   */

  onSearch(){
    const search = (<HTMLInputElement>document.getElementById("search")).value;

    const filled = search.replace(/ /g, "%20");

    // this.UserService.search(filled).subscribe((res) => {
    //   var paginate = res.meta;

    //   this.filter.collectionSize = paginate.total;
    //   this.filter.page = paginate.current_page;
    //   this.filter.perPage = paginate.per_page;

    //   for (var i = 0; i < res.data.length; i++) {
    //     var uu = [];
    //     for (var u = 0; u < res.data[i].relationships.role.length; u++) {
    //       var rolename = res.data[i].relationships.role[u].name;

    //       uu.push(rolename);
    //       res.data[i].rolename = uu.join("/").toString();
    //     }
    //   }

    //   var test = res.data;
    //   var test1 =res.data;
  
    // });

    
  }

  onSubmitEdit(){
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }

   var monitor_enabled=0;
   var screenshots_enabled=0;
   var allow_logout_and_exit=0;
   var allow_private_mode=0;
   var enable_hardware_inventory=0;
   var  enable_software_inventory=0;
   var send_registry=0;
   var silent_mode=0;

   
    var result1 = this.odata.find( ({ name }) => name === 'Monitor activado' );
    if(result1 !==undefined){
      monitor_enabled=1;
    }
    var result2 = this.odata.find( ({ name }) => name === 'Captura de pantalla' );
    if(result2 !==undefined){
      screenshots_enabled=1;
    }
    var result3 = this.odata.find( ({ name }) => name === 'Salida y clerre de sesion' );
    if(result3 !==undefined){
      allow_logout_and_exit=1;
    }
    var result4 = this.odata.find( ({ name }) => name === 'Modo privado' );
    if(result4 !==undefined){
      allow_private_mode=1;
    }
    var result5 = this.odata.find( ({ name }) => name === 'Permitir el inventario de hardware' );
    if(result5 !==undefined){
      enable_hardware_inventory=1;
    }
    var result6 = this.odata.find( ({ name }) => name === 'Permitir el inventario de software' );
    if(result6 !==undefined){
      enable_software_inventory=1;
    }
    var result7 = this.odata.find( ({ name }) => name === 'Send registry' );
    if(result7 !==undefined){
      send_registry=1;
    }
    var result8 = this.odata.find( ({ name }) => name === 'Silent mode' );
    if(result8 !==undefined){
      silent_mode=1;
    }
    
        
    var data={
       reporting_url:this.editForm.value.report,
       channel:this.editForm.value.canal,
       windows_version:this.editForm.value.windows_version,
       linux_version:this.editForm.value.linux_version,
       osx_version:this.editForm.value.mac_version,
       screen_captor_interval:this.editForm.value.log_interval,
       db_suffix:this.editForm.value.db_suffix,
       software_inventory_interval:this.editForm.value.software_inventory_interval,
       hardware_inventory_interval:this.editForm.value.hardware_inventory_interval,
       monitor_enabled:monitor_enabled,
       screenshots_enabled:screenshots_enabled,
       allow_logout_and_exit:allow_logout_and_exit,
       allow_private_mode:allow_private_mode,
       enable_hardware_inventory:enable_hardware_inventory,
       enable_software_inventory:enable_software_inventory,
       send_registry:send_registry,
       inactivity_time_to_idle:this.editForm.value.inactivity_time_to_idle,
       registry_submission_interval:this.editForm.value.registry_submission_interval,
       config_verification_interval:this.editForm.value.config_verification_interval,
       silent_mode:silent_mode

    }

    var id=this.clientId;
    this.Clients.update(data,id).subscribe((res)=>{
     this.modalRefEditClient.close();
        this.load();
        this.toastr.success("Client updated succesfully");
      },
      (error) => {
        console.log(error);
        this.toastr.error(error);
      }
    );
    
  }


  cancelEdit() {
    this.modalRefEditClient.close();
  }


  delete() {
    
  }

  setPagination(event) {
    this.filter.page = event.page;
    this.load();

  }
  // options = ["check 1", "check 2", "check3"];

  onChange(day: any, checked: boolean) {
    if (checked && this.odata.indexOf(day) < 0) {
      this.odata = [...this.odata, day];

      //we can also sort the array add this after ...day]
      //.sort((a, b) =>
     //   this.options.indexOf(a) > this.options.indexOf(b) ? 1 : -1
      //);
    }

    if (!checked) this.odata = this.odata.filter((x) => x != day);
    
  }


}
