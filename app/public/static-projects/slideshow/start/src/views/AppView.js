/*** AppView ***/

define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var SlideshowView = require('views/SlideshowView');

    AppView.DEFAULT_OPTION = {
        size: [450, 500],
        data: undefined,
        lightboxOpts: {}
    };

    function AppView() {
        View.apply(this, arguments);
        var slideshowView = new SlideshowView({
            data: this.options.data
        });

        // Add slideshowView to render tree
        this.add(slideshowView);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    module.exports = AppView;
});
