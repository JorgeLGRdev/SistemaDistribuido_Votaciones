const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3090; // Puedes cambiar el puerto si es necesario

app.use(express.json());
// Configurar CORS
app.use(cors());

// Ruta para VOTAR que recibe el DNI y el nombre Voto
app.post('/votar', (req, res) => {
    //const dni = req.query.dni;//elector
    //const nombre = req.query.nombre;//candidato
    const {dni, nombre} = req.body;  
    console.log(dni, nombre)
    //ENVIAR VOTO A LA API Electores
    const nuevosDatosElector = {
        nombre: 'Nuevo Nombre',
        apellido_paterno: 'Nuevo Apellido Paterno',
        apellido_materno: 'Nuevo Apellido Materno',
        direccion: 'Nueva Dirección'
      };
      
    modificarDatosElector(dni, nuevosDatosElector)
    .then(datosModificados => {
      console.log('Voto enviado a la API electores:', datosModificados);
      // Aquí puedes procesar o mostrar los datos modificados del elector como desees
    })
    .catch(error => {
      // Manejo de errores
    });

    //INSERTAR VOTO EN URNA
    agregarNuevoElector(nombre)
    .then(datosElector => {
      console.log('Voto enviado a la API candidatos:', datosElector);
      // Aquí puedes procesar o mostrar los datos del elector agregado como desees
    })
    .catch(error => {
      // Manejo de errores
    });

    // Devuelve una respuesta a la aplicación cliente
    res.send('Voto registrado exitosamente');
  });

  // Función para registrar el voto en la urna
async function agregarNuevoElector(nombre) {
    try {
      const url = 'http://localhost:3080/voto-urna'; // Ruta de la API de ServicioElectores para insertar el elector
      const nuevoElector = { nombre };
      const response = await axios.post(url, nuevoElector);
      return response.data; // Aquí asumimos que la respuesta contiene los datos del elector agregado
    } catch (error) {
      console.error('Error al enviar voto a la API candidatos:', error);
      throw error;
    }
  }
    
  // Función para modificar los datos de un elector
  async function modificarDatosElector(id, nuevosDatos) {
    try {
      const response = await axios.put(`http://localhost:3070/electores-voto/${id}`, nuevosDatos);
      return response.data; // Aquí asumimos que los datos modificados están en el cuerpo de la respuesta (response.data)
    } catch (error) {
      console.error('Error al enviar voto a la API electores:', error);
      throw error;
    }
  }
  
app.listen(port, () => {
  console.log(`Servidor Voto escuchando en http://localhost:${port}`);
}); 