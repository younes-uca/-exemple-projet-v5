import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueErcService} from 'src/app/controller/service/DisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcVo} from 'src/app/controller/model/DisciplineScientifiqueErc.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { DisciplineScientifiqueErcParentService } from 'src/app/controller/service/DisciplineScientifiqueErcParent.service';

import {KeyWordDisciplineScientifiqueErcVo} from 'src/app/controller/model/KeyWordDisciplineScientifiqueErc.model';
import {DisciplineScientifiqueErcParentVo} from 'src/app/controller/model/DisciplineScientifiqueErcParent.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-discipline-scientifique-erc-list-admin',
  templateUrl: './discipline-scientifique-erc-list-admin.component.html',
  styleUrls: ['./discipline-scientifique-erc-list-admin.component.css']
})
export class DisciplineScientifiqueErcListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DisciplineScientifiqueErc';
     yesOrNoArchive :any[] =[];
    disciplineScientifiqueErcParents :Array<DisciplineScientifiqueErcParentVo>;


    constructor(private datePipe: DatePipe, private disciplineScientifiqueErcService: DisciplineScientifiqueErcService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private disciplineScientifiqueErcParentService: DisciplineScientifiqueErcParentService
) { }

    ngOnInit() : void {
      this.loadDisciplineScientifiqueErcs();
      this.initExport();
      this.initCol();
      this.loadDisciplineScientifiqueErcParent();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadDisciplineScientifiqueErcs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErc', 'list');
        isPermistted ? this.disciplineScientifiqueErcService.findAll().subscribe(disciplineScientifiqueErcs => this.disciplineScientifiqueErcs = disciplineScientifiqueErcs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'probl??me d\'autorisation'});
    }


  public searchRequest(){
        this.disciplineScientifiqueErcService.findByCriteria(this.searchDisciplineScientifiqueErc).subscribe(disciplineScientifiqueErcs=>{
            
            this.disciplineScientifiqueErcs = disciplineScientifiqueErcs;
           // this.searchDisciplineScientifiqueErc = new DisciplineScientifiqueErcVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelleFr', header: 'Libelle fr'},
                            {field: 'libelleEng', header: 'Libelle eng'},
                            {field: 'code', header: 'Code'},
                            {field: 'niveau', header: 'Niveau'},
                        {field: 'disciplineScientifiqueErcParent?.libelleEng', header: 'Discipline scientifique erc parent'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editDisciplineScientifiqueErc(disciplineScientifiqueErc: DisciplineScientifiqueErcVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErc', 'edit');
         if(isPermistted){
          this.disciplineScientifiqueErcService.findByIdWithAssociatedList(disciplineScientifiqueErc).subscribe(res => {
           this.selectedDisciplineScientifiqueErc = res;
            this.selectedDisciplineScientifiqueErc.dateArchivage = new Date(disciplineScientifiqueErc.dateArchivage);
            this.selectedDisciplineScientifiqueErc.dateCreation = new Date(disciplineScientifiqueErc.dateCreation);
            this.editDisciplineScientifiqueErcDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probl??me de permission'
            });
         }
       
    }
    


   public async viewDisciplineScientifiqueErc(disciplineScientifiqueErc: DisciplineScientifiqueErcVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErc', 'view');
        if(isPermistted){
           this.disciplineScientifiqueErcService.findByIdWithAssociatedList(disciplineScientifiqueErc).subscribe(res => {
           this.selectedDisciplineScientifiqueErc = res;
            this.selectedDisciplineScientifiqueErc.dateArchivage = new Date(disciplineScientifiqueErc.dateArchivage);
            this.selectedDisciplineScientifiqueErc.dateCreation = new Date(disciplineScientifiqueErc.dateCreation);
            this.viewDisciplineScientifiqueErcDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'probl??me d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDisciplineScientifiqueErc(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDisciplineScientifiqueErc = new DisciplineScientifiqueErcVo();
            this.createDisciplineScientifiqueErcDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'probl??me d\'autorisation'
            });
        }
       
    }
public async archiverDisciplineScientifiqueErc(disciplineScientifiqueErc: DisciplineScientifiqueErcVo){
const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErc', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet ??l??ment (Discipline scientifique erc) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.disciplineScientifiqueErcService.archiver(disciplineScientifiqueErc).subscribe(status=>{
const myIndex = this.disciplineScientifiqueErcs.indexOf(disciplineScientifiqueErc);
this.disciplineScientifiqueErcs[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succ??s',
detail: 'Discipline scientifique erc archiv??',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Probl??me de permission'
});
}
}

public async desarchiverDisciplineScientifiqueErc(disciplineScientifiqueErc: DisciplineScientifiqueErcVo){
const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErc', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous d??sarchiver cet ??l??ment (Discipline scientifique erc) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.disciplineScientifiqueErcService.desarchiver(disciplineScientifiqueErc).subscribe(status=>{
const myIndex = this.disciplineScientifiqueErcs.indexOf(disciplineScientifiqueErc);
this.disciplineScientifiqueErcs[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succ??s',
detail: 'Discipline scientifique erc d??sarchiv??',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Probl??me de permission'
});
}
}


    public async deleteDisciplineScientifiqueErc(disciplineScientifiqueErc: DisciplineScientifiqueErcVo){
       const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErc', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet ??l??ment (Discipline scientifique erc) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.disciplineScientifiqueErcService.delete(disciplineScientifiqueErc).subscribe(status=>{
                          if(status > 0){
                          const position = this.disciplineScientifiqueErcs.indexOf(disciplineScientifiqueErc);
                          position > -1 ? this.disciplineScientifiqueErcs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succ??s',
                        detail: 'Discipline scientifique erc Supprim??',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Probl??me de permission'
              });
             }
    }

