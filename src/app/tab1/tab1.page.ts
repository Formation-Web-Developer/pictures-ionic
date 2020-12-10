import {Component, OnDestroy, OnInit} from '@angular/core';
import { StorageService } from '../../services/storage.services';
import {Picture} from '../../models/Picture';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{
  pictures: Picture[] = [];
  error: boolean = false;

  constructor(private storageService: StorageService, private navCtrl: NavController) {}

  ionViewDidEnter(){
    if(this.storageService.needUpdate()){
      this.loadPictures();
      this.storageService.setUpdate(false);
    }
  }

  loadPictures(){
    this.storageService.getPictures(pictures => {
      this.pictures = pictures;
      this.error = false;
    }, (err) => {
      this.error = true
    });
  }

  reload() {
    this.loadPictures();
  }

  openPicture(picture: Picture){
    this.navCtrl.navigateForward('view', {
      queryParams:{
        picture: picture
      }
    }).catch(console.error);
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.ionViewDidEnter();
  }
}
