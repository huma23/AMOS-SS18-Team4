import {Component, OnInit} from "@angular/core";
import {User} from "../../model/user";
import {PlRegistrationPanelService} from "./registrationpanel.service";
export {PlRegistrationPanelService} from "./registrationpanel.service";
import {AbstractControl, FormControl, ValidatorFn, Validators} from "@angular/forms";
import {RegistrationForm} from "../../model/registrationForm";

@Component({
  selector: 'pl-registrationpanel',
  templateUrl: './registrationpanel.component.html',
  styleUrls: ['./registrationpanel.component.css'],
})

export class PlRegistrationPanelComponent
{
  constructor(private registrationService: PlRegistrationPanelService){}

  formContent = new RegistrationForm("", "", "");

  emailFormControl = new FormControl('', [Validators.required,
    Validators.email]);


  getEmailErrorMessage() {
    return this.emailFormControl.hasError('required')? 'Keine E-Mail Adresse eingegeben':
      this.emailFormControl.hasError('email') ? 'Keine valide E-Mail Adresse':
        '';
  }

  onSubmit(form: RegistrationForm) {

      this.registrationService.register(form).subscribe(
      data => {
        return true;
      },
      error1 => {
        console.error("can not create user")
      }
    );

  }
}
