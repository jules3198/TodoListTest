const TodoListController = require('../controllers/todoListController'); // Import du contrôleur

module.exports = (app) => {
  app.route('/listTodoList').get(TodoListController.getAllTodoList);
  app.route('/addTodoList').post(TodoListController.createTodoList);
  app.route('/getTodoListByName').get(TodoListController.getTodoListByName);
  app.route('/updateTodoList').put(TodoListController.updateTodoList);
  app.route('/deleteTodoList').delete(TodoListController.deleteTodoList);
  app.use((req, res) => { // Middleware pour capturer une requête qui ne match aucune des routes définies plus tôt
    res.status(404).json({url: req.originalUrl, error: 'not foundssss'});
  });
};