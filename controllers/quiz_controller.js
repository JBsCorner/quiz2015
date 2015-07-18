var models = require('../models/models.js');

//AUTOlOAD
exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{
				next(new Error('No existe quizId = ' + quizId));
			}
		}
	).catch(function(error){next(error);});
}



//GET /quizes
exports.index = function(req, res){
	console.log(req.query.search);
	if(req.query.search){
		

		models.Quiz.findAll({where: ["pregunta like ?", '%' + req.query.search.replace(/\s+/g, '%') + '%']}).then(
			function(quizes){
				res.render('quizes/index', {quizes: quizes});
			}
		).catch(function(error){next(error);});
	}else{
		models.Quiz.findAll().then(
			function(quizes){
				res.render('quizes/index', {quizes: quizes});
			}
		).catch(function(error){next(error);});
	}
}

//GET /quizes/:id
exports.show = function(req,res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: req.quiz});
	});
}

//GET /quizes/:id/answer
exports.answer = function(req,res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		var resultado = 'Incorrecto';
		if(req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto';
		}
			res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
	})
}