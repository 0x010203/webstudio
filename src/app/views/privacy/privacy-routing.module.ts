import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonPrivacyComponent } from './common-privacy/common-privacy.component';

const routes: Routes = [{ path: 'privacy', component: CommonPrivacyComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PrivacyRoutingModule {}
