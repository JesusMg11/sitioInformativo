import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatosService } from '../datos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  nuevoMensaje = {nombre:'', correo:'', mensaje:''};

  agregar(){
    if(this.nuevoMensaje.nombre != '' && this.nuevoMensaje.correo != '' && this.nuevoMensaje.mensaje){

      this.datos.agregarMensaje(this.nuevoMensaje).subscribe(resp => {
        if(resp['result']=='ok'){
          this.nuevoMensaje.nombre = '';
          this.nuevoMensaje.correo = '';
          this.nuevoMensaje.mensaje = '';
          swal.fire({
            icon: 'success',
            title: '¡Hecho!',
            text: 'Su mensaje se ha enviado.',
            showConfirmButton: false,
            timer: 3000
          })
        }else{
          swal.fire({
            icon: 'error',
            title: '¡Ups!',
            text: 'No se ha podido enviar el mensaje.',
            showConfirmButton: false,
            timer:2000
          })
        }
      }, error => {
        console.log(error);
      });

    }else{
      swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'No puede haber campos vacíos',
        showConfirmButton: false,
        timer:2000
      })
    }

  }

  constructor(private router:Router, private datos: DatosService) { }

  ngOnInit(): void {
  }

}
