import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";

const URL:string = "http://localhost/Sitio_Informativo/SitioInformativo/src/servicios/";

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient, private galleta:CookieService) { }

  private usuarioActivo = {id:"", nombre:"", apellidos:"", usuario:"", rol:""};

  login(u, p){
    let Params = new HttpParams();
    Params = Params.append('usuario', u);
    Params = Params.append('pass', p);
    return this.http.get(URL + "login.php",{params:Params});
  }

  agregarUsuario(usuario){
    let formData = new FormData();
    formData.append('nombre', usuario.nombre);
    formData.append('apellidos', usuario.apellidos);
    formData.append('usuario', usuario.usuario);
    formData.append('rol', usuario.rol);
    formData.append('contra', usuario.contra);

    return this.http.post(URL + "usuarios.php", formData);
  }

  agregarMensaje(mensaje){
    let formData = new FormData();
    formData.append('nombre', mensaje.nombre);
    formData.append('correo', mensaje.correo);
    formData.append('mensaje', mensaje.mensaje);

    return this.http.post(URL + "mensajes.php", formData);
  }

  setCuenta(id, nombre, apellidos, usuario, rol){
    this.usuarioActivo.id = id;
    this.usuarioActivo.nombre = nombre;
    this.usuarioActivo.apellidos = apellidos;
    this.usuarioActivo.usuario = usuario;
    this.usuarioActivo.rol = rol;

    this.galleta.set('id',id);
    this.galleta.set('nombre',nombre);
    this.galleta.set('apellidos',apellidos);
    this.galleta.set('usuario',usuario);
    this.galleta.set('rol',rol);
  }

  getCuenta(){
    this.usuarioActivo.id = this.galleta.get('id');
    this.usuarioActivo.nombre = this.galleta.get('nombre');
    this.usuarioActivo.apellidos = this.galleta.get('apellidos');
    this.usuarioActivo.usuario = this.galleta.get('usuario');
    this.usuarioActivo.rol = this.galleta.get('rol');
    return this.usuarioActivo;
  }

  obtenerUsuarios(){
    let Params = new HttpParams();
    Params = Params.append('id', "0");
    return this.http.get(URL + 'usuarios.php', {params: Params});
  }

  obtenerMensajes(){
    let Params = new HttpParams();
    Params = Params.append('id', "0");
    return this.http.get(URL + 'mensajes.php', {params: Params});
  }
}
