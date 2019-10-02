/**
 * 
 * @author Ali Karimizandi
 * @since 2017 
 *
 */

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

import { ZcBarService, ZcLoadingService, ZcBoxService } from '../../libs';

// login component
@Component({
  // moduleId: module.id,
  templateUrl: 'login.html'
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  form = new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    calendar: new FormControl('1396/05/05', Validators.compose([Validators.required, Validators.minLength(10)])),
    toggle: new FormControl(true),
    dropdown: new FormControl('', Validators.compose([Validators.required,  Validators.minLength(6)])),
  });

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private barService: ZcBarService,
    private loadingService: ZcLoadingService) {
  }

  ngOnInit() {

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.loadingService.show();
    this.authenticationService.login(this.form.controls.username.value, this.form.controls.password.value)
      .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
        this.loadingService.hide();
      },
      error => {
        this.barService.error(error.message);
        this.loadingService.hide();
      }
      );
  }

  sample(value: object) {
   // console.log(this.form.controls.dropdown.value, value, this.form.controls.dropdown.valid);
    console.log(value);
  }

}
