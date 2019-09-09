define(function(require, exports, module) {
	"use strict";
    var SoundPlayer = require('app/audio/SoundPlayer');

    var _soundPlayer = null;

    function _loadGameSounds(callback){
        if (!_soundPlayer){
          _soundPlayer = new SoundPlayer([
             '/static-projects/flappy-bird/content/sounds/flap.wav',
             '/static-projects/flappy-bird/content/sounds/die.wav',
             '/static-projects/flappy-bird/content/sounds/score.wav',
             '/static-projects/flappy-bird/content/sounds/fire.wav'
          ], function (e) {
            callback();
          });
        }
        return _soundPlayer;
    }


    module.exports = _loadGameSounds;
});
