import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { ViewChild } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.css']
})
export class PropuestasComponent implements OnInit {

  propuesta: any;

  obtenerPropuestas() {
    this.datos.obtenerPropuestas().subscribe(res => {
      this.propuesta = res;
    }, error => {
      swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'No hay propuestas aún',
        timer: 2000
      })
    })
  }

  constructor(private router: Router, private datos: DatosService) { }

  ngOnInit(): void {
    this.obtenerPropuestas();
  }

}
