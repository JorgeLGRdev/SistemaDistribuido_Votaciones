const express = require('express');
const mysqlConnection = require('./db');
const cors = require('cors');

const app = express();
const port = 3070; // Puedes cambiar el puerto si es necesario

app.use(express.json());
// Configurar CORS
app.use(cors());

//Registrar voto
app.put('/electores-voto/:dni', (req, res) => {
  const id = req.params.dni;
  const voto = 1;
 // const { dni, nombre, apellidoPaterno, apellidoMaterno, direccion } = req.body;
  const query = 'UPDATE electores SET voto = ? WHERE dni = ?';

  mysqlConnection.query(query, [voto, id], (error, results) => {
    if (error) {
      console.error('Error al registrar voto del elector: ', error);
      res.status(500).send('Error al registrar voto del elector');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Elector no encontrado');
    } else {
      console.log('Voto registrado exitosamente');
      res.sendStatus(200);
    }
  });
});

// Ruta para registrar un elector
app.post('/electores', (req, res) => {
  const { dni, nombre, apellidoPaterno, apellidoMaterno, direccion } = req.body;
  const query = 'INSERT INTO electores (dni, nombre, apellido_paterno, apellido_materno, direccion, voto) VALUES (?, ?, ?, ?, ?, ?)';
  const voto=0;
  mysqlConnection.query(query, [dni, nombre, apellidoPaterno, apellidoMaterno, direccion,voto], (error, results) => {
    if (error) {
      console.error('Error al registrar el elector: ', error);
      res.status(500).send('Error al registrar el elector');
    } else {
      console.log('Elector registrado exitosamente');
      res.sendStatus(200);
    }
  });
});

// Ruta para obtener todos los electores
app.get('/electores', (req, res) => {
  const query = 'SELECT * FROM electores';

  mysqlConnection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los electores: ', error);
      res.status(500).send('Error al obtener los electores');
    } else {
      res.json(results);
    }
  });
});

// Ruta para obtener un elector por su ID
app.get('/electores/:dni', (req, res) => {
  const id = req.params.dni;
  const query = 'SELECT * FROM electores WHERE dni = ?';
  //console.log(id);
  mysqlConnection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error al obtener el elector: ', error);
      res.status(500).send('Error al obtener el elector');
    } else if (results.length === 0) {
      res.status(404).send('Elector no encontrado');
    } else {
      res.json(results[0]);
    }
  });
});

// Ruta para actualizar un elector por su ID
app.put('/electores/:dni', (req, res) => {
  const id = req.params.dni;
  const { dni, nombre, apellidoPaterno, apellidoMaterno, direccion } = req.body;
  const query = 'UPDATE electores SET dni = ?, nombre = ?, apellido_paterno = ?, apellido_materno = ?, direccion = ? WHERE dni = ?';

  mysqlConnection.query(query, [dni, nombre, apellidoPaterno, apellidoMaterno, direccion, id], (error, results) => {
    if (error) {
      console.error('Error al actualizar el elector: ', error);
      res.status(500).send('Error al actualizar el elector');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Elector no encontrado');
    } else {
      console.log('Elector actualizado exitosamente');
      res.sendStatus(200);
    }
  });
});
// Ruta para eliminar un elector por su ID
app.delete('/electores/:dni', (req, res) => {
  const id = req.params.dni;
  const query = 'DELETE FROM electores WHERE dni = ?';

  mysqlConnection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error al eliminar el elector: ', error);
      res.status(500).send('Error al eliminar el elector');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Elector no encontrado');
    } else {
      console.log('Elector eliminado exitosamente');
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Electores escuchando en http://localhost:${port}`);
}); 