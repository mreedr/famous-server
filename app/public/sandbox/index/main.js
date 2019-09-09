define(function(require, exports, module) {
    var Engine  = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');

    var mainContext = Engine.createContext();

    var surface = new Surface({
        size: [400, 400],
        content: 'PlaceHolder',
        properties: {
            backgroundColor: 'red'
        }
    });

    mainContext.add(surface);
});
