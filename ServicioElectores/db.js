const mysql = require('mysql')
const DATABASE_URL='mysql://pa3ieh2o1v8cu6l7xp8e:pscale_pw_kj8X1aEK3PvPlvw8VbfNjHfTyS7rZsdLyPpb8LVM7Zu@aws.connect.psdb.cloud/electores-db?ssl={"rejectUnauthorized":true}'

const connection = mysql.createConnection(DATABASE_URL);
//const connection = mysql.createConnection({
  //host: 'localhost', // Cambia esto si tu servidor de MySQL tiene una dirección diferente
  //user: 'electores_user',
  //password: '12345678',
  //database: 'votantes',
//});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;