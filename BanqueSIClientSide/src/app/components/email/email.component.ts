import { Component,OnInit,AfterViewInit } from '@angular/core';
import {AuthenticateService} from '../service/authenticate.service';
import {EmailService} from '../service/email.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'email',
  templateUrl: 'email.component.html'
})
export class EmailComponent implements OnInit {

    //-- ATTRIBUTS
    Employe = {codePersonne : null,agence: {codeAgence:0}};
    EmailStat = {};

    //-- CONSTRUCTOR && INJECTING SERVICES 
    constructor(
        private authService: AuthenticateService,
        private emailService : EmailService,
        private spinnerService: Ng4LoadingSpinnerService,
        private modal: Modal
    ){
      this.spinnerService.show();
  }
  //-- END CONSTRUCTOR && INJECTING SERVICES 

  //-- METHODES
 

  //-- INITIALIZING FUNCTIONS
  ngOnInit() {
    this.authService.getUsernameInfo$().subscribe(
        res => {
          this.authService.getUserInfo$(res.data.userName).subscribe(
              resp => {
                  this.Employe = resp;
                  this.GetEmailStat();
              }
          );
        });
  }
  //-- END INITIALIZING FUNCTIONS

 /* async ngAfterViewInit() {
    await this.loadScript('../../../assets/js/plugins/jquery/jquery.min.js');
    await this.loadScript("../../../assets/js/plugins/jquery/jquery-ui.min.js");
    await this.loadScript("../../../assets/js/plugins/bootstrap/bootstrap.min.js");
    await this.loadScript("../../../assets/js/plugins/icheck/icheck.min.js");
    await this.loadScript("../../../assets/js/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js");
    await this.loadScript("../../../assets/js/plugins/smartwizard/jquery.smartWizard-2.0.min.js");
    await this.loadScript("../../../assets/js/plugins/scrolltotop/scrolltopcontrol.js");
    await this.loadScript("../../../assets/js/plugins/rickshaw/d3.v3.js");
    await this.loadScript("../../../assets/js/plugins/rickshaw/rickshaw.min.js");
    await this.loadScript("../../../assets/js/plugins/bootstrap/bootstrap-datepicker.js");
    await this.loadScript("../../../assets/js/plugins/bootstrap/bootstrap-timepicker.min.js");
    await this.loadScript("../../../assets/js/plugins/bootstrap/bootstrap-colorpicker.js");
    await this.loadScript("../../../assets/js/plugins/bootstrap/bootstrap-file-input.js");
    await this.loadScript("../../../assets/js/plugins/bootstrap/bootstrap-select.js");
    await this.loadScript("../../../assets/js/plugins/tagsinput/jquery.tagsinput.min.js");
    await this.loadScript("../../../assets/js/plugins/owl/owl.carousel.min.js");
    await this.loadScript("../../../assets/js/plugins/knob/jquery.knob.min.js");
    await this.loadScript("../../../assets/js/plugins/moment.min.js");
    await this.loadScript("../../../assets/js/plugins/daterangepicker/daterangepicker.js");
    await this.loadScript("../../../assets/js/plugins/summernote/summernote.js");
    await this.loadScript("../../../assets/js/plugins.js");
    await this.loadScript("../../../assets/js/actions.js");
    await this.loadScript("../../../assets/js/demo_dashboard.js");

  }
  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
    })
  }
*/

  GetEmailStat(){
    this.emailService.GetStatisticalMail(this.Employe.codePersonne).subscribe(
      res => {
        this.EmailStat = res;
        this.spinnerService.hide();
      }
    )
  }

  //-- END METHODES
}