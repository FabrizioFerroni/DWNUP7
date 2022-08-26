<?php

require('dbUtil.php');

session_start();

if (isset($_SESSION['username'])) {
  $con = new ConectorBD();

  if ($con->initConexion('schedule_db')=='OK') {

    $resultado = $con->consultar(['user'], ['id'], "WHERE email ='".$_SESSION['username']."'");
    $fila = $resultado->fetch_assoc();
    $userId = $fila['id'];
    $eventId = $_POST['id'];
    $condition = "id = '".$eventId."' AND user_id = '".$userId."'";

    $data['init_date'] = "'".$_POST['start_date']."'";
    $data['init_hour'] = "'".$_POST['start_hour']."'";
    $data['end_date'] = "'".$_POST['end_date']."'";
    $data['end_hour'] = "'".$_POST['end_hour']."'";


     if ($con->actualizarRegistro('event', $data, $condition)) {
       $response['msg'] = "OK";
       $response['msg2'] = "Se ha actualizado con éxito";
     } else {
        $response['msg'] = "Se ha producido un error en la actualizacion";
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
