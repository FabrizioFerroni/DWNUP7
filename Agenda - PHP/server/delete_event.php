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
    if ($con->eliminarRegistro('event', $condition)) {
      $response['msg'] = "OK";
      $response['msg2'] = "Se ha eliminado el evento exitosamente";
    } else {
      $response['msg'] = "Se ha producido un error en la eliminacion";
    }

    echo json_encode($response);

    $con->cerrarConexion();

  }else {
    echo "Se presentó un error en la conexión";
  }

} else {
  $response['msg'] = "No se ha iniciado una sesión";
}

 ?>
