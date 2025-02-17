import { Component, OnInit, ViewChild } from '@angular/core';
import { UserActionFormComponent } from '../../components/user-action-form/user-action-form.component';
import { UserActionType } from '../../../../assets/types/user-active-type.type';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  showUserActionForm: boolean = false;

  @ViewChild(UserActionFormComponent)
  private userActionFormComponent!: UserActionFormComponent;

  UserActionType = UserActionType;

  constructor() { }

  ngOnInit(): void {
  }

  callMe(){
    this.showUserActionForm = true;
    this.userActionFormComponent.isShowed = true;
  } 

  
}
