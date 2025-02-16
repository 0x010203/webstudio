import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'user-action-form',
  templateUrl: './user-action-form.component.html',
  styleUrls: ['./user-action-form.component.scss']
})
export class UserActionFormComponent implements OnInit {

  @Input() isShowed: boolean = true;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  
   
  userActionForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  close(){
    this.isShowed = false;
    this.onClose.emit(this.isShowed);
  }

  getConsultation(){
    //do smth
    this.close();
  }

}
