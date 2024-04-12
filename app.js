const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3300;

// Middleware para parsear JSON
app.use(express.json());

const cors = require('cors');
app.use(cors());

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

  // Endpoint para insertar o actualizar estadísticas
app.post('/api/insertarEstadisticas', (req, res) => {
  const { id_usuario, puntuacion_total, enemigos_derrotados, tiempo_jugado } = req.body;
  const query = `
    INSERT INTO ESTADISTICAS (ID_USUARIO, PUNTUACION_TOTAL, ENEMIGOS_DERROTADOS, TIEMPO_JUGADO)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      PUNTUACION_TOTAL = VALUES(PUNTUACION_TOTAL),
      ENEMIGOS_DERROTADOS = VALUES(ENEMIGOS_DERROTADOS),
      TIEMPO_JUGADO = VALUES(TIEMPO_JUGADO);
  `;
  connection.query(query, [id_usuario, puntuacion_total, enemigos_derrotados, tiempo_jugado], (err, results) => {
    if (err) {
      console.error('Error al insertar o actualizar estadísticas: ', err);
      res.status(500).send('Error del servidor al actualizar estadísticas');
      return;
    }
    res.status(200).send('Estadísticas actualizadas con éxito');
  });
});

// Endpoint de login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
      return res.status(400).send('Username y Password son requeridos');
  }

  const query = 'SELECT ID_USUARIO FROM USUARIOS WHERE USERNAME = ? AND PASSWORD = ?';
  connection.query(query, [username, password], (err, results) => {
      if (err) {
          console.error('Error al intentar loguearse: ', err);
          return res.status(500).send('Error interno del servidor');
      }
      if (results.length > 0) {
          res.json({ idUsuario: results[0].ID_USUARIO });
      } else {
          res.status(401).send('Credenciales no válidas');
      }
  });
});


// Escuchar en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor API RESTful escuchando en http://localhost:${port}`);
});
