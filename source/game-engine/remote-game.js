var io     = require('../js/socket.io')     ;
var socket = io.connect('http://localhost') ;

var GameEngine = {};

(function() {
  var linkedCallbacks = [];
  
  GameEngine.LinkToGame = function(textCallback) {
    linkedCallbacks.push(textCallback);
    
    return function(command)
    {
      socket.emit("gameCommand", { command : command });
    };
  }
  
  socket.on('textCallback', function (data) {
    for(var i = 0; i < linkedCallbacks.length; i++)
      linkedCallbacks[i](data.text);
  });
})()

if(typeof module !== 'undefined' && module.exports) {
  module.exports = GameEngine;
}
