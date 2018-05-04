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
  host: {'class': 'pl-flex'}
})

export class PlRegistrationPanelComponent
{
  constructor(private registrationService: PlRegistrationPanelService){}

  submitted = false;
  passwordMatch = true;
  message = "";
  formContent = new RegistrationForm("", "", "");
  emailFormControl = new FormControl('', [Validators.required,
    Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required,
    Validators.minLength(6)]);

  getPasswordErrorMessage(){
    return this.passwordFormControl.hasError('required')? 'Keine Passwort eingegeben':
      this.passwordFormControl.hasError('minlength') ? 'Das Passwort muss aus mind. 6 Zeichen bestehen':
        '';
  }

  getEmailErrorMessage() {
    return this.emailFormControl.hasError('required')? 'Keine E-Mail Adresse eingegeben':
      this.emailFormControl.hasError('email') ? 'Keine valide E-Mail Adresse':
        '';
  }

  onSubmit(form: RegistrationForm) {

    if(this.formContent.password !== this.formContent.password2){
      this.passwordMatch = false;
    } else {

      if(this.emailFormControl.valid && this.passwordFormControl.valid){

        this.submitted = true;

        this.registrationService.register(form).subscribe(
          data => {
            this.message = "Der Benutzer wurde registriert";
            return true;
          },
          error1 => {
            this.message = "Der Benutzer konnte nicht erstellt werden";
            console.error("can not create user")
          }
        );
      }
    }
  }
}
