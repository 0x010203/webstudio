import { Component, Input, OnInit } from '@angular/core';
import { ServiceType } from '../../../../assets/types/service.type';
import { ModalService } from '../../services/modal.service';
import { UserActionType } from '../../../../assets/types/user-active-type.type';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {

  @Input() service!: ServiceType;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  serviceAboutShow(){
    //console.log(this.service.title);
    this.modalService.show(UserActionType.request, this.service.title);
  }
}
