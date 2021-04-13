<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Authorization, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Allow, Access-Control-Allow-Origin");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD");
header("Allow: GET, POST, PUT, DELETE, OPTIONS, HEAD");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Credentials: true');
require_once 'database.php';
$tabla = new DataBase('propuestas');
switch($_SERVER['REQUEST_METHOD']){
    case "GET":
        if(isset($_GET['id_pro'])){
            $where = array('id_pro'=>$_GET['id_pro']);
            $res = $tabla->ReadAll($where);
        }else{
            $res = $tabla->ReadAll();
        }
        header("HTTP/1.1 200 OK");
        echo json_encode($res);
    break;
    case "POST":
        if(isset($_POST['titulo']) && isset($_POST['propuesta']) && isset($_POST['imagen'])){
            $imagen = base64_encode(file_get_contents($_POST['imagen']['tmp_name']));
            echo $_POST['imagen'];
            if(empty($imagen)){
                $res = array("result"=>"no","msg"=>"Falta la imagen");
            }else{
                $datos = array(
                    'id_pro' => 0,
                    'propuesta_pro'=> $_POST['nombre'],
                    'imagen_pro'=> $imagen,
                    'titulo_pro'=> $_POST['usuario'],
                    );
                   try{
                      $reg = $tabla->create($datos);
                      $res = array("result"=>"ok","msg"=>"Se guardo la imagen", "id"=>$reg);
                   }catch(PDOException $e){
                    $res = array("result"=>"no","msg"=>$e->getMessage());
                   }
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
            $res = array("result"=>"ok","msg"=>"Se actualizó el usuario", "num"=>$reg);
        }else
        //Actualizar contraseña del usuario
        if(isset($_GET['id_us']) && isset($_GET['contra']) ){
            $pass_hash = password_hash($_GET['contra'], PASSWORD_DEFAULT);
            $datos = array(
                'id_usu' => $_GET['id_us'],
                'contra_usu'=>$pass_hash
            );
            $where = array('id_usu'=>$_GET['id_us']);
            $reg = $tabla->update($datos,$where);
            $res = array("result"=>"ok","msg"=>"Se actualizó la contraseña", "num"=>$reg);
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