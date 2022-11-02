import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/modules/i18n/translation.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  tran = [
    {text: 'Perfil', img:'fa-user' , link: '/profile'},
    {text: 'Contraseña', img:'fa-key' , link: '/password'},
    {text: 'Descargas', img:'fa-download' , link: '/package'},
    {text: 'Ayuda', img:'fa-question' , link: '', href: 'https://docs.clowdwork.com/'},
    {text: 'Inducción', img:'fa-book' , link: '/user-groups'},
    {text: 'Salir', img:'fa-sign-out' , link: '/auth/login'}
  ]

  //this settings variable is in use to show pages dropdown
  options = [];

  constructor(private translate: TranslationService) { }

  ngOnInit(): void {

    for (var i=0; i<this.tran.length; i++){
      var word = this.tran[i].text;
      var tword = this.translate.instant(word);
        this.tran[i].text = tword;
     }
      this.options = this.tran;
  }

}
