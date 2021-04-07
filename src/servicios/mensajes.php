<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Allow, Access-Control-Allow-Origin");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD");
header("Allow: GET, POST, PUT, DELETE, OPTIONS, HEAD");
require_once 'database.php';
$tabla = new DataBase('mensajes');
switch($_SERVER['REQUEST_METHOD']){
    case "GET":
        if(isset($_GET['user'])){
            //$where = array('usuario_usu'=>$_GET['user']);
           // $res = $tabla->ReadAll($where);
        }else{
            $res = $tabla->ReadAll();
        }
        header("HTTP/1.1 200 OK");
        echo json_encode($res);
    break;
    case "POST":
        //Añadir mensaje a la BD
        if(isset($_POST['nombre']) && isset($_POST['correo']) && isset($_POST['mensaje'])){
            $datos = array(
                'id_men' => 0,
                'nombre_men'=> strtoupper ($_POST['nombre']),
                'correo_men'=> $_POST['correo'],
                'mensaje_men'=>$_POST['mensaje'],
            );
            try{
                $reg = $tabla->create($datos);
                $res = array("result"=>"ok","msg"=>"Se guardo el mensaje", "id"=>$reg);
            }catch(PDOException $e){
                $res = array("result"=>"no","msg"=>$e->getMessage());
            }

            //Excepcion de falta de mensajes
        }else{
            $res = array("result"=>"no","msg"=>"Faltan datos");
        }
        header("HTTP/1.1 200 OK");
        echo json_encode($res);
    break;
}    