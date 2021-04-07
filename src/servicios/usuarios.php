<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Allow, Access-Control-Allow-Origin");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD");
header("Allow: GET, POST, PUT, DELETE, OPTIONS, HEAD");
require_once 'database.php';
$tabla = new DataBase('usuarios');
switch($_SERVER['REQUEST_METHOD']){
    case "GET":
        if(isset($_GET['user'])){
            $where = array('usuario_usu'=>$_GET['user']);
            $res = $tabla->ReadAll($where);
        }else{
            $res = $tabla->ReadAll();
        }
        header("HTTP/1.1 200 OK");
        echo json_encode($res);
    break;
    case "POST":
        if(isset($_POST['nombre']) && isset($_POST['apellidos']) && isset($_POST['rol']) && isset($_POST['usuario']) && isset($_POST['contra'])){
            $pass_hash = password_hash($_POST['contra'], PASSWORD_DEFAULT);
            $datos = array(
                'id_usu' => 0,
                'nombre_usu'=> strtoupper ( $_POST['nombre']),
                'apellidos_usu'=> strtoupper ( $_POST['apellidos']),
                'usuario_usu'=> ($_POST['usuario']),
                'contra_usu'=>$pass_hash,
                'rol_usu'=>$_POST['rol'],
            );
            try{
                $reg = $tabla->create($datos);
                $res = array("result"=>"ok","msg"=>"Se guardo el usuario", "id"=>$reg);
            }catch(PDOException $e){
                $res = array("result"=>"no","msg"=>$e->getMessage());
            }
        }else{
            $res = array("result"=>"no","msg"=>"Faltan datos");
        }
        header("HTTP/1.1 200 OK");
        echo json_encode($res);
    break;
}    