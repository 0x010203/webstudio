import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserActionType } from '../../../assets/types/user-active-type.type';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isShowed$ = new Subject<{isShow: boolean, userActionType: UserActionType, service?: string}>();
  constructor() { }

  show(userActionType: UserActionType, service?: string){
    
    this.isShowed$.next({isShow: true, userActionType, service});
  }
  
  hide(userActionType: UserActionType){
    this.isShowed$.next({isShow: false, userActionType});
  }
}
