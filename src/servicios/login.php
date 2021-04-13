<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Allow, Access-Control-Allow-Origin");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD");
header("Allow: GET, POST, PUT, DELETE, OPTIONS, HEAD");
require_once 'database.php';
require_once 'jwt.php';
if($_SERVER['REQUEST_METHOD']=='GET'){
if(isset($_GET['usuario']) && isset($_GET['pass'])){
$usuario = $_GET['usuario'];
$contra = $_GET['pass'];
$users = new DataBase('usuarios');
$resultado = $users->read( array('usuario_usu'=>$usuario));
//echo json_encode($resultado['nombre_alu']);
if($resultado){
    if(password_verify($contra, $resultado['contra_usu'])){ // if de comprobar contraseñas
        $token = JWT::create(array('usuario'=>$usuario,'nivel'=>$resultado['rol_usu']),Config::SECRET_JWT);
        $respuesta = array('auth' => 'si', 'id' => $resultado['id_usu'], 'usuario' => $usuario, 'nombre' => $resultado['nombre_usu'], 'apellidos' => $resultado['apellidos_usu'],'rol' => $resultado['rol_usu'], 'token' => $token);
    }else{
        $respuesta = array('auth' => 'no', 'usuario' => $usuario, 'resultado' => $resultado);
    }
    
}else{
    $respuesta = array('auth' => 'no', 'usuario' => $usuario);
}
echo json_encode($respuesta);
}else{
    $respuesta = array('auth' => 'no');
    echo json_encode($respuesta);
}
}