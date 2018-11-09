import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from 'app/core/index';
import { RegisterComponent } from './register.component';

const routes: Routes = [{ path: 'register', component: RegisterComponent, data: { title: extract('Register') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RegisterRoutingModule {}
