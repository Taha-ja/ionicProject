import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../services/ionic-auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IonicToastService } from '../services/ionic-toast.service';
import { LoadingController, MenuController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  email:string;
  

  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Provide email.' 
      },
      { 
        type: 'pattern', 
        message: 'Email is not valid.' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'Password is required.' 
      },
      { 
        type: 'minlength', 
        message: 'Password length should be 6 characters long.' 
      }
    ]
  };

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private fb: FormBuilder,
    private ionicToastService: IonicToastService,
    private menu: MenuController,
    private lodingController:LoadingController,
  ) { 
  }
ionViewWillEnter() {

    this.menu.swipeGesture(false)
}

ionViewDidLeave() {

    this.menu.swipeGesture( false )
}
forgotLogging(){
  this.router.navigateByUrl('recover');
}
  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl(this.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }
  async signIn(value) {
    let loading =await this.lodingController.create({
      message:'please wait ...',
      spinner:"bubbles",
      cssClass:'spinnerLoadingClass'
    })
    await loading.present();
    setTimeout(()=>{
      loading.dismiss();
      this.ionicAuthService.signinUser(value)
      .then((response) => {
        console.log(response)
        this.errorMsg = "";
        this.ionicToastService.showToast("Bienvenue");
        this.router.navigateByUrl('home');
        this.userForm.reset();
      }, error => {
        this.ionicToastService.showToast("the mail or the password is incorrect");
      })
      
      console.log("api responded!")
    },1500)

  }

  goToSignup() {
    this.userForm.reset();
    this.router.navigateByUrl('register');
  }
}