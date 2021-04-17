<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Authorization, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Allow, Access-Control-Allow-Origin");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD");
header("Allow: GET, POST, PUT, DELETE, OPTIONS, HEAD");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Credentials: true');
header('Content-Type: multipart/form-data');
require_once 'database.php';
//error_reporting(0);
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
        if(isset($_POST['titulo']) && isset($_POST['propuesta']) && isset($_FILES['imagen'])){
            $imagen = base64_encode(file_get_contents($_FILES['imagen']['tmp_name']));
            $tipo = $_FILES['imagen']['type'];
            if(empty($imagen)){
                $res = array("result"=>"no","msg"=>"Falta la imagen");
            }else{
                $datos = array(
                    'id_pro' => 0,
                    'propuesta_pro'=> $_POST['propuesta'],
                    'imagen_pro'=> $imagen,
                    'titulo_pro'=> $_POST['titulo'],
                    'tipo_img_pro' => $tipo,
                    'fecha_pro' => date("Y-m-d")
                    );
                   try{
                      $reg = $tabla->create($datos);
                      $res = array("result"=>"ok","msg"=>"Se guardo la imagen", "id"=>$reg);
                   }catch(PDOException $e){
                    $res = array("result"=>"no","msg"=>$e->getMessage());
                   }
            }
        }else 
        //Actualizar imagen
        if(isset($_FILES['imagenActu']) && isset($_POST['id_pro']) && isset($_POST['titulo']) && isset($_POST['propuesta'])){
            $imagen = base64_encode(file_get_contents($_FILES['imagenActu']['tmp_name']));
            $tipo = $_FILES['imagenActu']['type'];
            if(empty($imagen)){
                $res = array("result"=>"no","msg"=>"Falta la imagen");
            }else{
                $datos = array(
                    'propuesta_pro'=> $_POST['propuesta'],
                    'titulo_pro'=> $_POST['titulo'],
                    'imagen_pro'=> $imagen,
                    'tipo_img_pro' => $tipo
                    );
                   try{
                    $where = array('id_pro'=>$_POST['id_pro']);
                    $reg = $tabla->update($datos,$where);
                    $res = array("result"=>"ok","msg"=>"Se actualizó la propuesta con img", "num"=>$reg);
                   }catch(PDOException $e){
                    $res = array("result"=>"no","msg"=>$e->getMessage());
                   }
            }
        }
        else{
            $res = array("result"=>"no","msg"=>"Faltan datos");
        }
        header("HTTP/1.1 200 OK");
        echo json_encode($res);
    break;
    case "PUT":
        //Actualizar datos del la propuesta
        if(isset($_GET['id_pro']) && isset($_GET['titulo']) && isset($_GET['propuesta'])){
                $datos = array(
                    'titulo_pro'=>  $_GET['titulo'],
                    'propuesta_pro'=>  $_GET['propuesta']
                );
                $where = array('id_pro'=>$_GET['id_pro']);
                $reg = $tabla->update($datos,$where);
                $res = array("result"=>"ok","msg"=>"Se actualizó la propuesta sin img", "num"=>$reg);
        }
        else{
            $res = array("result"=>"no","msg"=>"Faltan datos");
        }
        header("HTTP/1.1 200 OK");
        echo json_encode($res);
    break;
    case "DELETE":
        if(isset($_GET['id_pro'])){
            $where = array('id_pro'=>$_GET['id_pro']);
            $reg = $tabla->delete($where);
            $res = array("result"=>"ok","msg"=>"Se elimino la propuesta", "num"=>$reg);
        }else{
            $res = array("result"=>"no","msg"=>"Faltan datos");
        }
        echo json_encode($res);
    break;
    default:
        header("HTTP/1.1 401 Bad Request");
}    