<?php
require('dbUtil.php');

$con = new ConectorBD();

if ($con->initConexion('schedule_db')=='OK') {

    echo "Se realizo la conexión";

   $data[0]['nombre'] = "'Fabrizio'";
   $data[0]['password'] = "'".password_hash("987654321", PASSWORD_DEFAULT)."'";
   $data[0]['birthdate'] = "'2000-10-09'";
   $data[0]['email'] = "'fabrizio@mail.com'";

   $data[1]['nombre'] = "'Augusto'";
   $data[1]['password'] = "'".password_hash("357951", PASSWORD_DEFAULT)."'";
   $data[1]['birthdate'] = "'2014-05-19'";
   $data[1]['email'] = "'augusto@mail.com'";

   $data[2]['nombre'] = "'Eduardo'";
   $data[2]['password'] = "'".password_hash("123456789", PASSWORD_DEFAULT)."'";
   $data[2]['birthdate'] = "'1996-10-16'";
   $data[2]['email'] = "'eduardo@mail.com'";

   foreach ($data as $key => $values) {
     if ($con->insertData('user', $values)) {
       echo "Se inserto los datos del usuario correctamente \n";
     }else echo "Se ha producido un error en la inserción";
   }

  $con->cerrarConexion();

}else {
  echo "Se presentó un error en la conexión";
}


 ?>
