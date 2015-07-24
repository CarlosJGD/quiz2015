
// Fichero que contine las RUTAS

var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var authorController = require('../controllers/author_controller');

/* GET para la página de inicio. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz2015' });
});

/* Las rutas para:
	- GET página de preguntas y respuestas 
*/
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

router.get('/author', authorController.author);

module.exports = router;
