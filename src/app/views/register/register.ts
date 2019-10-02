/**
 * 
 * @author Ali Karimizandi
 * @since 2017 
 *
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

import { UserModel } from '../../models/user.model';

import { ZcLoadingService } from '../../libs/loading';
import { ZcBarService } from '../../libs/bar/bar';

@Component({
    // moduleId: module.id,
    templateUrl: 'register.html'
})

export class RegisterComponent implements OnInit {

    form = this.formBuilder.group({
        'firstname': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        'lastname': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        'username': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    });

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private barService: ZcBarService,
        private loadingService: ZcLoadingService) {
    }

    ngOnInit() { }

    onSubmit() {
        this.loadingService.show();
        this.userService.create({
            id: null,
            firstname: this.form.controls.firstname.value,
            lastname: this.form.controls.lastname.value,
            username: this.form.controls.username.value,
            password: this.form.controls.password.value
        })
            .subscribe(
            data => {
                this.barService.success('successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.barService.error(error);
                this.loadingService.hide();
            });
    }
}
