const express = require('express');
const mysqlConnection = require('./db');
const cors = require('cors');

const app = express();
const port = 3080; // Puedes cambiar el puerto si es necesario

app.use(express.json());
// Configurar CORS
app.use(cors());

// Ruta para registrar un elector
app.post('/candidatos', (req, res) => {
  const { dni, nombre, apellidoPaterno, apellidoMaterno } = req.body;
  const query = 'INSERT INTO candidatos (dni, nombre, apellido_paterno, apellido_materno) VALUES ( ?, ?, ?, ?)';

  mysqlConnection.query(query, [dni, nombre, apellidoPaterno, apellidoMaterno ], (error, results) => {
    if (error) {
      console.error('Error al registrar el candidato: ', error);
      res.status(500).send('Error al registrar el candidato');
    } else {
      console.log('Candidato registrado exitosamente');
      res.sendStatus(200);
    }
  });
});

// Ruta para obtener todos los electores
app.get('/candidatos', (req, res) => {
  const query = 'SELECT * FROM candidatos';

  mysqlConnection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los candidatos: ', error);
      res.status(500).send('Error al obtener los candidatos');
    } else {
      res.json(results);
    }
  });
});

// Ruta para obtener un elector por su ID
app.get('/candidatos/:dni', (req, res) => {
  const id = req.params.dni;
  const query = 'SELECT * FROM candidatos WHERE dni = ?';
  console.log(id);
  mysqlConnection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error al obtener el candidato: ', error);
      res.status(500).send('Error al obtener el candidatos');
    } else if (results.length === 0) {
      res.status(404).send('Candidatos no encontrado');
    } else {
      res.json(results[0]);
    }
  });
});

// Ruta para actualizar un elector por su ID
app.put('/candidatos/:dni', (req, res) => {
  const id = req.params.dni;
  const { dni, nombre, apellidoPaterno, apellidoMaterno } = req.body;
  const query = 'UPDATE candidatos SET dni = ?, nombre = ?, apellido_paterno = ?, apellido_materno = ?  WHERE dni = ?';

  mysqlConnection.query(query, [dni, nombre, apellidoPaterno, apellidoMaterno, id], (error, results) => {
    if (error) {
      console.error('Error al actualizar el candidato: ', error);
      res.status(500).send('Error al actualizar el candidato');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Candidato no encontrado');
    } else {
      console.log('Candidato actualizado exitosamente');
      res.sendStatus(200);
    }
  });
});
// Ruta para eliminar un elector por su ID
app.delete('/candidatos/:dni', (req, res) => {
  const id = req.params.dni;
  const query = 'DELETE FROM candidatos WHERE dni = ?';

  mysqlConnection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error al eliminar el candidato: ', error);
      res.status(500).send('Error al eliminar el candidato');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Candidatos no encontrado');
    } else {
      console.log('Candidato eliminado exitosamente');
      res.sendStatus(200);
    }
  });
});

// Ruta para registrar un voto en la DB urna
app.post('/voto-urna', (req, res) => {
  const { nombre } = req.body;
  const query = 'INSERT INTO urna (candidato) VALUES (?)';

  mysqlConnection.query(query, [nombre], (error, results) => {
    if (error) {
      console.error('Error al registrar el voto: ', error);
      res.status(500).send('Error al registrar el voto');
    } else {
      console.log('Candidatos API: Voto registrado exitosamente');
      res.sendStatus(200);
    }
  });
});

// Ruta para obtener el preconteo
app.get('/preconteo', (req, res) => {
  const query = 'select candidato as candidato ,count(candidato) as votos from urna group by(candidato)';

  mysqlConnection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener el preconteo: ', error);
      res.status(500).send('Error al obtener el preconteo');
    } else {
      res.json(results);
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor Candidatos escuchando en http://localhost:${port}`);
}); 