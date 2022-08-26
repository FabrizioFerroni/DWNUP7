<?php

require('dbUtil.php');

session_start();

if (isset($_SESSION['username'])) {
  $con = new ConectorBD();

  if ($con->initConexion('schedule_db')=='OK') {

    $resultado = $con->consultar(['user'], ['id'], "WHERE email ='".$_SESSION['username']."'");
    $fila = $resultado->fetch_assoc();
    $userId = $fila['id'];

     $event['title'] = "'".$_POST['titulo']."'";
     $event['init_date'] = "'".$_POST['start_date']."'";
     $event['init_hour'] = "'".$_POST['start_hour']."'";
     $event['end_date'] = "'".$_POST['end_date']."'";
     $event['end_hour'] = "'".$_POST['end_hour']."'";
     $event['complete_day'] = "'".$_POST['allDay']."'";
     $event['user_id'] = $userId;

     if ($con->insertData('event', $event)) {
       $response['msg'] = "OK";
       $response['msg2'] = "Se registro un nuevo evento con éxito";
     } else {
        $response['msg'] = "Se ha producido un error en la inserción";
     }

    echo json_encode($response);

    $con->cerrarConexion();

  }else {
    echo "Se presentó un error en la conexión";
  }

}else {
  $response['msg'] = "No se ha iniciado una sesión";
}



 ?>
