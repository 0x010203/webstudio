import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { UserActionFormComponent } from '../../components/user-action-form/user-action-form.component';
import { UserActionType } from '../../../../assets/types/user-active-type.type';
import { IsActiveMatchOptions, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  showUserActionForm: boolean = false;

  @ViewChild(UserActionFormComponent)
  private userActionFormComponent!: UserActionFormComponent;
  private userActionType: UserActionType = UserActionType.consultation;
  protected currentYear: number; 

  UserActionType = UserActionType;

  constructor(private modalService: ModalService, private router: Router) {
    this.currentYear = new Date().getFullYear(); 
   }

    linkActiveParams: IsActiveMatchOptions = {
      matrixParams: 'exact',
      queryParams: 'exact',
      paths: 'exact' ,
      fragment: 'exact' ,
    };

  ngOnInit(): void {
  }

  callMe(){
    this.showUserActionForm = true;
    this.modalService.show(this.userActionType);
    //this.userActionFormComponent.isShowed = true;
  } 

  scrollTo(fragment: string): void{
    this.router.navigate(['/'],{fragment}).then(()=>{
      setTimeout(()=>{
        const elem = document.getElementById(fragment);
        if (elem){
          elem.scrollIntoView({behavior: 'smooth'})
        }
      }, 0);
    })
  }
}
