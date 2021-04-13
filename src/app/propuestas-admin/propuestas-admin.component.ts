import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatosService } from '../datos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-propuestas-admin',
  templateUrl: './propuestas-admin.component.html',
  styleUrls: ['./propuestas-admin.component.css']
})
export class PropuestasAdminComponent implements OnInit {
  nivel: any;
  propuesta: any;
  nuevaPropuesta = {titulo:"", propuesta:"", imagen: Blob};

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

  datosEditar(item){

  }

  datosEliminar(item){

  }

  agregar(){
    console.log(this.nuevaPropuesta);
    if (this.nuevaPropuesta.titulo != '' && this.nuevaPropuesta.propuesta != '') {
      this.datos.agregarPropuesta(this.nuevaPropuesta).subscribe(resp => {
        console.log(resp);
        if (resp['result'] == 'ok') {
          this.nuevaPropuesta.titulo = '';
          this.nuevaPropuesta.propuesta = '';
          this.nuevaPropuesta.imagen = null;
          this.obtenerPropuestas();
          swal.fire({
            icon: 'success',
            title: '¡Hecho!',
            text: 'Se ha guardado con éxito la propuesta',
            timer: 2000
          })
        } else {
          swal.fire({
            icon: 'error',
            title: '¡Ups!',
            text: 'La propuesta no se ha podido guardar',
            timer: 2000
          })
        }
      }, error => {
        console.log(error);
      });

    } else {
      swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'No puede haber campos vacíos',
        timer: 2000
      })
    }
  }

  constructor(private router: Router, private datos: DatosService) { }

  ngOnInit(): void {
    this.nivel = this.datos.getCuenta().rol;
    this.obtenerPropuestas();
  }

}
