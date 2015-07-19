		var express = require('express');
		var router = express.Router();
		var quizController = require('../controllers/quiz_controller');
		var commentController = require('../controllers/comment_controller');

		/* GET home page. */
		router.get('/', function(req, res) {
		  res.render('index', { title: 'Quiz', errors: [] });
		});

		router.param('quizId', quizController.load);

		router.get('/quizes', quizController.index);
		router.get('/quizes/new', quizController.new);
		router.get('/quizes/:quizId(\\d+)', quizController.show);
		router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
		router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
		router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);

		router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

		router.put('/quizes/:quizId(\\d+)', quizController.update);

		router.post('/quizes/create', quizController.create);			
		router.post('/quizes/:quizId(\\d+)/comments', commentController.create);	



		router.get('/author', function(req, res) {
		  res.render('author', { title: 'Quiz', errors: [] });
		});


		module.exports = router;
