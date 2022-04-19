import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonicToastService {

  private myToast: any;

  constructor(
    private toast: ToastController
  ) { }

  showToast(msg:string) {
    this.myToast = this.toast.create({
      message: msg,
      animated:true,
      cssClass:"my-custom-class",
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  HideToast() {
    this.myToast = this.toast.dismiss();
  }

}