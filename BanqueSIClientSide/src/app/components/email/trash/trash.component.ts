import { Component,OnInit,ViewContainerRef } from '@angular/core';
import {AuthenticateService} from '../../service/authenticate.service';
import {EmailService} from '../../service/email.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import * as _ from 'underscore';
import {ActivatedRoute} from "@angular/router";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router,NavigationExtras} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'trash',
  templateUrl: 'trash.component.html'
})
export class TrashComponent implements OnInit {

    //-- ATTRIBUTS
    Employe = {codePersonne : null,email:null,agence: {codeAgence:0}};
    EmailInbox = [];
    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
    //-- END ATTRIBUTS
    //-- END ATTRIBUTS

    //-- CONSTRUCTOR && INJECTING SERVICES 
    constructor(
        private authService: AuthenticateService,
        private emailService : EmailService,
        private spinnerService: Ng4LoadingSpinnerService,
        private modal: Modal,
        private route: ActivatedRoute,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private router: Router
    ){
        this.toastr.setRootViewContainerRef(vcr);
        //this.spinnerService.show();
     }
  //-- END CONSTRUCTOR && INJECTING SERVICES 

  //-- METHODES

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage+2;
        }
    }
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    let pages = _.range(startPage, endPage + 1);
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.getPager(this.EmailInbox.length, page);

    // get current page of items
    this.pagedItems = this.EmailInbox.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  //-- INITIALIZING FUNCTIONS
  ngOnInit() {
    this.authService.getUsernameInfo$().subscribe(
        res => {
          this.authService.getUserInfo$(res.data.userName).subscribe(
              resp => {
                  this.Employe = resp;
                  this.GetEmailList();
              }
          );
    });
  }

  GetEmailList(){
    this.emailService.GetEmailDraftList(this.Employe.email,this.Employe.codePersonne).subscribe(
      res => {
        this.EmailInbox = res;
        this.setPage(1);
      }
    )
  }

  GoBack(email){
    let navigationExtras: NavigationExtras = {
        queryParams: {
            "dateEmail": email.dateEmail,
            "from":email.from,
            "messageEmail":email.messageEmail,
            "nomPersonne":email.nomPersonne,
            "objectEmail":email.objectEmail,
            "to":email.to,
            "username":email.userName,
            "IdEmail":email.idEmail,
            "CodePersonne":email.codePersonne
        }
    };
    this.router.navigate(['stb/email/trashModified'],navigationExtras);
    }
}
