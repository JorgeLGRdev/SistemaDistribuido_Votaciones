const mysql = require('mysql');
const DATABASE_URL='mysql://a6frrngqctqoh5b8vaqo:pscale_pw_6nAwMt36d1C5wVcSLtvr3GfXJMmZnZoAMH1iNQEd3kb@aws.connect.psdb.cloud/urna?ssl={"rejectUnauthorized":true}'

const connection = mysql.createConnection(DATABASE_URL);

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;