/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {

  // as soon as this file is loaded, connect automatically, 
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    // Listen for Comet messages from Sails
//    socket.on('message', function messageReceived(message) {
//
//      ///////////////////////////////////////////////////////////
//      // Replace the following with your own custom logic
//      // to run when a new message arrives from the Sails.js
//      // server.
//      ///////////////////////////////////////////////////////////
////      log('New comet message received :: ', message);
//      //////////////////////////////////////////////////////
//
//      if (message.model === 'users') {
//        console.log('user changed', message);
//      }
//
//    });
//
//    socket.get('/users/subscribe', function () {
//      console.log('socket.get(/users/subscribe)');
//      console.log(arguments);
//    });


    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to 
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' + 
        'e.g. to send a GET request to Sails, try \n' + 
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }
  

})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);

(function () {
  'use strict';


  var socket = io.connect('http://localhost:1337'); // 1337 is the default port, by the way


  angular.module('sailsHello', [])

      .factory('EventListener', ['$rootScope', function ($rootScope) {
        socket.on('connect', function socketConnected() {

          socket.on('message', function messageReceived(message) {
            if (message.model === 'users') {
              $rootScope.$broadcast('UsersChanged', message);
            }
          });

        });

        return { };
      }])

      .controller('UsersListCtrl', ['$scope', 'EventListener', function ($scope, EventListener) {
        function init () {
          loadUsers();

          $scope.$on('UsersChanged', loadUsers);
        }

        function loadUsers () {
          socket.request('/users', {}, function (users) {
            $scope.$apply(function () {
              $scope.users = users;
            });
          });
        }

        init();
      }]);

})();
