import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditarcamisetaPage} from '@pages/editarcamiseta/editarcamiseta';

/**
 * Generated class for the EditarcamisetaxtemperaturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-editarcamisetaxtemperatura',
  templateUrl: 'editarcamisetaxtemperatura.html',
})
export class EditarcamisetaxtemperaturaPage {
  private editarcamiseta:EditarcamisetaPage;
  public camiseta:Object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.editarcamiseta = this.navParams.get('formulario');
    this.camiseta = this.editarcamiseta.getCamiseta();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarcamisetaxtemperaturaPage');
  }

  editarCamiseta(){
    this.editarcamiseta.editarCamiseta();
  }

}
