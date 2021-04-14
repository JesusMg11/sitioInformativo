import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";

const URL:string = "http://localhost/Sitio_Informativo/SitioInformativo/src/servicios/";

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient, private galleta:CookieService) { }

  private usuarioActivo = {id:"", nombre:"", apellidos:"", usuario:"", rol:"", token:""};

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

  setCuenta(id, nombre, apellidos, usuario, rol, token){
    this.usuarioActivo.id = id;
    this.usuarioActivo.nombre = nombre;
    this.usuarioActivo.apellidos = apellidos;
    this.usuarioActivo.usuario = usuario;
    this.usuarioActivo.rol = rol;
    this.usuarioActivo.token = token;

    this.galleta.set('id',id);
    this.galleta.set('nombre',nombre);
    this.galleta.set('apellidos',apellidos);
    this.galleta.set('usuario',usuario);
    this.galleta.set('rol',rol);
    this.galleta.set('token',token);
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

  obtenerUsuarioEspecifico(id){
    let Params = new HttpParams();
    Params = Params.append('user', id);
    return this.http.get(URL + 'usuarios.php', {params: Params});
  }

  obtenerMensajes(){
    let Params = new HttpParams();
    Params = Params.append('id', "0");
    return this.http.get(URL + 'mensajes.php', {params: Params});
  }

  actualizarUsuario(usuario){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.usuarioActivo.token);

    let Params = new HttpParams();
    Params = Params.append('id_us', usuario.id_usu);
    Params = Params.append('nombre', usuario.nombre_usu);
    Params = Params.append('apellidos', usuario.apellidos_usu);
    Params = Params.append('rol', usuario.rol_usu);
    Params = Params.append('usuario', usuario.usuario_usu);
    return this.http.put(URL + "usuarios.php",null, {headers: Headers, params: Params});
  }

  actualizarContra(usuario){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.usuarioActivo.token);

    let Params = new HttpParams();
    Params = Params.append('id_us', usuario.id_usu);
    Params = Params.append('contra', usuario.contra_usu);
    return this.http.put(URL + "usuarios.php",null, {headers: Headers, params: Params});
  }

  eliminarUsuario(id){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.usuarioActivo.token);

    let Params = new HttpParams();
    Params = Params.append('id_us',id);

    return this.http.delete(URL + "usuarios.php", {headers: Headers, params: Params});
  }

  obtenerPropuestas(){
    let Params = new HttpParams();
    Params = Params.append('id', "0");
    return this.http.get(URL + 'propuestas.php', {params: Params});
  }

  agregarPropuesta(propuesta, img){
    let formData = new FormData();
    formData.append('titulo', propuesta.titulo);
    formData.append('propuesta', propuesta.propuesta);
    formData.append('imagen', img);

    return this.http.post(URL + "propuestas.php", formData);
  }

  actualizarPropuesta(propuesta, img){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.usuarioActivo.token);

    let Params = new HttpParams();
    Params = Params.append('id_pro', propuesta.id);
    Params = Params.append('titulo', propuesta.titulo);
    Params = Params.append('propuesta', propuesta.propuesta);
    return this.http.put(URL + "propuestas.php",null, {headers: Headers, params: Params,});
  }

  actualizarImagen(propuesta, img){
    let formData = new FormData();
    formData.append('imagenActu', img);
    formData.append('id_pro', propuesta.id);
    formData.append('titulo', propuesta.titulo);
    formData.append('propuesta', propuesta.propuesta);
    return this.http.post(URL + "propuestas.php", formData);
  }

  eliminarPropuesta(id){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.usuarioActivo.token);
    
    let Params = new HttpParams();
    Params = Params.append('id_pro',id);

    return this.http.delete(URL + "propuestas.php", {headers: Headers, params: Params});
  }
}
