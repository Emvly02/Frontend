import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,  RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  showErrorMessage: string | undefined;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.registerForm = this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  //On-Click Funktion um sich einzuloggen
  //Value der LoginForm entspricht dem User-Objekt
  //Response und error wird hier gehandelt
  //subscribe ist durchgestrichen, weil diese Art von Errorhandling veraltet ist
  onSubmit() {
    this.userService.register(this.registerForm.value).subscribe(
      //Wenn response ohne Fehler da ist
      (response) => {
        if(response != null) {
          if (response.id) localStorage.setItem("userId", response.id.toLocaleString());
          this.router.navigate(["/dashboard"])
        }
      },
      //Wenn Fehler auftaucht
      (error) => {
          this.showErrorMessage = "Etwas ist schiefgelaufen: Status " + error.status
      }
    )
  }
}