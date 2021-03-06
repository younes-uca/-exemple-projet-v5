import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueService} from 'src/app/controller/service/DisciplineScientifique.service';
import {DisciplineScientifiqueVo} from 'src/app/controller/model/DisciplineScientifique.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueParentVo} from 'src/app/controller/model/DisciplineScientifiqueParent.model';
import {DisciplineScientifiqueParentService} from 'src/app/controller/service/DisciplineScientifiqueParent.service';
import {DisciplineScientifiqueErcVo} from 'src/app/controller/model/DisciplineScientifiqueErc.model';
import {DisciplineScientifiqueErcService} from 'src/app/controller/service/DisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcAssociationVo} from 'src/app/controller/model/DisciplineScientifiqueErcAssociation.model';
import {DisciplineScientifiqueErcAssociationService} from 'src/app/controller/service/DisciplineScientifiqueErcAssociation.service';
import {SemanticRelationshipVo} from 'src/app/controller/model/SemanticRelationship.model';
import {SemanticRelationshipService} from 'src/app/controller/service/SemanticRelationship.service';

@Component({
  selector: 'app-discipline-scientifique-edit-admin',
  templateUrl: './discipline-scientifique-edit-admin.component.html',
  styleUrls: ['./discipline-scientifique-edit-admin.component.css']
})
export class DisciplineScientifiqueEditAdminComponent implements OnInit {

        selectedDisciplineScientifiqueErcAssociations: DisciplineScientifiqueErcAssociationVo = new DisciplineScientifiqueErcAssociationVo();
        disciplineScientifiqueErcAssociationsListe: Array<DisciplineScientifiqueErcAssociationVo> = [];

        myDisciplineScientifiqueErcs: Array<DisciplineScientifiqueErcVo> = [];
        mySemanticRelationships: Array<SemanticRelationshipVo> = [];


constructor(private datePipe: DatePipe, private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private disciplineScientifiqueParentService: DisciplineScientifiqueParentService
 ,       private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
 ,       private disciplineScientifiqueErcAssociationService: DisciplineScientifiqueErcAssociationService
 ,       private semanticRelationshipService: SemanticRelationshipService
) {
}

// methods
ngOnInit(): void {
                this.selectedDisciplineScientifiqueErcAssociations.disciplineScientifiqueErcVo = new DisciplineScientifiqueErcVo();
                this.disciplineScientifiqueErcService.findAll().subscribe((data) => this.disciplineScientifiqueErcs = data);
                this.selectedDisciplineScientifiqueErcAssociations.semanticRelationshipVo = new SemanticRelationshipVo();
                this.semanticRelationshipService.findAll().subscribe((data) => this.semanticRelationships = data);
    this.selectedDisciplineScientifiqueParent = new DisciplineScientifiqueParentVo();
    this.disciplineScientifiqueParentService.findAll().subscribe((data) => this.disciplineScientifiqueParents = data);
}
        addDisciplineScientifiqueErcAssociations() {
        if( this.selectedDisciplineScientifique.disciplineScientifiqueErcAssociationsVo == null ){
            this.selectedDisciplineScientifique.disciplineScientifiqueErcAssociationsVo = new Array<DisciplineScientifiqueErcAssociationVo>();
        }
        this.selectedDisciplineScientifique.disciplineScientifiqueErcAssociationsVo.push(this.selectedDisciplineScientifiqueErcAssociations);
        this.selectedDisciplineScientifiqueErcAssociations = new DisciplineScientifiqueErcAssociationVo();
        }

