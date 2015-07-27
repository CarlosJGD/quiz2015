var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
// Ejemplo de DATABASE_URL = postgres://dnxkjuumiibhex:xp2DEaMG7tF-Z5Q2zgiBZDrQrx@ec2-107-20-220-251.compute-1.amazonaws.com:5432/d6u0h4nn2ghkk4

// Si da el error: 'Cannot read property 'match' of undefined', es porque debemos arrancar la aplicación con 
// 'foreman start', ya que el se encarga de crear el entorno ejecución y para ello utiliza el fichero '.env'
// que es donde está definida la variable DATABASE_URL

// OJO, con 'foreman start', la apliacación corre en el puerto 5000.

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name 	= (url[6] || null);
var user		= (url[2] || null);
var pwd 		= (url[3] || null);
var protocol	= (url[1] || null);
var dialect 	= (url[1] || null);
var port 		= (url[5] || null);
var host  		= (url[4] || null);
var storage 	= process.env.DATABASE_STORAGE;


// Cargar el modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgress
var sequelize = new Sequelize(DB_name, user, pwd, 
					{ dialect: 	protocol,
					  protocol: protocol,
					  port: 	port,
					  host: 	host,
					  storage: 	storage,	// solo SQLite (.env)
					  omitNull: true		// solo Postgress
					});


// Usar BBDD SQLite:
var sequelize = new Sequelize (null, null, null,
							   {dialect: "sqlite", storage: "quiz.sqlite"}
							   );

//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;  // exportar la definición de la tabla Quiz
					  // para poder acceder al modelo desde otras partes del programa

// sequelize.sync() crea e inicializa tabla de preguntas en la DB
sequelize.sync().success(function(){
	// success(..) -- ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count) {
		if (count === 0) {
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});


