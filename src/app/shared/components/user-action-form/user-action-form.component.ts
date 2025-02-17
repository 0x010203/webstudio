import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {UserActionType} from './../../../../assets/types/user-active-type.type';

@Component({
  selector: 'user-action-form',
  templateUrl: './user-action-form.component.html',
  styleUrls: ['./user-action-form.component.scss']
})

export class UserActionFormComponent implements OnInit {

  @Input() isShowed: boolean = true;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  UserActionType = UserActionType;
   
  userActionForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    serviceRequest: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  @Input() userActionType: UserActionType = UserActionType.request;



  ngOnInit(): void {
  }

  close(){
    this.isShowed = false;
    this.onClose.emit(this.isShowed);
  }

  getConsultation(){
    //do smth
    
    this.userActionForm.setValue({name: '', phone: '', serviceRequest: ''});
    this.userActionForm.markAsPristine();
    this.userActionForm.markAsUntouched();
    this.close();
  }

  sendServiceRequest(){
    //do smth
    
    this.userActionForm.setValue({name: '', phone: '', serviceRequest: ''});
    this.userActionForm.markAsPristine();
    this.userActionForm.markAsUntouched();
    this.close();
  }

}
