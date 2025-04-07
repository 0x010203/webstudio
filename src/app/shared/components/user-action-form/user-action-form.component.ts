import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {UserActionType} from './../../../../assets/types/user-active-type.type';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'user-action-form',
  templateUrl: './user-action-form.component.html',
  styleUrls: ['./user-action-form.component.scss']
})

export class UserActionFormComponent implements OnInit {

  //@Input() isShowed: boolean = true;
  //@Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  isShowedService: boolean = false;

  UserActionType = UserActionType;
  
  @Input() userActionType: UserActionType = UserActionType.request;
  
  userActionForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    serviceRequest: ['', this.userActionType === UserActionType.request ? Validators.required : Validators.nullValidator],
    message: [''],
  })

  constructor(private fb: FormBuilder, private modalService: ModalService) {
    //console.log (this.userActionType);

   }

  



  ngOnInit(): void {
    this.modalService.isShowed$.subscribe((data)=>{
      //console.log(data);
      this.isShowedService = data.isShow;

      this.userActionType = data.userActionType;
      
      //console.log (this.userActionType);
      if (this.userActionType === UserActionType.request) { // for setting validations
        this.userActionForm.get('serviceRequest')?.setValidators(Validators.required);
        if (data.service){
          this.userActionForm.get('serviceRequest')?.patchValue(data.service);
        }
      } else 
      { // for clearing validations
        this.userActionForm.get('serviceRequest')?.clearValidators();
      }
    })
    
  }

  close(){
    // this.isShowed = false;
    // this.onClose.emit(this.isShowed);
    this.modalService.hide(this.userActionType);
  }

  getConsultation(){
    //do smth
    
    this.userActionForm.setValue({name: '', phone: '', serviceRequest: '', message: ''});
    this.userActionForm.markAsPristine();
    this.userActionForm.markAsUntouched();
    this.close();
    this.modalService.show(UserActionType.message);
  }

  sendServiceRequest(){
    //do smth

    this.userActionForm.setValue({name: '', phone: '', serviceRequest: '', message: ''});
    this.userActionForm.markAsPristine();
    this.userActionForm.markAsUntouched();
    this.close();
    this.modalService.show(UserActionType.message);
  }

  closeInformMessage(){
    this.close();
  }

}
