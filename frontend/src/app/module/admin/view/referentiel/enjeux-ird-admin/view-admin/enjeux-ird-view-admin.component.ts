import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdService} from 'src/app/controller/service/EnjeuxIrd.service';
import {EnjeuxIrdVo} from 'src/app/controller/model/EnjeuxIrd.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {ChercheurService} from 'src/app/controller/service/Chercheur.service';
import {ChercheurVo} from 'src/app/controller/model/Chercheur.model';

@Component({
  selector: 'app-enjeux-ird-view-admin',
  templateUrl: './enjeux-ird-view-admin.component.html',
  styleUrls: ['./enjeux-ird-view-admin.component.css']
})
export class EnjeuxIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private enjeuxIrdService: EnjeuxIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
, private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEnjeuxIrdDialog  = false;
}

// getters and setters

get hideEnjeuxIrd(): boolean {
        return this.selectedEnjeuxIrd.username != null;
    }

get selectedChercheur(): ChercheurVo {
    return this.chercheurService.selectedChercheur;
}
get enjeuxIrds(): Array<EnjeuxIrdVo> {
    return this.enjeuxIrdService.enjeuxIrds;
       }
set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }

 get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
    set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }

   get viewEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.viewEnjeuxIrdDialog;

       }
    set viewEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.viewEnjeuxIrdDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
