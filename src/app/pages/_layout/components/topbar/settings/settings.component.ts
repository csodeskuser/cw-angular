import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/modules/i18n/translation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  tran = [
    {text: 'Usuarios', link: '/users'},
    {text: 'Grupos de Usuarios', link: '/user-groups'},
    {text: 'Window Tracking', link: '/window_tracking'},
    {text: 'Configuración de Seguridad', link: '/security-settings'},
    {text: 'Aplicaciones', link: '/applications'},
   // {text: 'Grupos de Aplicaciones', link: '/application-groups'},
    {text: 'Empresas', link: '/enterprises'},
    {text: 'Roles', link: '/roles'},
    {text: 'Configuración de Cliente', link: '/client-configuration'},
    {text: 'Colector de Logs', link: '/collector'},
    {text: 'Papelera', link: '/users'},
    {text: 'Pagos Recibidos', link: '/users'},
    {text: 'Modules', link: '/modules'}
  ]
  constructor(
    private translate: TranslationService
  ) { }
//this settings variable is in use to show pages dropdown
  settings = []

  ngOnInit(): void {

   for (var i=0; i<this.tran.length; i++){
    var word = this.tran[i].text;
    var tword = this.translate.instant(word);
      this.tran[i].text = tword;
   }
    this.settings = this.tran;
       
  }

}
