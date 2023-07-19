import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Grabsis_FrontEnd';
  constructor(){
    window.addEventListener("close", () => localStorage.removeItem('empleadoID'));
   // window.addEventListener("beforeunload", () => localStorage.removeItem('empleadoROL'));
    window.addEventListener("close", () => localStorage.removeItem('empleadoROL'));
  }
  


}
