<?php
session_start();
error_reporting(0);
if(isset($_SESSION['username'])){
    header('location:/client/');
  }
?>
<!doctype html>
<html class="no-js" lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
    <link rel="stylesheet" href="css/foundation.min.css">
    <link rel="stylesheet" href="css/index.css">
    <link rel="shortcut icon" href="img/agenda.ico" type="image/x-icon">
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  </head>
  <body>
    <div class="main">
      <div class="login-container">
        <div class="callout primary login">
          <h4>Inicia sesión</h4>
          <form>
            <div class="row align-center">
              <div class="small-7 columns">
                <label>Usuario
                  <input type="text" id="user" required>
                </label>
              </div>
              <div class="small-7 columns">
                <label>Contraseña
                  <input type="password" id="password" required>
                </label>
              </div>
              <div class="small-7 columns btn-container">
                <button type="submit" class="button">Enviar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <script src="js/vendor/jquery.js"></script>
    <script src="js/vendor/what-input.js"></script>
    <script src="js/vendor/foundation.min.js"></script>
    <script src="js/index.js"></script>
  </body>
</html>
