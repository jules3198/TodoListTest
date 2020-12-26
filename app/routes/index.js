const UserController = require('../controllers/userController'); // Import du contrôleur
const TodoListController = require('../controllers/todoListController'); // Import du contrôleur

module.exports = (app) => {

    // User routes
  app.route('/api/user/listUser').get(UserController.getAllUser);
  app.route('/api/user/addUser').post(UserController.createUser);
  app.route('/api/user/getUserByMail').get(UserController.getUserByEmail);
  app.route('/api/user/updateUser').put(UserController.updateUser);
  app.route('/api/user/deleteUser').delete(UserController.deleteUser);
 
  // todolist routes

  
  app.route('/api/todolist/listTodoList').get(TodoListController.getAllTodoList);
  app.route('/api/todolist/addTodoList').post(TodoListController.createTodoList);
  app.route('/api/todolist/getTodoListByName').get(TodoListController.getTodoListByName);
  app.route('/api/todolist/updateTodoList').put(TodoListController.updateTodoList);
  app.route('/api/todolist/deleteTodoList').delete(TodoListController.deleteTodoList);

  app.use((req, res) => { // Middleware pour capturer une requête qui ne match aucune des routes définies plus tôt
    res.status(404).json({url: req.originalUrl, error: 'not found'});
  });
};