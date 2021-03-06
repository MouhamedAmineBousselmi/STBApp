import { Component, OnDestroy,ViewContainerRef } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html'
  
})
export class LoginComponent implements OnDestroy {

    //-- ATTRIBUTS
    private userName: string;
    private password: string;
    private postStream$: Subscription;
    private idEmploye = 0;
    //-- END ATTRIBUTS

    //-- CONSTRUCTOR && INJECTING SERVICES 
    constructor(private authenticateService: AuthenticateService, private router:Router,private toastr: ToastsManager,private vcr: ViewContainerRef) 
    {
        this.toastr.setRootViewContainerRef(vcr);
    }
    //-- END CONSTRUCTOR && INJECTING SERVICES 

    //-- METHODES
    
    //-- LOGIN FUNCTION
    login() {
        if (this.postStream$) { this.postStream$.unsubscribe }

        this.postStream$ = this.authenticateService.login$(this.userName,this.password).subscribe(
            result => {
                if (result.state == 1) {
                    this.idEmploye = result.data.idEmploye;
                    this.showValid(result.msg);
                    this.authenticateService.SetStat(result.data.idEmploye,true).subscribe(
                        resp => {
                            console.log(resp);
                            
                        }
                    );
                    window.location.reload();
                } else {
                    this.showError(result.msg);
                }
            }
        )
    }
    //-- END LOGIN FUNCTION
    
    //-- DESTROYING DATA SESSIONS
    ngOnDestroy() {
        if(this.postStream$){
             this.postStream$.unsubscribe()
        }
    }
    //-- END DESTROYING DATA SESSIONS

        //-- CONTROLLING
        showError(msg) {
            this.toastr.error(msg, "Error Message");
        }

        showValid(msg) {
            this.toastr.success(msg, 'Confirming message!');
        }
        //-- END CONTROLLING
    
    //-- END METHODES
}
