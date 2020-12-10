import { Component } from '@angular/core';
import {Picture} from '../../models/Picture';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../../services/storage.services';
import {NavController, ToastController} from '@ionic/angular';
import {SQLStorageService} from '../../services/sql.storage.services';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.page.html',
  styleUrls: ['./custom-page.page.scss'],
})
export class CustomPagePage {
  picture: Picture;
  lastName: string = '';
  loading: boolean = true;

  constructor(
      private route: ActivatedRoute,
      private navCtrl: NavController,
      private storageService: SQLStorageService,
      public toastController: ToastController
  ) {
    route.queryParams.subscribe(params=>{
      this.picture = params['picture'];
      this.lastName = this.picture.name;
      this.loading = false;
    })
  }

  update()
  {
    if(this.picture.name !== this.lastName && this.isNameValid()){
      this.loading = true;
      const pictureName = this.picture.name;
      this.picture.name = this.lastName;
      this.storageService.updatePicture(this.picture, () => {
        this.loading = false;
        this.setToast('Modification successfully')
      }, (err) => {
        this.loading = false;
        this.picture.name = pictureName;
        this.setToast('An error has occurred...')
      })
    }
  }

  isNameValid()
  {
    return this.lastName && this.lastName.length > 0 && this.lastName.length < 64;
  }

  setToast(message: string, duration: number = 3000){
    this.toastController.create({
      message: message,
      duration: duration
    }).then(value => value.present()).catch(console.error)
  }

  destroy(picture: Picture) {
    this.storageService.removePicture(picture, () => {
      this.setToast('The image has been deleted');
      this.navCtrl.pop().catch(console.error);
    }, (err) => {
      this.setToast('An error has occurred...');
    })
  }

  saveToGallery(picture: Picture) {
    console.log('Save To Gallery !!');
    this.setToast('Save to gallery soon...');
  }
}
