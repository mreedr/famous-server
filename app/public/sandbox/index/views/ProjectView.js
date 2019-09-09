/*** AppView ***/

define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var SlideshowView = require('views/SlideshowView');

    function ProjectView() {
        View.apply(this, arguments);
    }

    ProjectView.prototype = Object.create(View.prototype);
    ProjectView.prototype.constructor = ProjectView;

    ProjectView.DEFAULT_OPTIONS = {};

    module.exports = ProjectView;
});
