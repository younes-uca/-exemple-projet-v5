import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './controller/service/Auth.service';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { RoleService } from './controller/service/role.service';
@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  animations: [
    trigger('inline', [
      state(
        'hidden',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      state(
        'hiddenAnimated',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
        })
      ),
      transition(
        'visibleAnimated => hiddenAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hiddenAnimated => visibleAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class AppMenuComponent implements OnInit {
  model: any[];
  modelsuperadmin:any[];
  modelanonymous: any[];
    modelchercheur : any[];
  modeladmin : any[];
  constructor(public app: AppComponent,
   public appMain: AppMainComponent,
   private roleService: RoleService,
   private authService:AuthService,
  private router: Router) {}

  ngOnInit() {


    this.modelchercheur =
      [
              {
                label: 'Distinction',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste distinction',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/distinction/list']
                    },
                    {
                      label: 'Nouveau distinction',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/distinction/create']
                    },
                    {
                      label: 'Liste distinction discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/distinction-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Referentiel',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste semantic relationship',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/semantic-relationship/list']
                    },
                    {
                      label: 'Liste key word',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/key-word/list']
                    },
                    {
                      label: 'Liste enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/enjeux-ird/list']
                    },
                    {
                      label: 'Liste discipline scientifique parent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/discipline-scientifique-parent/list']
                    },
                    {
                      label: 'Liste discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/discipline-scientifique/list']
                    },
                    {
                      label: 'Liste key word discipline scientifique erc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/key-word-discipline-scientifique-erc/list']
                    },
                    {
                      label: 'Liste discipline scientifique erc association',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/discipline-scientifique-erc-association/list']
                    },
                    {
                      label: 'Liste discipline scientifique erc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/discipline-scientifique-erc/list']
                    },
                    {
                      label: 'Liste discipline scientifique erc parent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/discipline-scientifique-erc-parent/list']
                    },
                    {
                      label: 'Liste identifiant recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/identifiant-recherche/list']
                    },
                ]
              },
              {
                label: 'Campagne',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste campagne',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/campagne/list']
                    },
                    {
                      label: 'Liste etat etape campagne',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/etat-etape-campagne/list']
                    },
                ]
              },
              {
                label: 'Chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste enjeux ird chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/enjeux-ird-chercheur/list']
                    },
                    {
                      label: 'Liste chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/chercheur/list']
                    },
                    {
                      label: 'Liste discipline scientifique chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/discipline-scientifique-chercheur/list']
                    },
                    {
                      label: 'Liste identifiant auteur expert',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/identifiant-auteur-expert/list']
                    },
                ]
              },
    ]
    this.modeladmin =
      [
              {
                label: 'Distinction',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste distinction',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/formulaire/distinction/list']
                    },
                    {
                      label: 'Liste distinction discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/formulaire/distinction-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Referentiel',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste semantic relationship',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/referentiel/semantic-relationship/list']
                    },
                    {
                      label: 'Liste key word',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/referentiel/key-word/list']
                    },
                    {
                      label: 'Liste enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/referentiel/enjeux-ird/list']
                    },
                    {
                      label: 'Liste discipline scientifique parent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/referentiel/discipline-scientifique-parent/list']
                    },
                    {
                      label: 'Liste discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/referentiel/discipline-scientifique/list']
                    },
                    {
                      label: 'Liste key word discipline scientifique erc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/referentiel/key-word-discipline-scientifique-erc/list']
                    },
                    {
                      label: 'Liste discipline scientifique erc association',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/referentiel/discipline-scientifique-erc-association/list']
                    },
                    {
                      label: 'Liste discipline scientifique erc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/referentiel/discipline-scientifique-erc/list']
                    },
                    {
                      label: 'Liste discipline scientifique erc parent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/referentiel/discipline-scientifique-erc-parent/list']
                    },
                    {
                      label: 'Liste identifiant recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/referentiel/identifiant-recherche/list']
                    },
                ]
              },
              {
                label: 'Campagne',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste campagne',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/formulaire/campagne/list']
                    },
                    {
                      label: 'Liste etat etape campagne',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/formulaire/etat-etape-campagne/list']
                    },
                ]
              },
              {
                label: 'Chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste enjeux ird chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/referentiel/enjeux-ird-chercheur/list']
                    },
                    {
                      label: 'Liste chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/formulaire/chercheur/list']
                    },
                    {
                      label: 'Liste discipline scientifique chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/referentiel/discipline-scientifique-chercheur/list']
                    },
                    {
                      label: 'Liste identifiant auteur expert',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/formulaire/identifiant-auteur-expert/list']
                    },
                ]
              },
    ]
        if (this.authService.authenticated) {
      if (this.authService.authenticatedUser.roles) {

        this.authService.authenticatedUser.roles.forEach(role => {
          const roleName: string = this.getRole(role);
          this.roleService._role.next(roleName.toUpperCase());
          eval('this.model = this.model' + this.getRole(role));
        })
      }

    }
  }
  getRole(text){
  const [role, ...rest] = text.split('_');
  return rest.join('').toLowerCase();
}
  onMenuClick(event) {
    this.appMain.onMenuClick(event);
  }
}
