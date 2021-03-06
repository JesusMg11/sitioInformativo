<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Authorization, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Allow, Access-Control-Allow-Origin");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD");
header("Allow: GET, POST, PUT, DELETE, OPTIONS, HEAD");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Credentials: true');
require_once 'database.php';
$tabla = new DataBase('usuarios');
switch($_SERVER['REQUEST_METHOD']){
    case "GET":
        if(isset($_GET['user'])){
            $where = array('id_usu'=>$_GET['user']);
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
    case "PUT":
        //Actualizar datos del usuario
        if(isset($_GET['id_us']) && isset($_GET['nombre']) && isset($_GET['apellidos']) && isset($_GET['rol']) && isset($_GET['usuario'])){
            $datos = array(
                'id_usu' => $_GET['id_us'],
                'nombre_usu'=> strtoupper ( $_GET['nombre']),
                'apellidos_usu'=> strtoupper ( $_GET['apellidos']),
                'usuario_usu'=> ($_GET['usuario']),
                'rol_usu'=>$_GET['rol'],
            );
            $where = array('id_usu'=>$_GET['id_us']);
            $reg = $tabla->update($datos,$where);
            $res = array("result"=>"ok","msg"=>"Se actualiz?? el usuario", "num"=>$reg);
        }else
        //Actualizar contrase??a del usuario
        if(isset($_GET['id_us']) && isset($_GET['contra']) ){
            $pass_hash = password_hash($_GET['contra'], PASSWORD_DEFAULT);
            $datos = array(
                'id_usu' => $_GET['id_us'],
                'contra_usu'=>$pass_hash
            );
            $where = array('id_usu'=>$_GET['id_us']);
            $reg = $tabla->update($datos,$where);
            $res = array("result"=>"ok","msg"=>"Se actualiz?? la contrase??a", "num"=>$reg);
        }
        
        else{
            $res = array("result"=>"no","msg"=>"Faltan datos");
        }
        header("HTTP/1.1 200 OK");
        echo json_encode($res);
    break;
    case "DELETE":
        if(isset($_GET['id_us'])){
            $where = array('id_usu'=>$_GET['id_us']);
            $reg = $tabla->delete($where);
            $res = array("result"=>"ok","msg"=>"Se elimino el usuario", "num"=>$reg);
        }else{
            $res = array("result"=>"no","msg"=>"Faltan datos");
        }
        echo json_encode($res);
    break;
    default:
        header("HTTP/1.1 401 Bad Request");
}    