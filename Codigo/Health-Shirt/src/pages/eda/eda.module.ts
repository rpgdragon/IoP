import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EdaPage } from './eda';

@NgModule({
  declarations: [
    EdaPage,
  ],
  imports: [
    IonicPageModule.forChild(EdaPage),
  ],
})
export class EdaPageModule {}
