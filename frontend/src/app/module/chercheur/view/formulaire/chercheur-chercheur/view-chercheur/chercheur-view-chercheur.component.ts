import {Component, OnInit} from '@angular/core';
import {ChercheurService} from 'src/app/controller/service/Chercheur.service';
import {ChercheurVo} from 'src/app/controller/model/Chercheur.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {IdentifiantAuteurExpertVo} from 'src/app/controller/model/IdentifiantAuteurExpert.model';
import {IdentifiantAuteurExpertService} from 'src/app/controller/service/IdentifiantAuteurExpert.service';
import {EnjeuxIrdVo} from 'src/app/controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from 'src/app/controller/service/EnjeuxIrd.service';
import {EnjeuxIrdChercheurVo} from 'src/app/controller/model/EnjeuxIrdChercheur.model';
import {EnjeuxIrdChercheurService} from 'src/app/controller/service/EnjeuxIrdChercheur.service';
import {IdentifiantRechercheVo} from 'src/app/controller/model/IdentifiantRecherche.model';
import {IdentifiantRechercheService} from 'src/app/controller/service/IdentifiantRecherche.service';

@Component({
  selector: 'app-chercheur-view-chercheur',
  templateUrl: './chercheur-view-chercheur.component.html',
  styleUrls: ['./chercheur-view-chercheur.component.css']
})
export class ChercheurViewChercheurComponent implements OnInit {

        selectedEnjeuxIrdChercheurs: EnjeuxIrdChercheurVo = new EnjeuxIrdChercheurVo();
        enjeuxIrdChercheursListe: Array<EnjeuxIrdChercheurVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedIdentifiantAuteurExperts: IdentifiantAuteurExpertVo = new IdentifiantAuteurExpertVo();
        identifiantAuteurExpertsListe: Array<IdentifiantAuteurExpertVo> = [];

        myIdentifiantRecherches: Array<IdentifiantRechercheVo> = [];


constructor(private datePipe: DatePipe, private chercheurService: ChercheurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private identifiantAuteurExpertService: IdentifiantAuteurExpertService
    ,private enjeuxIrdService: EnjeuxIrdService
    ,private enjeuxIrdChercheurService: EnjeuxIrdChercheurService
    ,private identifiantRechercheService: IdentifiantRechercheService
) {
}

// methods
ngOnInit(): void {
                this.selectedEnjeuxIrdChercheurs.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedIdentifiantAuteurExperts.identifiantRechercheVo = new IdentifiantRechercheVo();
                this.identifiantRechercheService.findAll().subscribe((data) => this.identifiantRecherches = data);
}

hideViewDialog(){
    this.viewChercheurDialog  = false;
}

// getters and setters

get chercheurs(): Array<ChercheurVo> {
    return this.chercheurService.chercheurs;
       }
set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }

 get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }

   get viewChercheurDialog(): boolean {
           return this.chercheurService.viewChercheurDialog;

       }
    set viewChercheurDialog(value: boolean) {
        this.chercheurService.viewChercheurDialog= value;
       }

       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds():Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get editEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
      set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
       }
       get selectedIdentifiantRecherche(): IdentifiantRechercheVo {
           return this.identifiantRechercheService.selectedIdentifiantRecherche;
       }
      set selectedIdentifiantRecherche(value: IdentifiantRechercheVo) {
        this.identifiantRechercheService.selectedIdentifiantRecherche = value;
       }
       get identifiantRecherches():Array<IdentifiantRechercheVo> {
           return this.identifiantRechercheService.identifiantRecherches;
       }
       set identifiantRecherches(value: Array<IdentifiantRechercheVo>) {
        this.identifiantRechercheService.identifiantRecherches = value;
       }
       get editIdentifiantRechercheDialog(): boolean {
           return this.identifiantRechercheService.editIdentifiantRechercheDialog;
       }
      set editIdentifiantRechercheDialog(value: boolean) {
        this.identifiantRechercheService.editIdentifiantRechercheDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
