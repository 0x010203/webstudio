import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyRoutingModule } from './privacy-routing.module';
import { CommonPrivacyComponent } from './common-privacy/common-privacy.component';


@NgModule({
  declarations: [
    CommonPrivacyComponent
  ],
  imports: [
    CommonModule,
    PrivacyRoutingModule
  ]
})
export class PrivacyModule { }
