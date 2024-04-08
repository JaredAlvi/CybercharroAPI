const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3300;

// Configura la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: '52.41.36.82',
  user: 'root',
  password: '',
  database: 'CYBERCHARRO'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

// Definir rutas
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

  app.get('/api/estadisticas', (req, res) => {
    connection.query('SELECT * FROM ESTADISTICAS', (err, results) => {
      if (err) {
        console.error('Error al obtener usuarios: ', err);
        res.status(500).send('Error del servidor al obtener usuarios');
        return;
      }
      res.json(results);
    });
  });

  app.post('/api/usuarios', (req, res) => {
    connection.query('SELECT * FROM USUARIOS', (err, results) => {
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
