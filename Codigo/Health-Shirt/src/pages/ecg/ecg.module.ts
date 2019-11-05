import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EcgPage } from './ecg';

@NgModule({
  declarations: [
    EcgPage,
  ],
  imports: [
    IonicPageModule.forChild(EcgPage),
  ],
})
export class EcgPageModule {}
