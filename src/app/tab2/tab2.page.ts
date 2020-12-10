import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentImage: any;

  constructor(private camera: Camera, public navCtrl: NavController) {}

  takePicture() {
    /*
        TODO: WARNING ! DATA_URL can be very memory intensive and cause app crashes or out of memory errors
     */
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }).catch(console.error);
  }

  deletePicture() {
    this.currentImage = null;
  }

  savePicture() {
    if(this.currentImage){
      this.navCtrl.navigateForward('register', {
        queryParams: {
          image: this.currentImage
        }
      }).catch(console.error);
    }
  }
}
