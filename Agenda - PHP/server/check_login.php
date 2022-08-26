<?php

require('dbUtil.php');

$con = new ConectorBD();

if ($con->initConexion('schedule_db')=='OK') {

  $resultado_consulta = $con->consultar(['user'], ['email', 'password'], 'WHERE email="'.$_POST['username'].'"');

  if ($resultado_consulta->num_rows != 0) {
    $fila = $resultado_consulta->fetch_assoc();
    if (password_verify($_POST['password'], $fila['password'])) {
      $response['msg'] = 'OK';
      session_start();
      $_SESSION['username']=$fila['email'];
    }else {
      $response['msg'] = 'Contraseña incorrecta';
      $response['acceso'] = 'rechazado';
    }
  }else{
    $response['msg'] = 'Email incorrecto';
    $response['acceso'] = 'rechazado';
  }

}

echo json_encode($response);

$con->cerrarConexion();


 ?>
