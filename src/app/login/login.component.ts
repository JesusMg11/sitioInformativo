import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatosService } from '../datos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  datosUsuario ={usuario : '', password:''};
  usuarioActivo = {id:'', nombre: '', apellidos:'', usuario:'', rol:''}

  login(){
    if(this.datosUsuario.usuario != '' || this.datosUsuario.usuario!= ''){
      this.datos.login(this.datosUsuario.usuario, this.datosUsuario.password).subscribe(resp => {
         if(resp['auth']=='si'){
          this.datos.setCuenta(resp['id'], resp['nombre'], resp['apellidos'], resp['usuario'], resp['rol'], resp['token']);
          swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: 'Inicio de sesión correcto.',
            showConfirmButton: false,
            timer: 3000
          })
          this.router.navigate(['/inicioAd']);
        }else{
          swal.fire({
            icon: 'error',
            title: '¡Ups!',
            text: 'Las credenciales no coinciden.',
            showConfirmButton: false,
            timer:2000
          })
        }
      },error=>{
        swal.fire({
          icon: 'error',
          title: '¡Ups!',
          text: 'ERROR',
          showConfirmButton: false,
          timer:2000
        })
      })
  
    }else{
      swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'No debe haber campos vacíos',
        showConfirmButton: false,
        timer:2000
      })
    }
  }

  constructor(private router:Router, private datos: DatosService) { }

  ngOnInit(): void {
  }

}
