const UserController = require('../controllers/userController'); 
const TodoListController = require('../controllers/todoListController');
const ItemController = require('../controllers/itemController');

module.exports = (app) => {

    // User routes
  app.route('/api/user/listUser').get(UserController.getAllUser);
  app.route('/api/user/addUser').post(UserController.createUser);
  app.route('/api/user/getUserByMail').get(UserController.getUserByEmail);
  app.route('/api/user/updateUser/:email').put(UserController.updateUser);
  app.route('/api/user/deleteUser/:email').delete(UserController.deleteUser);
 
  // todolist routes

  
  app.route('/api/todolist/listTodoList').get(TodoListController.getAllTodoList);
  app.route('/api/todolist/addTodoList').post(TodoListController.createTodoList);
  app.route('/api/todolist/getTodoListByName/:name').get(TodoListController.getTodoListByName);
  app.route('/api/todolist/updateTodoList/:name').put(TodoListController.updateTodoList);
  app.route('/api/todolist/deleteTodoList/:name').delete(TodoListController.deleteTodoList);
  app.route('/api/todolist/deleteItem/:todolistName/:itemName').delete(TodoListController.deleteTodoListItem);

  // items routes

  app.route('/api/item/listItem').get(ItemController.getAllItem);
  app.route('/api/item/addItem').post(ItemController.createItem);
  app.route('/api/item/getItemByName').get(ItemController.getItemByName);
  app.route('/api/item/updateItem').put(ItemController.updateItem);
  app.route('/api/item/deleteItem').delete(ItemController.deleteItem);

  app.use((req, res) => { // Middleware pour capturer une requête qui ne match aucune des routes définies plus tôt
    res.status(404).json({url: req.originalUrl, error: 'not found'});
  });
};