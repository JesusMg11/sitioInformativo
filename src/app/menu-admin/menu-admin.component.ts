import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatosService } from '../datos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  //RUTAS DEL MENÚ
  usuarios(){
    this.router.navigate(['/usuarios']);
  }
  propuestas(){
    this.router.navigate(['/propuestasAd']);
  }
  mensajes(){
    this.router.navigate(['/mensajes']);
  }

  //log out
  salir(){
    this.datos.setCuenta("","","","","");
    this.router.navigate(["/inicioSesion"]);
    swal.fire({
      imageUrl: "../../assets/imagenes/waving-hand.png",
      imageWidth: 130,
      title: 'Sesión Finalizada',
      text: '¡Nos vemos!',
      showConfirmButton: false,
      timer: 3000
    })
  }

  constructor(private router:Router, private datos: DatosService) { }

  ngOnInit(): void {
  }

}
