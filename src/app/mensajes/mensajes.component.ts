import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatosService } from '../datos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  mensaje: any;

  llenarMensajes(){
    this.datos.obtenerMensajes().subscribe(resp => {
      this.mensaje = resp;
    }, error => {
      console.log(error);
    })
  }

  constructor(private router:Router, private datos: DatosService) { }

  ngOnInit(): void {
    this.llenarMensajes();
  }

}
