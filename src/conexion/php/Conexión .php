<?php
header('Content-Type: application/json');

$servername = "b4uoq0rshdc6ogtoeymt-mysql.services.clever-cloud.com";
$username = "uuhwblprjqiupwbx";
$password = "h0qjyL8ufIoKlvwMJWLJ";
$dbname = "b4uoq0rshdc6ogtoeymt";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar conexión
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Obtener datos del formulario
$email = $_POST['email'];
$clave = $_POST['clave'];

// Consulta para verificar las credenciales
$sql = "SELECT * FROM usuarios WHERE email = ? AND clave = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $clave);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Inicio de sesión exitoso
    $user = $result->fetch_assoc();
    echo json_encode(['message' => 'Login Exitoso', 'data' => $user]);
} else {
    // Credenciales incorrectas
    echo json_encode(['error' => 'Correo o Clave incorrectos']);
}

$stmt->close();
$conn->close();


?>.
