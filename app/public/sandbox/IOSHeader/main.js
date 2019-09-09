define(function(require, exports, module) {
    var SequentialLayout = require("famous/views/SequentialLayout");
    var Surface = require('famous/core/Surface');

    var Engine  = require('famous/core/Engine');
    var mainContext = Engine.createContext();

    var AppView = require('views/AppView');

    var mainView = new AppView({width: window.innerWidth, height: window.innerHeight, headerSize: 50});
    mainContext.add(mainView);
});

// var view = new MyView();
//
// view._eventInput.on('incoming-event', function() {
//   // Handle the 'incoming-event' here
// });
//
// // These are equivalent to `view._eventInput.on`:
// view.on('incoming-event', function(){});
// view.addListener('incoming-event', function(){});
//
// view._eventOutput.emit('outgoing-event', 'message');
