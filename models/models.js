var path = require('path');

// Cargar el modelo ORM
var Sequelize = require('sequelize');

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


