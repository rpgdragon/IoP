import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditarcamisetaPage} from '@pages/editarcamiseta/editarcamiseta';

/**
 * Generated class for the EditarcamisetaxcaidaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editarcamisetaxcaida',
  templateUrl: 'editarcamisetaxcaida.html',
})
export class EditarcamisetaxcaidaPage {
  private editarcamiseta:EditarcamisetaPage;
  public camiseta:Object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.editarcamiseta = this.navParams.get('formulario');
    this.camiseta = this.editarcamiseta.getCamiseta();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarcamisetaxcaidaPage');
  }

  editarCamiseta(){
    this.editarcamiseta.editarCamiseta();
  }

}
