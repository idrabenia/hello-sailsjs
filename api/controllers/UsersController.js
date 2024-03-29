/**
 * UsersController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  subscribe: function (req, res) {
    Users.find().exec(function (err, users) {
      Users.subscribe(req.socket, users);
    });
  },

  updateName: function (req, res) {
    var id = req.param('id');
    var newUsername = req.param('username');

    Users.findOne(id).exec(function (err, curUser) {
      curUser.username = newUsername;

      curUser.save(function (err) {
        if (err) {
          return res.send(err, 500);
        }

        res.json(curUser);
        Users.publishUpdate(id, {
          username: newUsername
        });
      });
    });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UsersController)
   */
  _config: {}

  
};
