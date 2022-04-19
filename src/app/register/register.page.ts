import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../services/ionic-auth.service';
import { FormGroup, FormBuilder, Validators,FormControl, NgControl } from '@angular/forms';
import { IonicToastService } from '../services/ionic-toast.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../beans/user';
import { LoadingController, MenuController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  isNotEqual:boolean=false;
  msg:string;
  fname:string;
  lname:string;
  user:User;

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
    ],
    "confirmPassword":[
      { 
        type: 'required', 
        message: '' 
      },
      { type:'notEqual',
        message: 'you should enter the same password!' 
      }],

  };

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private fb: FormBuilder,
    private ionicToastService: IonicToastService,
    private menu: MenuController,
    private lodingController:LoadingController,
  ) { }
ionViewWillEnter() {

    this.menu.swipeGesture(false)
}

ionViewDidLeave() {

    this.menu.swipeGesture( false )
}
  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      confirmPassword:new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
      ])),
      fname: ['', [Validators.required, Validators.minLength(2)]],
      lname: ['', [Validators.required, Validators.minLength(2)]],
    });

  }
  async signUp(value) {
    this.user= {
      email: value.email,
      fullName: this.fname+" "+this.lname,
    };
    console.log(value.fname+" "+value.lname)
    console.log(this.user.email)
    if(this.userForm.get("password").value==this.userForm.get("confirmPassword").value){
      this.isNotEqual=false;

      let loading =await this.lodingController.create({
        message:'please wait ...',
        spinner:"bubbles",
        cssClass:'spinnerLoadingClass'
      })
      await loading.present();
      setTimeout(()=>{
        loading.dismiss();
        this.ionicAuthService.createUser(value)
        .then((response) => {
          this.ionicAuthService.SetUserData(this.user)
          this.ionicToastService.showToast("user added.");
          this.router.navigate(['login']);
        
  
        }, error => {
          this.ionicToastService.showToast("the email is already used in an other account");
          
        })
        
        console.log("api responded!")
      },1500)



    }
      else{
        console.log("can not do anything")
        this.userForm.get('confirmPassword').setErrors(this.error_msg.confirmPassword)
        this.isNotEqual=true
        this.ionicToastService.showToast("user not added")
      }
}

  goToLogin() {
    this.userForm.reset();
    this.router.navigateByUrl('login');

  }
  }