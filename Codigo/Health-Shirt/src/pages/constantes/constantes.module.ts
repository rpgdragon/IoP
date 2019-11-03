import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstantesPage } from './constantes';

@NgModule({
  declarations: [
    ConstantesPage,
  ],
  imports: [
    IonicPageModule.forChild(ConstantesPage),
  ],
})
export class ConstantesPageModule {}
