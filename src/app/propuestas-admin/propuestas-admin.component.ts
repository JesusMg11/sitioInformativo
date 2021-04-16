import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import {
  Directive,
  ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-propuestas-admin',
  templateUrl: './propuestas-admin.component.html',
  styleUrls: ['./propuestas-admin.component.css']
})
export class PropuestasAdminComponent implements OnInit {
  nivel: any;
  propuesta: any;
  id_eliminar: any;
  nuevaPropuesta = {titulo:"", propuesta:""};
  propuestaTmp = {id:"", titulo:"", propuesta:""};
  selectedFile: File = null;
  selectedFileEdit: File = null;

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

  datosEditar(id, titulo, propuesta){
    this.propuestaTmp.id = id;
    this.propuestaTmp.titulo = titulo;
    this.propuestaTmp.propuesta = propuesta;
  }

  datosEliminar(id){
    this.id_eliminar = id;
  }

 // onFileChanged(files: FileList) {
  onFileChanged(event) {
    //this.selectedFile = files.item(0);
    this.selectedFile = event.target.files[0];
    //Limpia el input file
   // event.srcElement.value = "";
  }

  onFileChangedEdit(event) {
    this.selectedFileEdit = event.target.files[0];
  }

  agregar(){
    if (this.nuevaPropuesta.titulo != '' && this.nuevaPropuesta.propuesta != '') {
      this.datos.agregarPropuesta(this.nuevaPropuesta, this.selectedFile).subscribe(resp => {
        if (resp['result'] == 'ok') {
          this.nuevaPropuesta.titulo = '';
          this.nuevaPropuesta.propuesta = '';
          this.selectedFile = null;
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

  actualizar(){
    if (this.propuestaTmp.titulo != '' && this.propuestaTmp.propuesta != '') {
      if(this.selectedFileEdit != null){
        this.datos.actualizarImagen(this.propuestaTmp, this.selectedFileEdit).subscribe(resp => {
          if(resp['result']=='ok'){
            this.obtenerPropuestas();
            this.nuevaPropuesta.titulo = '';
            this.nuevaPropuesta.propuesta = '';
            this.selectedFile = null;
            swal.fire({
              icon: 'success',
              title: '¡Hecho!',
              text: 'Se ha actualizado con éxito la imagen',
              timer: 2000
            })
          }else{
            swal.fire({
              icon: 'error',
              title: '¡Ups!',
              text: 'La imagen no se ha podido actualizar',
              timer: 2000
            })
          }
        }, error => {
          console.log(error);
        });
      }else{
        this.datos.actualizarPropuesta(this.propuestaTmp, this.selectedFileEdit).subscribe(resp => {
          if(resp['result']=='ok'){
            this.obtenerPropuestas();
            this.nuevaPropuesta.titulo = '';
            this.nuevaPropuesta.propuesta = '';
            this.selectedFile = null;
            swal.fire({
              icon: 'success',
              title: '¡Hecho!',
              text: 'Se ha actualizado con éxito la propuesta',
              timer: 2000
            })
          }else{
            swal.fire({
              icon: 'error',
              title: '¡Ups!',
              text: 'La propuesta no se ha podido actualizar',
              timer: 2000
            })
          }
        }, error => {
          console.log(error);
        });
      }

    }else{
      swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'No puede haber campos vacíos',
        timer: 2000
      })
    }
    
  }

  eliminar(){
    this.datos.eliminarPropuesta(this.id_eliminar).subscribe(resp => {
      if(resp['result']=='ok'){
        this.obtenerPropuestas();
        swal.fire({
          icon: 'success',
          title: '¡Hecho!',
          text: 'Se ha eliminado con éxito la propuesta',
          timer: 2000
        })
      }else{
        swal.fire({
          icon: 'error',
          title: '¡Ups!',
          text: 'La propuesta no se ha podido eliminar',
          timer: 2000
        })
      }
    }, error => {
      console.log(error);
    });
  }

  constructor(private router: Router, private datos: DatosService) {
    
   }

  ngOnInit(): void {
    this.nivel = this.datos.getCuenta().rol;
    this.obtenerPropuestas();
  }

}
