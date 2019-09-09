define(function(require, exports, module) {
    var Engine  = require('famous/core/Engine');
    var mainContext = Engine.createContext();

    // var PhoneView = require('views/PhoneView');
    // var phoneView = new PhoneView();

    var ScreenView = require('views/ScreenView');
    var hv = new ScreenView();

    mainContext.add(hv);

});