public async loadDisciplineScientifiqueErcParent(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErc', 'list');
    isPermistted ? this.disciplineScientifiqueErcParentService.findAll().subscribe(disciplineScientifiqueErcParents => this.disciplineScientifiqueErcParents = disciplineScientifiqueErcParents,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Probl??me de permission'});

}

public async duplicateDisciplineScientifiqueErc(disciplineScientifiqueErc: DisciplineScientifiqueErcVo) {

     this.disciplineScientifiqueErcService.findByIdWithAssociatedList(disciplineScientifiqueErc).subscribe(
	 res => {
	       this.initDuplicateDisciplineScientifiqueErc(res);
	       this.selectedDisciplineScientifiqueErc = res;
	       this.selectedDisciplineScientifiqueErc.id = null;
            this.createDisciplineScientifiqueErcDialog = true;

});

	}

	initDuplicateDisciplineScientifiqueErc(res: DisciplineScientifiqueErcVo) {
        if (res.keyWordDisciplineScientifiqueErcsVo != null) {
             res.keyWordDisciplineScientifiqueErcsVo.forEach(d => { d.disciplineScientifiqueErcVo = null; d.id = null; });
                }


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.disciplineScientifiqueErcs.map(e => {
    return {
                    'Libelle fr': e.libelleFr ,
                    'Libelle eng': e.libelleEng ,
                    'Code': e.code ,
                    'Niveau': e.niveau ,
            'Discipline scientifique erc parent': e.disciplineScientifiqueErcParentVo?.libelleEng ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Libelle fr': this.searchDisciplineScientifiqueErc.libelleFr ? this.searchDisciplineScientifiqueErc.libelleFr : environment.emptyForExport ,
            'Libelle eng': this.searchDisciplineScientifiqueErc.libelleEng ? this.searchDisciplineScientifiqueErc.libelleEng : environment.emptyForExport ,
            'Code': this.searchDisciplineScientifiqueErc.code ? this.searchDisciplineScientifiqueErc.code : environment.emptyForExport ,
            'Niveau Min': this.searchDisciplineScientifiqueErc.niveauMin ? this.searchDisciplineScientifiqueErc.niveauMin : environment.emptyForExport ,
            'Niveau Max': this.searchDisciplineScientifiqueErc.niveauMax ? this.searchDisciplineScientifiqueErc.niveauMax : environment.emptyForExport ,
        'Discipline scientifique erc parent': this.searchDisciplineScientifiqueErc.disciplineScientifiqueErcParentVo?.libelleEng ? this.searchDisciplineScientifiqueErc.disciplineScientifiqueErcParentVo?.libelleEng : environment.emptyForExport ,
            'Archive': this.searchDisciplineScientifiqueErc.archive ? (this.searchDisciplineScientifiqueErc.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchDisciplineScientifiqueErc.dateArchivageMin ? this.datePipe.transform(this.searchDisciplineScientifiqueErc.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchDisciplineScientifiqueErc.dateArchivageMax ? this.datePipe.transform(this.searchDisciplineScientifiqueErc.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchDisciplineScientifiqueErc.dateCreationMin ? this.datePipe.transform(this.searchDisciplineScientifiqueErc.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchDisciplineScientifiqueErc.dateCreationMax ? this.datePipe.transform(this.searchDisciplineScientifiqueErc.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get disciplineScientifiqueErcs() : Array<DisciplineScientifiqueErcVo> {
           return this.disciplineScientifiqueErcService.disciplineScientifiqueErcs;
       }
    set disciplineScientifiqueErcs(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcs = value;
       }

    get disciplineScientifiqueErcSelections() : Array<DisciplineScientifiqueErcVo> {
           return this.disciplineScientifiqueErcService.disciplineScientifiqueErcSelections;
       }
    set disciplineScientifiqueErcSelections(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcSelections = value;
       }
   
     


    get selectedDisciplineScientifiqueErc() : DisciplineScientifiqueErcVo {
           return this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc;
       }
    set selectedDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc = value;
       }
    
    get createDisciplineScientifiqueErcDialog() :boolean {
           return this.disciplineScientifiqueErcService.createDisciplineScientifiqueErcDialog;
       }
    set createDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.createDisciplineScientifiqueErcDialog= value;
       }
    
    get editDisciplineScientifiqueErcDialog() :boolean {
           return this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog;
       }
    set editDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog= value;
       }
    get viewDisciplineScientifiqueErcDialog() :boolean {
           return this.disciplineScientifiqueErcService.viewDisciplineScientifiqueErcDialog;
       }
    set viewDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.viewDisciplineScientifiqueErcDialog = value;
       }
       
     get searchDisciplineScientifiqueErc() : DisciplineScientifiqueErcVo {
        return this.disciplineScientifiqueErcService.searchDisciplineScientifiqueErc;
       }
    set searchDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.searchDisciplineScientifiqueErc = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
