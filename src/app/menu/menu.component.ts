import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //RUTAS DEL MENÚ
  inicio(){
    this.router.navigate(['/inicio']);
  }
  informacion(){
    this.router.navigate(['/quien-soy']);
  }
  propuestas(){
    this.router.navigate(['/propuestas']);
  }
  contacto(){
    this.router.navigate(['/contacto']);
  }
  ingresar(){
    this.router.navigate(['/inicioSesion']);
  }

  constructor(private router:Router, private datos: DatosService) { }

  ngOnInit(): void {
  }

}
