const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3300;

// Configura la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'b3atwg3pdsmwf2r1yjo0-mysql.services.clever-cloud.com',
  user: 'uutadvemmgazlvfq',
  password: 'wmcO0trHmSIzLDooGIlQ',
  database: 'b3atwg3pdsmwf2r1yjo0'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

//Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  connection.query('SELECT * FROM USUARIOS', (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios: ', err);
      res.status(500).send('Error del servidor al obtener usuarios');
      return;
    }
    res.json(results);
  });
});

//Obtener estadisticas
app.get('/api/estadisticas', (req, res) => {
    connection.query('SELECT U.USERNAME AS USUARIO, E.TIEMPO_JUGADO AS `TIEMPO JUGADO`, E.ENEMIGOS_DERROTADOS AS `ENEMIGOS ELIMINADOS`, FORMAT(E.PUNTUACION_TOTAL, 0) AS `PUNTUACION TOTAL` FROM USUARIOS U JOIN ESTADISTICAS E ON U.ID_USUARIO = E.ID_USUARIO;', (err, results) => {
      if (err) {
        console.error('Error al obtener usuarios: ', err);
        res.status(500).send('Error del servidor al obtener usuarios');
        return;
      }
      res.json(results);
    });
  });


// Escuchar en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor API RESTful escuchando en http://localhost:${port}`);
});
