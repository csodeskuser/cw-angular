import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

import dataTest from '../reports/data_test.js';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.scss']
})
export class SecuritySettingsComponent implements OnInit {
  loading: boolean;
  filter: any;
  securitySettings: any;
  allSettings: any;

  constructor(
    private generalService: GeneralService
  ) { 
    generalService.setTitle('Configuración de seguridad')
  }

  ngOnInit(): void {
    this.loading=false;
    this.filter = {enterpriseId:1, groupId:0, userId:0};
    this.allSettings = {
      bloquear_usb: 0,
      bloquear_captura_de_pantalla: 0,
      permitir_encripcion: 0,
      permitir_desencripcion_offline: 0,
      permitir_ve_password: 0,
      permitir_cambiar_password: 0
    }

    this.load();
  }

  load() {
    this.securitySettings = dataTest.security_settings.data;
    console.log('sec', this.securitySettings)
  }
  
  changeSettings(setting, userId) {
    console.log('set', setting)
    console.log('userId', userId)
  }

  changeAll(value) {    
    let invert = (this.allSettings[value])?1:0;

    this.securitySettings.forEach(item=>{
      if(item.config) {
        item.config[value] = invert; 
        console.log('item', item.config[value])        
      } 
    });

    //this.load();
  }

}
