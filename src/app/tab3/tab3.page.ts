import { Component } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {SQLStorageService} from '../../services/sql.storage.services';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  name?: string;
  data: string;
  loading: boolean = false;

  constructor(
      private navCtrl: NavController,
      private route: ActivatedRoute,
      private storageService: SQLStorageService,
      public toastController: ToastController
  ) {
    route.queryParams.subscribe(params => {
      this.data = params['image'];
    });
  }

  register() {
    if(this.isNameValid()){
      this.loading = true;
      this.storageService.insertPicture(this.name, this.data, () => {
        this.loading = false;
        this.setToast(`Your image have been saved.`);
        this.navCtrl.pop().catch(console.error);
      }, err => {
        this.loading = false;
        this.setToast('An error has occurred...');
      });
    }
  }

  isNameValid(){
    return this.name && this.name.length > 0 && this.name.length < 64;
  }

  setToast(message: string, duration: number = 3000){
    this.toastController.create({
      message: message,
      duration: duration
    }).then(value => value.present()).catch(console.error)
  }
}
