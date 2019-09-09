define(function(require, exports, module) {
    var Engine  = require('famous/core/Engine');
    var mainContext = Engine.createContext();

    var GameView = require('views/GameView');

    var gameView = new GameView({size: [500, 500]});

    mainContext.add(gameView);
});
