import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,  RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginForm: FormGroup; //Gruppe für das Form-Tag in der HTML
  showErrorMessage?: string; //Globale Deklarierung für mögliche Error-Message

  //constructor wird beim initialen Aufruf der Component ausgeführt
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    //initialisieren der Formgroup
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  //On-Click Funktion um sich einzuloggen
  //Value der LoginForm entspricht dem Member-Objekt
  //Response und error wird hier gehandelt
  //subscribe ist durchgestrichen, weil diese Art von Errorhandling veraltet ist
  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe(
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
