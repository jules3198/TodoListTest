const UserController = require('../controllers/userController'); // Import du contrôleur

module.exports = (app) => {
  app.route('/listUser').get(UserController.getAllUser);
  app.route('/addUser').post(UserController.createUser);
  app.route('/getUserByMail').get(UserController.getUserByEmail);
  app.route('/updateUser').put(UserController.updateUser);
  app.route('/deleteUser').delete(UserController.deleteUser);
  app.use((req, res) => { // Middleware pour capturer une requête qui ne match aucune des routes définies plus tôt
    res.status(404).json({url: req.originalUrl, error: 'not found'});
  });
};