       deleteDisciplineScientifiqueErcAssociations(p: DisciplineScientifiqueErcAssociationVo) {
        this.selectedDisciplineScientifique.disciplineScientifiqueErcAssociationsVo.forEach((element, index) => {
            if (element === p) { this.selectedDisciplineScientifique.disciplineScientifiqueErcAssociationsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedDisciplineScientifique.dateArchivage = DateUtils.toDate(this.selectedDisciplineScientifique.dateArchivage);
            this.selectedDisciplineScientifique.dateCreation = DateUtils.toDate(this.selectedDisciplineScientifique.dateCreation);
    this.disciplineScientifiqueService.edit().subscribe(disciplineScientifique=>{
    const myIndex = this.disciplineScientifiques.findIndex(e => e.id === this.selectedDisciplineScientifique.id);
    this.disciplineScientifiques[myIndex] = this.selectedDisciplineScientifique;
    this.editDisciplineScientifiqueDialog = false;
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatedisciplineScientifiqueParent(disciplineScientifiqueParent: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueParent', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifiqueParent = new DisciplineScientifiqueParentVo();
        this.createDisciplineScientifiqueParentDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'probl??me de permission'
            });
        }
}
              public async openCreatedisciplineScientifiqueErc(disciplineScientifiqueErc: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErc', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifiqueErc = new DisciplineScientifiqueErcVo();
        this.createDisciplineScientifiqueErcDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'probl??me de permission'
            });
        }
}
              public async openCreatesemanticRelationship(semanticRelationship: string) {
                      const isPermistted = await this.roleService.isPermitted('SemanticRelationship', 'add');
                       if(isPermistted){
         this.selectedSemanticRelationship = new SemanticRelationshipVo();
        this.createSemanticRelationshipDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'probl??me de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editDisciplineScientifiqueDialog  = false;
}

// getters and setters

get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
    return this.disciplineScientifiqueService.disciplineScientifiques;
       }
set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }

 get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
    set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }

   get editDisciplineScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueService.editDisciplineScientifiqueDialog;

       }
    set editDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.editDisciplineScientifiqueDialog = value;
       }

       get selectedDisciplineScientifiqueParent(): DisciplineScientifiqueParentVo {
           return this.disciplineScientifiqueParentService.selectedDisciplineScientifiqueParent;
       }
      set selectedDisciplineScientifiqueParent(value: DisciplineScientifiqueParentVo) {
        this.disciplineScientifiqueParentService.selectedDisciplineScientifiqueParent = value;
       }
       get disciplineScientifiqueParents(): Array<DisciplineScientifiqueParentVo> {
           return this.disciplineScientifiqueParentService.disciplineScientifiqueParents;
       }
       set disciplineScientifiqueParents(value: Array<DisciplineScientifiqueParentVo>) {
        this.disciplineScientifiqueParentService.disciplineScientifiqueParents = value;
       }
       get createDisciplineScientifiqueParentDialog(): boolean {
           return this.disciplineScientifiqueParentService.createDisciplineScientifiqueParentDialog;
       }
      set createDisciplineScientifiqueParentDialog(value: boolean) {
        this.disciplineScientifiqueParentService.createDisciplineScientifiqueParentDialog= value;
       }
       get selectedDisciplineScientifiqueErc(): DisciplineScientifiqueErcVo {
           return this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc;
       }
      set selectedDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc = value;
       }
       get disciplineScientifiqueErcs(): Array<DisciplineScientifiqueErcVo> {
           return this.disciplineScientifiqueErcService.disciplineScientifiqueErcs;
       }
       set disciplineScientifiqueErcs(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcs = value;
       }
       get createDisciplineScientifiqueErcDialog(): boolean {
           return this.disciplineScientifiqueErcService.createDisciplineScientifiqueErcDialog;
       }
      set createDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.createDisciplineScientifiqueErcDialog= value;
       }
       get selectedSemanticRelationship(): SemanticRelationshipVo {
           return this.semanticRelationshipService.selectedSemanticRelationship;
       }
      set selectedSemanticRelationship(value: SemanticRelationshipVo) {
        this.semanticRelationshipService.selectedSemanticRelationship = value;
       }
       get semanticRelationships(): Array<SemanticRelationshipVo> {
           return this.semanticRelationshipService.semanticRelationships;
       }
       set semanticRelationships(value: Array<SemanticRelationshipVo>) {
        this.semanticRelationshipService.semanticRelationships = value;
       }
       get createSemanticRelationshipDialog(): boolean {
           return this.semanticRelationshipService.createSemanticRelationshipDialog;
       }
      set createSemanticRelationshipDialog(value: boolean) {
        this.semanticRelationshipService.createSemanticRelationshipDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
