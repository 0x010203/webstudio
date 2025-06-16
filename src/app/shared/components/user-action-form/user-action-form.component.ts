import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserActionType } from './../../../../assets/types/user-active-type.type';
import { ModalService } from '../../services/modal.service';
import { RequestsService } from '../../services/requests.service';
import { UserRequestType } from '../../../../assets/types/user-request.type';
import { DefaultResponseType } from '../../../../assets/types/default-response.type';

@Component({
  selector: 'user-action-form',
  templateUrl: './user-action-form.component.html',
  styleUrls: ['./user-action-form.component.scss'],
})
export class UserActionFormComponent implements OnInit {
  //@Input() isShowed: boolean = true;
  //@Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  isShowedService: boolean = false;

  UserActionType = UserActionType;

  @Input() userActionType!: UserActionType;

  userRequest: UserRequestType;

  userActionForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    serviceRequest: [
      '',
      this.userActionType === UserActionType.request
        ? Validators.required
        : Validators.nullValidator,
    ],
    message: [''],
  });

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private requestsService: RequestsService
  ) {
    //console.log (this.userActionType);
    this.userRequest = { name: '', phone: '', type: this.userActionType };
  }

  ngOnInit(): void {
    this.modalService.isShowed$.subscribe((data) => {
      //console.log(data);
      this.isShowedService = data.isShow;

      this.userActionType = data.userActionType;

      //console.log (this.userActionType);
      if (this.userActionType === UserActionType.request) {
        // for setting validations
        this.userActionForm
          .get('serviceRequest')
          ?.setValidators(Validators.required);
        if (data.service) {
          this.userActionForm.get('serviceRequest')?.patchValue(data.service);
        }
      } else {
        // for clearing validations
        this.userActionForm.get('serviceRequest')?.clearValidators();
      }
    });
  }

  close() {
    // this.isShowed = false;
    // this.onClose.emit(this.isShowed);
    this.modalService.hide(this.userActionType);
  }

  getConsultation() {
    if (this.userActionForm.valid) {
      this.userRequest.name = this.userActionForm.value.name
        ? this.userActionForm.value.name
        : '';
      this.userRequest.phone = this.userActionForm.value.phone
        ? this.userActionForm.value.phone
        : '';

      this.userRequest.type = this.userActionType;

      this.requestsService
        .sendRequest(this.userRequest)
        .subscribe((data: DefaultResponseType) => {
          if (data.error) {
            throw new Error(data.message);
          }
          this.clearUserDataFromForm();
          this.close();
          this.modalService.show(UserActionType.message);
        });
    }
  }

  sendServiceRequest() {
    //do smth
    if (this.userActionForm.valid) {
      this.userRequest.name = this.userActionForm.value.name
        ? this.userActionForm.value.name
        : '';
      this.userRequest.phone = this.userActionForm.value.phone
        ? this.userActionForm.value.phone
        : '';
      this.userRequest.service = this.userActionForm.value.serviceRequest
        ? this.userActionForm.value.serviceRequest
        : '';
      this.userRequest.type = this.userActionType;

      this.requestsService
        .sendRequest(this.userRequest)
        .subscribe((data: DefaultResponseType) => {
          if (data.error) {
            throw new Error(data.message);
          }
          this.clearUserDataFromForm();
          this.close();
          this.modalService.show(UserActionType.message);
        });
    }
    // this.clearUserDataFromForm();
    // this.close();
    // this.modalService.show(UserActionType.message);
  }

  closeInformMessage() {
    this.close();
  }

  clearUserDataFromForm() {
    this.userActionForm.setValue({
      name: '',
      phone: '',
      serviceRequest: '',
      message: '',
    });
    this.userRequest.name = '';
    this.userRequest.phone = '';
    if (this.userRequest.service) {
      delete this.userRequest.service;
    }

    this.userActionForm.markAsPristine();
    this.userActionForm.markAsUntouched();
  }
}
