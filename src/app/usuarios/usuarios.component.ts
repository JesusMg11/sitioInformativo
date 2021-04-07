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
  nivel:any;
  nuevoUsuario = {nombre:'', apellidos:'', usuario:'', rol:'', contra:''};
  roles = [
    {rol: 'A', nombreRol: 'Administrador'},
    {rol: 'E', nombreRol: 'Editor'}
];

  agregar(){
    if(this.nuevoUsuario.nombre != '' && this.nuevoUsuario.apellidos != '' && this.nuevoUsuario.usuario != '' && this.nuevoUsuario.rol != '' && this.nuevoUsuario.contra != ''){

      this.datos.agregarUsuario(this.nuevoUsuario).subscribe(resp => {
        if(resp['result']=='ok'){
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
        }else{
          swal.fire({
            icon: 'error',
            title: '¡Ups!',
            text: 'El usuario no se ha podido guardar',
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
        timer:2000
      })
    }

  }

  obtenerUsuarios(){
      this.datos.obtenerUsuarios().subscribe(res=>{
      this.usuario = res;
    }, error => {
      swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'No hay usuarios aún',
        timer:2000
      })
    })
  }

  constructor(private router:Router, private datos: DatosService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.nivel = this.datos.getCuenta().rol;
  }

}
