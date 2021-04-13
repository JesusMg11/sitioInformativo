import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatosService } from '../datos.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario: any;
  nivel: any;
  id_eliminar: any;
  nuevoUsuario = { nombre: '', apellidos: '', usuario: '', rol: '', contra: '' };
  usuarioTmp = { id_usu: '', nombre_usu: '', apellidos_usu: '', usuario_usu: '', rol_usu: '', contra_usu: ''};
  usuarioContra = { id_usu: '', contra_usu: ''};
  roles = [
    { rol: 'A', nombreRol: 'Administrador' },
    { rol: 'E', nombreRol: 'Editor' }
  ];

  agregar() {
    if (this.nuevoUsuario.nombre != '' && this.nuevoUsuario.apellidos != '' && this.nuevoUsuario.usuario != '' && this.nuevoUsuario.rol != '' && this.nuevoUsuario.contra != '') {

      this.datos.agregarUsuario(this.nuevoUsuario).subscribe(resp => {
        if (resp['result'] == 'ok') {
          this.nuevoUsuario.nombre = '';
          this.nuevoUsuario.apellidos = '';
          this.nuevoUsuario.usuario = '';
          this.nuevoUsuario.rol = '';
          this.nuevoUsuario.contra = '';
          this.obtenerUsuarios();
          swal.fire({
            icon: 'success',
            title: '¡Hecho!',
            text: 'Se ha guardado con éxito el usuario',
            timer: 2000
          })
        } else {
          swal.fire({
            icon: 'error',
            title: '¡Ups!',
            text: 'El usuario no se ha podido guardar',
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

  editar() {
    this.datos.actualizarUsuario(this.usuarioTmp).subscribe(resp => {
      if(resp['result']=='ok'){
        this.obtenerUsuarios();
        swal.fire({
          icon: 'success',
          title: '¡Hecho!',
          text: 'Se ha actualizado con éxito el usuario',
          timer: 2000
        })
      }else{
        swal.fire({
          icon: 'error',
          title: '¡Ups!',
          text: 'El usuario no se ha podido actualizar',
          timer: 2000
        })
      }
    }, error => {
      console.log(error);
    });
  }

  cambiarContra(){
    this.datos.actualizarContra(this.usuarioContra).subscribe(resp => {
      if(resp['result']=='ok'){
        this.obtenerUsuarios();
        this.usuarioContra.contra_usu ="";
        this.usuarioContra.id_usu ="";
        swal.fire({
          icon: 'success',
          title: '¡Hecho!',
          text: 'Se ha actualizado con éxito la contraseña',
          timer: 2000
        })
      }else{
        swal.fire({
          icon: 'error',
          title: '¡Ups!',
          text: 'La contraseña no se ha podido actualizar',
          timer: 2000
        })
      }
    }, error => {
      console.log(error);
    });
  }

  eliminar(){
    this.datos.eliminarUsuario(this.id_eliminar).subscribe(resp => {
      if(resp['result']=='ok'){
        this.obtenerUsuarios();
        swal.fire({
          icon: 'success',
          title: '¡Hecho!',
          text: 'Se ha eliminado con éxito el usuario',
          timer: 2000
        })
      }else{
        swal.fire({
          icon: 'error',
          title: '¡Ups!',
          text: 'El usuario no se ha podido eliminar',
          timer: 2000
        })
      }
    }, error => {
      console.log(error);
    });
  }

  datosEditar(usuario) {
    this.usuarioTmp = JSON.parse(JSON.stringify(usuario));
  }
  
  datosContra(id){
    this.usuarioContra.id_usu = id;
  }
  
  datosEliminar(id){
    this.id_eliminar = id;
  }

  obtenerUsuarios() {
    this.datos.obtenerUsuarios().subscribe(res => {
      this.usuario = res;
    }, error => {
      swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'No hay usuarios aún',
        timer: 2000
      })
    })
  }

  constructor(private router: Router, private datos: DatosService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.nivel = this.datos.getCuenta().rol;
  }

}
